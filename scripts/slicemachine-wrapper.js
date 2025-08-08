#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { spawn } = require('child_process');

// Configuration
const REPO_NAME = process.env.PRISMIC_REPOSITORY_NAME || 'artika-sapa';
const PORT = 9999;

console.log('🚀 Starting Slice Machine...');
console.log(`📦 Repository: ${REPO_NAME}`);
console.log(`🌐 Port: ${PORT}`);

// Set environment variables
process.env.PRISMIC_REPOSITORY_NAME = REPO_NAME;
process.env.NODE_ENV = 'development';

// Start Slice Machine
const slicemachine = spawn('npx', ['start-slicemachine'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: process.env,
});

// Filter out experiment errors
slicemachine.stdout.on('data', (data) => {
  const output = data.toString();

  // Filter out experiment connection errors
  if (
    !output.includes('[Experiment]') &&
    !output.includes('ECONNREFUSED') &&
    !output.includes('AggregateError')
  ) {
    process.stdout.write(output);
  }
});

slicemachine.stderr.on('data', (data) => {
  const output = data.toString();

  // Filter out experiment connection errors
  if (
    !output.includes('[Experiment]') &&
    !output.includes('ECONNREFUSED') &&
    !output.includes('AggregateError')
  ) {
    process.stderr.write(output);
  }
});

slicemachine.on('close', (code) => {
  console.log(`\n✅ Slice Machine exited with code ${code}`);
  process.exit(code);
});

slicemachine.on('error', (error) => {
  console.error('❌ Failed to start Slice Machine:', error.message);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping Slice Machine...');
  slicemachine.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping Slice Machine...');
  slicemachine.kill('SIGTERM');
});
