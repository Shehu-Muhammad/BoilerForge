import chalk from 'chalk';
import { Command } from 'commander';

const templates = [
  { id: 1, name: 'React App', desc: 'React 18 + Vite + ESLint + Prettier' },
  { id: 2, name: 'Node.js API', desc: 'Node.js (Express) + ESLint + Prettier' },
  { id: 3, name: 'Python Script', desc: 'Python 3.x + Virtualenv + basic structure' },
  { id: 4, name: 'Flask App', desc: 'Flask + Jinja2 + basic project scaffold' }
];

const list = new Command('list')
  .description('Lists available project templates')
  .action(() => {
    console.log(chalk.bold.blue('\n📦 Available Project Templates:\n'));

    templates.forEach(t => {
      const numberBox = chalk.white.bold.bgBlue(` ${t.id} `);
      console.log(`${numberBox} ${chalk.green(t.name)} - ${chalk.gray(t.desc)}`);
    });

    console.log(chalk.yellow('\n💡 Tip: Use "project-boiler create <template>" to start a project.\n'));
  });

export default list;
