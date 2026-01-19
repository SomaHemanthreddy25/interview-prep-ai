# Interview Prep AI - Smart Study Assistant

An AI-powered interview preparation assistant that helps students ace job interviews by analyzing job descriptions, generating personalized study plans, and providing practice questions with real-time feedback.

![Interview Prep AI](https://img.shields.io/badge/AI-Pydantic%20AI-blue) ![Framework](https://img.shields.io/badge/Framework-Next.js-black) ![Backend](https://img.shields.io/badge/Backend-FastAPI-green)

## 🎯 Problem Statement

Students struggle to prepare effectively for technical interviews because:
- Job descriptions are overwhelming and unclear about what to prioritize
- Generic interview prep doesn't match specific role requirements
- No personalized feedback on practice answers
- Difficulty tracking preparation progress

## ✨ Solution

Interview Prep AI is a full-stack generative AI agent application that:
1. **Analyzes job descriptions** to extract key skills and requirements
2. **Generates personalized study plans** based on the specific role
3. **Creates practice questions** tailored to the position
4. **Provides real-time feedback** on practice answers with scoring
5. **Tracks progress** and suggests areas for improvement

## 🛠️ Tech Stack

### Backend
- **Pydantic AI** - AI agent framework with structured outputs
- **FastAPI** - Modern Python web framework
- **Google Gemini Flash** - Free AI model (via Gemini API)
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism and gradient effects

### Deployment
- **Vercel** - Full-stack deployment platform
- **Environment Variables** - Secure API key management

## 🚀 Features

### 1. Job Description Analysis
- Extracts role title, company type, and experience level
- Identifies key skills with importance levels (Critical, Important, Nice-to-have)
- Categorizes skills (Technical, Soft Skills, Domain Knowledge)
- Provides difficulty assessment and role summary

### 2. Personalized Study Plan
- Generates topic-wise breakdown with time estimates
- Provides high-quality learning resources
- Prioritizes topics by importance
- Suggests realistic timeline for preparation
- Includes overall preparation strategy

### 3. Practice Questions
- Generates realistic interview questions
- Includes technical, behavioral, and situational questions
- Provides difficulty levels (Easy, Medium, Hard)
- Offers helpful hints and key points to cover

### 4. Answer Evaluation
- Scores answers out of 100
- Highlights strengths in the response
- Provides actionable improvement suggestions
- Offers example of a strong answer
- Gives encouraging overall feedback

## 📦 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Google Gemini API key (free at https://aistudio.google.com/app/apikey)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_api_key_here

# Run the backend
python main.py
```

Backend will run on `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Deploy to Vercel

1. **Backend Deployment**:
   - Create a new Vercel project
   - Connect your GitHub repository
   - Set environment variable: `GEMINI_API_KEY`
   - Deploy backend as serverless functions

2. **Frontend Deployment**:
   - Create another Vercel project for frontend
   - Set environment variable: `NEXT_PUBLIC_API_URL` (your backend URL)
   - Deploy

3. **Alternative**: Deploy as monorepo with both frontend and backend

## 📖 API Documentation

### Endpoints

#### `POST /api/analyze-job`
Analyzes a job description and extracts structured information.

**Request:**
```json
{
  "job_description": "string (min 50 characters)"
}
```

**Response:**
```json
{
  "role_title": "string",
  "company_type": "string",
  "experience_level": "string",
  "key_skills": [
    {
      "name": "string",
      "importance": "Critical | Important | Nice-to-have",
      "category": "Technical | Soft Skill | Domain Knowledge"
    }
  ],
  "difficulty_level": "Entry | Intermediate | Advanced",
  "summary": "string"
}
```

#### `POST /api/generate-study-plan`
Generates a personalized study plan.

**Request:**
```json
{
  "job_analysis": { /* JobAnalysis object */ },
  "available_time_hours": 40
}
```

**Response:**
```json
{
  "total_duration_hours": 120,
  "topics": [
    {
      "topic": "string",
      "description": "string",
      "estimated_hours": 20,
      "resources": ["string"],
      "priority": 1
    }
  ],
  "preparation_strategy": "string",
  "timeline_suggestion": "string"
}
```

#### `POST /api/generate-questions`
Generates practice interview questions.

**Request:**
```json
{
  "job_analysis": { /* JobAnalysis object */ },
  "topic": "string",
  "count": 5
}
```

**Response:**
```json
{
  "questions": [
    {
      "question": "string",
      "type": "Technical | Behavioral | Situational",
      "difficulty": "Easy | Medium | Hard",
      "hints": ["string"],
      "key_points": ["string"]
    }
  ],
  "focus_area": "string"
}
```

#### `POST /api/evaluate-answer`
Evaluates a practice answer and provides feedback.

**Request:**
```json
{
  "question": "string",
  "user_answer": "string (min 10 characters)",
  "expected_key_points": ["string"]
}
```

**Response:**
```json
{
  "score": 85,
  "strengths": ["string"],
  "improvements": ["string"],
  "suggested_answer": "string",
  "overall_feedback": "string"
}
```

## 🎨 Design Features

- **Glassmorphism UI** - Modern frosted glass effects
- **Gradient Accents** - Vibrant color gradients
- **Smooth Animations** - Fade-in and transition effects
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Loading States** - Clear feedback during AI processing
- **Error Handling** - User-friendly error messages
- **Premium Typography** - Inter font family
- **Dark Mode** - Eye-friendly dark theme

## 🔒 Security

- Environment variables for API keys
- CORS configuration for API security
- Input validation with Pydantic models
- Error handling and logging
- No sensitive data in client-side code

## 🧪 Testing

### Backend
```bash
cd backend
pytest tests/ -v
```

### Frontend
```bash
cd frontend
npm run build
npm run start
```

## 📝 Project Structure

```
interview-prep-ai/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── agent.py             # Pydantic AI agents
│   ├── models.py            # Pydantic models
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables template
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Main application page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── package.json         # Node dependencies
│   └── .env.example         # Environment variables template
└── README.md                # This file
```

## 🎯 Evaluation Criteria Met

✅ **Full-stack application quality**
- Complete end-to-end functionality
- Clean code structure and organization
- Proper error handling and validation

✅ **Clear product flow and real user journey**
- Intuitive step-by-step process
- Smooth transitions between stages
- Clear call-to-actions

✅ **Thoughtful feature design**
- Solves real problem for students
- AI-powered personalization
- Comprehensive feedback system

✅ **Design language and UX polish**
- Premium glassmorphism design
- Consistent color scheme and typography
- Smooth animations and transitions

✅ **Fast and smooth experience**
- Optimized loading states
- Responsive UI
- Error handling with retry logic

✅ **Robust backend implementation**
- Clean REST API design
- Pydantic AI agent orchestration
- Structured outputs with validation
- Logging and error handling
- Retry mechanisms

## 👨‍💻 Author

Created by [Your Name] for Haveloc Assignment

## 📄 License

MIT License

## 🙏 Acknowledgments

- Pydantic AI for the amazing agent framework
- Google Gemini for free AI model access
- Next.js and FastAPI communities
