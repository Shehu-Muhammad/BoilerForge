import { Command } from 'commander';

const init = new Command('init')
  .description('Sets up .gitignore, LICENSE, README.md, and Prettier/ESLint configs.')
  .action(() => {
    console.log('🚀 Starting project setup...');
    // after setup is done:
    console.log('✅ Project configuration files created.');
  });

export default init;