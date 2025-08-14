import { execSync } from 'child_process';
import path from 'path';

export function initGitRepoHelper(dir, options = {}) {
  const targetDir = dir ? path.resolve(dir) : process.cwd();

  let cmd = `git init`;
  if (options.bare) cmd += ` --bare`;
  if (options.template) cmd += ` --template=${options.template}`;
  if (options.separateGitDir) cmd += ` --separate-git-dir=${options.separateGitDir}`;
  if (options.shared) cmd += ` --shared${options.shared === true ? '' : '=' + options.shared}`;
  if (options.quiet) cmd += ` --quiet`;

  execSync(cmd, { cwd: targetDir, stdio: 'inherit' });
  console.log(`✅ Git repository initialized in ${targetDir}`);
}
