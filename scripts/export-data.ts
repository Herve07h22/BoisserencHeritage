/**
 * Export data script for Boisserenc static site
 * 
 * This script exports all the data from the in-memory storage to JSON files
 * that can be included in a static site export.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from '../server/storage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const apiDir = path.join(outDir, 'api');

// Ensure the out/api directory exists
if (!fs.existsSync(apiDir)){
  fs.mkdirSync(apiDir, { recursive: true });
}

// Helper function to export data to JSON file
async function exportData(name: string, getData: () => Promise<any[]>) {
  try {
    console.log(`📦 Exporting ${name} data...`);
    const data = await getData();
    fs.writeFileSync(
      path.join(apiDir, `${name}.json`),
      JSON.stringify(data, null, 2)
    );
    console.log(`✅ Exported ${data.length} ${name} items`);
    return data;
  } catch (error) {
    console.error(`❌ Error exporting ${name} data:`, error);
    return [];
  }
}

// Main export function
async function exportAllData() {
  console.log('🚀 Starting data export process...');
  
  // Export all the data
  await exportData('blog', () => storage.getBlogPosts());
  await exportData('stoves',() =>  storage.getStoveProjects());
  await exportData('stoves-featured', () => storage.getFeaturedStoveProjects());
  await exportData('testimonials', () => storage.getTestimonials());
  
  console.log('📦 Data export completed!');
}

// Run the export
exportAllData().catch(console.error);