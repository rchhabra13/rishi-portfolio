#!/usr/bin/env node

/**
 * Pinecone Setup Helper
 * This script helps you configure and test your Pinecone credentials
 */

import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration
const config = {
  PINECONE_API_KEY: process.env.PINECONE_API_KEY || 'pcsk_7K5opF_48aAzDW3PMpGY8bvrhnk51FgKYSnWaF2kku8Ndxd31gtY9GYdYRMaePN5TqW6mA',
  PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME || 'portfolio-rishi',
};

async function testPineconeConnection() {
  console.log('🔍 Testing Pinecone connection...');
  console.log(`API Key: ${config.PINECONE_API_KEY.substring(0, 10)}...`);
  console.log(`Index Name: ${config.PINECONE_INDEX_NAME}`);
  
  try {
    // Initialize Pinecone
    const pinecone = new Pinecone({
      apiKey: config.PINECONE_API_KEY,
    });

    // Test connection by listing indexes
    console.log('\n📋 Available indexes:');
    const indexes = await pinecone.listIndexes();
    console.log(indexes);

    // Check if our target index exists
    const targetIndex = indexes.indexes?.find(idx => idx.name === config.PINECONE_INDEX_NAME);
    
    if (targetIndex) {
      console.log(`\n✅ Index "${config.PINECONE_INDEX_NAME}" found!`);
      console.log(`   Status: ${targetIndex.status}`);
      console.log(`   Dimensions: ${targetIndex.dimension}`);
      console.log(`   Metric: ${targetIndex.metric}`);
      
      // Get index stats
      const index = pinecone.index(config.PINECONE_INDEX_NAME);
      const stats = await index.describeIndexStats();
      console.log(`\n📊 Index Statistics:`);
      console.log(`   Total Vectors: ${stats.totalVectorCount || 0}`);
      console.log(`   Dimension: ${stats.dimension || 'Unknown'}`);
      
    } else {
      console.log(`\n❌ Index "${config.PINECONE_INDEX_NAME}" not found.`);
      console.log('Available indexes:', indexes.indexes?.map(idx => idx.name) || 'None');
    }

  } catch (error) {
    console.error('❌ Error connecting to Pinecone:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 This looks like an authentication error. Please check your API key.');
    } else if (error.message.includes('403')) {
      console.log('\n💡 This looks like a permissions error. Please check your API key permissions.');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 This looks like a network error. Please check your internet connection.');
    }
  }
}

async function showEnvironmentSetup() {
  console.log('\n🔧 Environment Setup Instructions:');
  console.log('\n1. Create a .env file in your project root:');
  console.log('   touch .env');
  
  console.log('\n2. Add your Pinecone credentials to .env:');
  console.log('   PINECONE_API_KEY=your_api_key_here');
  console.log('   PINECONE_INDEX_NAME=portfolio-rishi');
  
  console.log('\n3. Install dotenv if not already installed:');
  console.log('   npm install dotenv');
  
  console.log('\n4. Your current credentials:');
  console.log(`   API Key: ${config.PINECONE_API_KEY.substring(0, 20)}...`);
  console.log(`   Index Name: ${config.PINECONE_INDEX_NAME}`);
}

async function main() {
  console.log('🚀 Pinecone Setup Helper\n');
  
  await testPineconeConnection();
  await showEnvironmentSetup();
  
  console.log('\n✨ Setup complete!');
}

main().catch(console.error);
