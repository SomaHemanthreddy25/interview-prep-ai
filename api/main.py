"""
FastAPI backend for Interview Prep AI Agent.
"""
import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import (
    JobAnalysisRequest, StudyPlanRequest, QuestionRequest, EvaluationRequest,
    JobAnalysis, StudyPlan, QuestionSet, AnswerEvaluation, HealthResponse
)
from agent import (
    analyze_job_description, generate_study_plan,
    generate_questions, evaluate_answer
)

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Interview Prep AI Agent",
    description="AI-powered interview preparation assistant using Pydantic AI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint with service info."""
    return HealthResponse()


@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse()


@app.post("/api/analyze-job", response_model=JobAnalysis)
async def analyze_job(request: JobAnalysisRequest):
    """
    Analyze a job description and extract structured information.
    
    Args:
        request: Job description to analyze
        
    Returns:
        Structured job analysis with skills, requirements, and difficulty
        
    Raises:
        HTTPException: If analysis fails
    """
    try:
        logger.info("Received job analysis request")
        result = await analyze_job_description(request)
        return result
    except Exception as e:
        logger.error(f"Job analysis endpoint failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze job description: {str(e)}"
        )


@app.post("/api/generate-study-plan", response_model=StudyPlan)
async def create_study_plan(request: StudyPlanRequest):
    """
    Generate a personalized study plan based on job analysis.
    
    Args:
        request: Job analysis and available study time
        
    Returns:
        Structured study plan with topics, resources, and timeline
        
    Raises:
        HTTPException: If generation fails
    """
    try:
        logger.info("Received study plan generation request")
        result = await generate_study_plan(request)
        return result
    except Exception as e:
        logger.error(f"Study plan generation endpoint failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate study plan: {str(e)}"
        )


@app.post("/api/generate-questions", response_model=QuestionSet)
async def create_questions(request: QuestionRequest):
    """
    Generate practice interview questions.
    
    Args:
        request: Job analysis, topic, and question count
        
    Returns:
        Set of practice questions with hints and key points
        
    Raises:
        HTTPException: If generation fails
    """
    try:
        logger.info("Received question generation request")
        result = await generate_questions(request)
        return result
    except Exception as e:
        logger.error(f"Question generation endpoint failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate questions: {str(e)}"
        )


@app.post("/api/evaluate-answer", response_model=AnswerEvaluation)
async def evaluate_user_answer(request: EvaluationRequest):
    """
    Evaluate a practice answer and provide feedback.
    
    Args:
        request: Question, user answer, and expected key points
        
    Returns:
        Evaluation with score, strengths, improvements, and feedback
        
    Raises:
        HTTPException: If evaluation fails
    """
    try:
        logger.info("Received answer evaluation request")
        result = await evaluate_answer(request)
        return result
    except Exception as e:
        logger.error(f"Answer evaluation endpoint failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to evaluate answer: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
