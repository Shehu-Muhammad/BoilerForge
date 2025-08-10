#!/usr/bin/env node

import { Command } from 'commander';
import createCommand from '../commands/create.js';
import initGitCommand from '../commands/initGit.js';
const program = new Command();

program
  .name('boilerforge')
  .description('CLI tool for scaffolding projects')
  .version('1.0.0');

// Register the `create` command from another file
program.addCommand(createCommand);

// Register the `initGit` command from another file
program.addCommand(initGitCommand);

program.parse(process.argv);
