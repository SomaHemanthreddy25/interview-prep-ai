"""
Vercel Serverless Function Entry Point for FastAPI Backend
"""
import os
import sys

# Add the api directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

from main import app

# Export for Vercel
handler = app
