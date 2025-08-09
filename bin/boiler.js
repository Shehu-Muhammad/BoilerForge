#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .name('boilerforge')
  .description('CLI tool for scaffolding projects')
  .version('1.0.0');

program.parse(process.argv);
