import { Command } from 'commander';

const initGit = new Command('initGit')
  .description('Initializes a Git repo')
  .argument('[dir]', 'The directory where the repository will be initialized. If omitted, Git initializes the current directory.')
  .option('--bare', 'Create a bare repository. This is typically used for remote repositories where no working files are checked out.')
  .option('--template <template_directory>', 'Specify a directory from which to initialize the repository template (hooks, config files, etc.).')
  .option('--separate-git-dir <git_dir>', 'Store the Git directory elsewhere but keep the working directory separate.')
  .option('--shared[=<permissions>]', 'Specify that the repository is to be shared among several users; sets permission bits accordingly.')
  .option('-q', '--quiet', 'Suppress output')
  .action((dir, options) => {
    console.log(`Initializing git in "${dir || '.'}" with these options: 
        bare: ${options.bare}
        template: ${options.template}
        separateGitDir: ${options['separate-git-dir']}
        shared: ${options.shared}
        quiet: ${options.quiet}
    `);
  });

export default initGit;