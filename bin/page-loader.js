#!/usr/bin/env node
import { Command } from 'commander';
import pageLoader from '../src/index.js';

const program = new Command();
program
  .name('page-loader')
  .description('Saves all data from URL to folder')
  .argument('<url>', 'url address to download page')
  .option(
    '-o, --output <type>',
    'folder to save page, current folder default',
    process.cwd(),
  )
  .action((url) => {
    const { output } = program.opts();
    pageLoader(output, url).then((res) => console.log(res));
  });

program.parse();
