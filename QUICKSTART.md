# Quick Start Guide

## 🚀 Get Your Gemini API Key (Free - Takes 2 minutes)

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

## 📝 Setup Backend

1. Open `backend/.env.example`
2. Copy it to `backend/.env`
3. Replace `your_gemini_api_key_here` with your actual API key

## 🎯 Option 1: Deploy to Vercel (Fastest - Recommended)

### Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)

### Steps

1. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "interview-prep-ai")
   - Copy the repository URL

2. **Push Code to GitHub**:
```bash
cd interview-prep-ai
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin master
```

3. **Deploy on Vercel**:
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"
   
4. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Install Command: Leave empty

5. **Add Environment Variable**:
   - Go to "Settings" → "Environment Variables"
   - Add: `GEMINI_API_KEY` = `your_gemini_api_key`
   - Click "Save"

6. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at: `https://your-app-name.vercel.app`

## 🎯 Option 2: Deploy Backend + Frontend Separately

### Backend on Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set Root Directory: `backend`
5. Add environment variable: `GEMINI_API_KEY`
6. Deploy
7. Copy the deployed URL (e.g., `https://your-backend.railway.app`)

### Frontend on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set Root Directory: `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app`
5. Deploy

## 🧪 Test Locally (Optional)

### Backend
```bash
cd backend
pip install -r requirements.txt
# Create .env file with GEMINI_API_KEY
python main.py
```
Backend runs on: http://localhost:8000

### Frontend
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```
Frontend runs on: http://localhost:3000

## ✅ Verify Deployment

1. Visit your deployed URL
2. Paste a job description (try the one below)
3. Click "Analyze Job Description"
4. Verify the analysis appears
5. Click "Generate Study Plan"
6. Click "Practice" on any topic
7. Answer a question and submit

### Sample Job Description for Testing

```
Senior Full Stack Developer

We are looking for an experienced Full Stack Developer to join our team.

Requirements:
- 3+ years of experience with React and Node.js
- Strong knowledge of TypeScript
- Experience with PostgreSQL and MongoDB
- Familiarity with AWS or GCP
- Understanding of RESTful APIs and GraphQL
- Experience with Git and CI/CD pipelines

Nice to have:
- Experience with Next.js
- Knowledge of Docker and Kubernetes
- Previous startup experience

Responsibilities:
- Build and maintain web applications
- Collaborate with design and product teams
- Write clean, maintainable code
- Participate in code reviews
```

## 📹 Record Loom Video

1. Go to https://www.loom.com
2. Click "Get Loom for Free"
3. Install browser extension
4. Click the Loom extension
5. Select "Screen + Camera"
6. Show your face
7. Navigate to your deployed app
8. Explain:
   - What problem it solves
   - How you built it (Pydantic AI + Next.js)
   - Demo the features (paste job description, generate plan, practice questions)
9. Keep it under 1 minute
10. Copy the video link

## 📤 Submit Assignment

1. Go to: https://forms.gle/sJCV51j9uSpXq4LR6
2. Fill in:
   - Live deployed URL (from Vercel/Railway)
   - GitHub repository link
   - Loom video link
   - Upload your resume PDF
3. Submit before 4:00 PM

## 🆘 Troubleshooting

**"Failed to analyze job"**:
- Check if GEMINI_API_KEY is set correctly in environment variables
- Verify the API key is valid at https://aistudio.google.com/app/apikey

**"Network error"**:
- Check if backend is deployed and running
- Verify NEXT_PUBLIC_API_URL points to correct backend URL

**Build fails**:
- Check Node.js version (should be 18+)
- Clear cache and rebuild

## 📞 Need Help?

- Check DEPLOYMENT.md for detailed deployment instructions
- Check README.md for full documentation
- Verify all environment variables are set correctly

---

**Time Remaining**: You have until 4:00 PM today!

Good luck! 🚀
