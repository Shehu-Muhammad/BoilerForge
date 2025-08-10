import { Command } from 'commander';

const create = new Command('create')
  .description('Creates a new project folder with boilerplate files.')
  .argument('<name>', 'name of project')
  .option('--template <type>', 'project template type (node, python, react)')
  .option('--git', 'initializes a Git repo automatically')
  .action((name, options) => {
    console.log(`Creating project "${name}" with template: ${options.template} and ${options.git}`);
  });

export default create;