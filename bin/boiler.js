#!/usr/bin/env node

import { Command } from 'commander';
import createCommand from '../commands/create.js';
import initGitCommand from '../commands/initGit.js';
import initCommand from '../commands/init.js';
import lintCommand from '../commands/lint.js';
import listCommand from '../commands/list.js';
import upgradeCommand from '../commands/upgrade.js';
const program = new Command();

program
  .name('boilerforge')
  .description('CLI tool for scaffolding projects')
  .version('1.0.0');

// Register the `create` command from another file
program.addCommand(createCommand);

// Register the `initGit` command from another file
program.addCommand(initGitCommand);

// Register the `init` command from another file
program.addCommand(initCommand);

// Register the `lint` command from another file
program.addCommand(lintCommand);

// Register the `list` command from another file
program.addCommand(listCommand);

// Register the `upgrade` command from another file
program.addCommand(upgradeCommand);

program.parse(process.argv);
