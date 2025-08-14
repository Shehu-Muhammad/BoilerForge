// commands/initGitRepo.js
import { Command } from 'commander';
import { initGitRepoHelper } from './helpers/initGitRepoHelper.js';

const initGitRepo = new Command('initGitRepo')
  .description('Initializes a Git repo')
  .argument('[dir]', 'Directory to initialize Git in. Defaults to current directory.')
  .option('--bare', 'Create a bare repository. Typically for remote repos.')
  .option('--template <template_directory>', 'Initialize using a specific template (hooks, config files, etc.)')
  .option('--separate-git-dir <git_dir>', 'Store Git directory elsewhere but keep working directory separate')
  .option('--shared[=<permissions>]', 'Share repository among multiple users')
  .option('-q, --quiet', 'Suppress output')
  .action((dir, options) => {
    initGitRepoHelper(dir, options);
  });

export default initGitRepo;
