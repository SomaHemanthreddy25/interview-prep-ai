# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd interview-prep-ai
vercel
```

4. **Set Environment Variables**:
```bash
vercel env add GEMINI_API_KEY
```
Enter your Gemini API key when prompted.

5. **Deploy to Production**:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Interview Prep AI"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: `./`
     - Build Command: `cd frontend && npm install && npm run build`
     - Output Directory: `frontend/.next`

3. **Add Environment Variables** in Vercel Dashboard:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `NEXT_PUBLIC_API_URL`: Your Vercel backend URL (e.g., https://your-app.vercel.app)

4. **Deploy**: Click "Deploy"

## Alternative: Separate Deployments

### Backend (Railway/Render)

1. **Deploy to Railway**:
   - Go to https://railway.app
   - Create new project from GitHub
   - Select `backend` directory
   - Add environment variable: `GEMINI_API_KEY`
   - Deploy

2. **Get Backend URL**: Copy the deployed URL (e.g., `https://your-backend.railway.app`)

### Frontend (Vercel/Netlify)

1. **Update Frontend Environment**:
   - Set `NEXT_PUBLIC_API_URL` to your backend URL

2. **Deploy to Vercel**:
   - Import `frontend` directory
   - Add environment variable: `NEXT_PUBLIC_API_URL`
   - Deploy

## Get Gemini API Key (Free)

1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to your deployment environment variables

## Testing Deployment

After deployment, test the following:
1. Visit your deployed URL
2. Paste a job description
3. Verify job analysis works
4. Generate study plan
5. Practice questions
6. Answer evaluation

## Troubleshooting

- **CORS Errors**: Ensure backend allows your frontend origin
- **API Key Errors**: Verify `GEMINI_API_KEY` is set correctly
- **Build Errors**: Check Node.js and Python versions match requirements
- **Timeout Errors**: Gemini API may take time; increase timeout if needed
