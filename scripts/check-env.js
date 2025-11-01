#!/usr/bin/env node

/**
 * Environment validation script
 * Run this before deployment to ensure all required environment variables are set
 */

const fs = require('fs');
const path = require('path');

const requiredEnvVars = ['GEMINI_API_KEY'];

console.log('🔍 Checking environment configuration...\n');

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envLocalPath)) {
  console.error('❌ .env.local file not found!');
  console.log('💡 Create one by copying .env.example:');
  console.log('   cp .env.example .env.local\n');
  
  // For production builds (Vercel), environment variables are set differently
  if (process.env.VERCEL || process.env.CI) {
    console.log('ℹ️  Running in CI/Production environment - skipping local file check');
    process.exit(0);
  }
  
  process.exit(1);
}

// Parse .env.local file manually
const envContent = fs.readFileSync(envLocalPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

let hasErrors = false;

// Check each required variable
requiredEnvVars.forEach(varName => {
  const value = envVars[varName] || process.env[varName];
  
  if (!value) {
    console.error(`❌ ${varName} is not set`);
    hasErrors = true;
  } else if (value.includes('your_') || value.includes('_here')) {
    console.error(`❌ ${varName} is set to placeholder value`);
    console.log(`   Please update it with your actual API key`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName} is configured`);
  }
});

if (hasErrors) {
  console.error('\n❌ Environment configuration has errors!');
  console.log('\n📖 Setup instructions:');
  console.log('   1. Get a Gemini API key: https://aistudio.google.com/app/apikey');
  console.log('   2. Add it to your .env.local file');
  console.log('   3. Run this script again to verify\n');
  process.exit(1);
}

console.log('\n✅ All environment variables are properly configured!');
console.log('🚀 Ready for deployment!\n');
process.exit(0);

