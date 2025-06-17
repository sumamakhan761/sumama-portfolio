```markdown
# Portfolio Website Backend Implementation Guide

This document outlines the backend implementation plan for a personal portfolio website built with Next.js.  Since the project specifications explicitly state "no database used fully website frontend only mailing contact us part," this guide primarily focuses on the backend API needed to handle the contact form submission and email sending functionality.  All other portfolio content will be handled on the frontend with Next.js components and statically defined data.

## 1. Document Header

This document provides a detailed guide for the backend implementation of the contact form functionality for a portfolio website. It leverages Next.js API routes for handling form submissions and utilizes a free email service library for sending emails. The focus is on simplicity, security, and performance.

## 2. API Design

We will define a single API endpoint for handling contact form submissions.

*   **Endpoint:** `/api/contact`
*   **Method:** `POST`
*   **Description:** Receives contact form data (name, email, message) and sends an email to the portfolio owner.
*   **Request Payload (JSON):**

    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "message": "Hello, I am interested in your work."
    }
    ```

*   **Response (JSON):**

    *   **Success (200 OK):**

        ```json
        {
          "success": true,
          "message": "Email sent successfully!"
        }
        ```

    *   **Error (400 Bad Request):**

        ```json
        {
          "success": false,
          "message": "Invalid email address."
        }
        ```

    *   **Error (500 Internal Server Error):**

        ```json
        {
          "success": false,
          "message": "Failed to send email. Please try again later."
        }
        ```

## 3. Data Models

Since we are *not* using a database, there are no data models to define. The data received from the contact form is transient and only exists for the duration of the API request.

## 4. Business Logic

The core business logic involves:

1.  **Validation:**  Validating the incoming request body to ensure that `name`, `email`, and `message` are present and that the `email` is in a valid format.
2.  **Email Sending:** Using a Node.js email library (e.g., Nodemailer) to send an email to the portfolio owner with the data submitted in the contact form.
3.  **Error Handling:**  Implementing proper error handling to catch any exceptions during email sending and return appropriate error responses to the client.
4.  **Rate Limiting (Optional):**  Consider implementing rate limiting to prevent abuse of the contact form.

## 5. Security

*   **Input Validation:**  Sanitize and validate all input data to prevent injection attacks (e.g., cross-site scripting (XSS) or email header injection).  Specifically, escape any HTML entities in the `message` field.
*   **Environment Variables:**  Store sensitive information like email credentials (email address, password/API key) in environment variables.  Do *not* hardcode them into the code.
*   **CORS (Cross-Origin Resource Sharing):** Configure CORS appropriately to only allow requests from the portfolio website's domain. This can be handled within your Next.js configuration ( `next.config.js`).
*   **Rate Limiting:**  Implement rate limiting to prevent spamming of the contact form. This can be done using a middleware or a dedicated rate-limiting library.

## 6. Performance

*   **Asynchronous Email Sending:** Send emails asynchronously to avoid blocking the main thread and slowing down the API response. Use `async/await` in combination with `Promise.resolve()` or a dedicated queueing system for more complex scenarios.
*   **Caching (Not Applicable):** Since we are not using a database, caching is not directly applicable to this specific backend functionality.
*   **Keep Email Payload Small:** Avoid sending large attachments or complex HTML structures in the email body unless absolutely necessary.
*   **Optimize Email Service Configuration:** Ensure your email service provider (e.g., SendGrid, Mailgun) is configured for optimal deliverability.

## 7. Code Examples

This section provides code examples using Nodemailer, a popular and easy-to-integrate Node.js library for sending emails.

**Prerequisites:**

*   Install Nodemailer: `npm install nodemailer`
*   Set up a free email service account (e.g., Gmail, Mailgun, SendGrid).  *Important*: If using Gmail, you may need to enable "Less secure app access" (which is generally *not* recommended) or use an App Password. For production environments, dedicated transactional email services (Mailgun, SendGrid, etc.) are highly recommended.

**Next.js API Route (`pages/api/contact.js`):**

```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Input Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    try {
      // Create a Nodemailer transporter using your email service credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
          user: process.env.EMAIL_USER, // Your email address (from environment variable)
          pass: process.env.EMAIL_PASS, // Your email password or app password (from environment variable)
        },
      });

      // Email Content
      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your portfolio email address
        subject: `New message from ${name} via your portfolio website`,
        text: message,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`, //Added HTML template for better formating

      };

      // Send Email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

// Simple Email Validation Function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

**`.env.local` File (Example - *DO NOT COMMIT TO GIT*):**

```
EMAIL_USER=your_email@gmail.com  // replace your email
EMAIL_PASS=your_email_password // replace your email password or app password
```

**Frontend (Example - React Component):**

```javascript
import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // success, error, loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        console.error(data.message);
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p>Message sent successfully!</p>}
      {status === 'error' && <p>An error occurred. Please try again later.</p>}
    </form>
  );
}

export default ContactForm;
```

**Explanation:**

*   The `pages/api/contact.js` file creates a Next.js API route.
*   It receives a `POST` request with the contact form data.
*   It validates the input data and checks for a valid email format.
*   It creates a Nodemailer transporter using your email service credentials (stored in environment variables).
*   It constructs the email content (from, to, subject, text).  I added an HTML format, but plain text will also be sent for compatibility with various email clients.
*   It sends the email using `transporter.sendMail()`.
*   It returns a JSON response to the client indicating success or failure.
*   The example React component shows how to make the API call from the frontend to send emails and handle different status.

**Important Notes:**

*   **Security:** Always store sensitive information (email credentials) in environment variables.
*   **Email Service:**  Choose a reputable email service provider for production environments.
*   **Error Handling:**  Implement robust error handling to catch any exceptions during email sending.
*   **Rate Limiting:**  Protect your API from abuse by implementing rate limiting.  Consider using a middleware like `next-connect` with a rate-limiting library for more advanced control.
*   **Validation:**  Thoroughly validate all user input to prevent security vulnerabilities.

This guide provides a solid foundation for building the backend functionality of your portfolio website's contact form. Remember to adapt the code examples to your specific requirements and security considerations.
```
