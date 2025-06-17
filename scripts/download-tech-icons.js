const fs = require('fs');
const path = require('path');
const https = require('https');

// Tech icons to download
const techIcons = [
  {
    name: 'javascript',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    name: 'typescript',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    name: 'react',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    name: 'nextjs',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
  },
  {
    name: 'nodejs',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  },
  {
    name: 'html5',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  },
  {
    name: 'css3',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  },
  {
    name: 'tailwindcss',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
  },
  {
    name: 'mongodb',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
  },
  {
    name: 'postgresql',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
  },
  {
    name: 'graphql',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg'
  },
  {
    name: 'git',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  },
  {
    name: 'docker',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  },
  {
    name: 'aws',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg'
  },
  {
    name: 'firebase',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
  },
  {
    name: 'redux',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg'
  }
];

// Ensure the tech directory exists
const techDir = path.join(__dirname, '../public/tech');
if (!fs.existsSync(techDir)) {
  fs.mkdirSync(techDir, { recursive: true });
}

// Download each icon
techIcons.forEach(icon => {
  const filePath = path.join(techDir, `${icon.name}.svg`);
  const file = fs.createWriteStream(filePath);

  https.get(icon.url, response => {
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${icon.name}.svg`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => { }); // Delete the file if there was an error
    console.error(`Error downloading ${icon.name}.svg:`, err.message);
  });
});

console.log('Starting download of tech icons...'); 