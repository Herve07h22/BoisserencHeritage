#!/bin/bash

# Export static site script for Boisserenc
echo "🚀 Starting static export process for Boisserenc website..."

# Make sure the out directory exists
mkdir -p out

# Step 1: Build the client-side application
echo "📦 Building client-side assets..."
NODE_ENV=production npx vite build --outDir=out

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Aborting export."
  exit 1
fi

# Step 2: Export data from in-memory storage to JSON files
echo "📄 Exporting API data to JSON files..."
npx tsx scripts/export-data.ts

if [ $? -ne 0 ]; then
  echo "❌ Data export failed. Aborting export."
  exit 1
fi

# Step 3: Inject the static data loader script
echo "💉 Injecting static data loader..."
npx tsx scripts/inject-static-loader.ts

if [ $? -ne 0 ]; then
  echo "❌ Loader injection failed. Export may be incomplete."
  exit 1
fi

echo ""
echo "📦 Static export completed successfully!"
echo "📁 The exported site is in the 'out' directory"
echo ""
echo "To serve the static site locally, you can use:"
echo "npx serve out"
echo ""
echo "For deployment, upload the contents of the 'out' directory to your static hosting provider."