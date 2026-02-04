#!/bin/bash

set -e

echo "🎨 Formatting with Prettier..."
npm run format

echo ""
echo "🔧 Linting with ESLint..."
npm run lint:fix

echo ""
echo "🚀 Starting dev server..."
npm run dev
