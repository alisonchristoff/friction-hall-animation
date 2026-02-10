#!/bin/bash
# Simple HTTP server for testing the animation
# Run with: ./serve.sh

echo "Starting local server at http://localhost:8000"
echo "Press Ctrl+C to stop"
python3 -m http.server 8000
