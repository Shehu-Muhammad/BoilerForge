import { Command } from 'commander';

const create = new Command('create')
  .description('Creates a new project folder with boilerplate files.')
  .argument('<name>', 'name of project')
  .option('--template <type>', 'project template type (node, python, react)')
  .action((name, options) => {
    console.log(`Creating project "${name}" with template: ${options.template}`);
  });

export default create;