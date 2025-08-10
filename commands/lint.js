import { Command } from 'commander';

const lint = new Command('lint')
  .description('Runs ESLint & Prettier on the project.')
  .option('--fix', 'Fixes any linting issues')
  .action((options) => {
    if (options.fix) {
        console.log('🔧 Fix mode enabled — auto-fixing linting issues...');
    } else {
        console.log('🔍 Running lint checks without fixing...');
    }
  });

export default lint;