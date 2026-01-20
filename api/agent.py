"""
Pydantic AI Agent implementation for interview preparation.
"""
import os
import logging
from typing import Optional
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
from models import (
    JobAnalysis, StudyPlan, QuestionSet, AnswerEvaluation,
    JobAnalysisRequest, StudyPlanRequest, QuestionRequest, EvaluationRequest
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Gemini model
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY not set. Agent will fail at runtime.")

gemini_model = GeminiModel("gemini-1.5-flash", api_key=GEMINI_API_KEY)


# Job Analysis Agent
job_analysis_agent = Agent(
    model=gemini_model,
    result_type=JobAnalysis,
    system_prompt="""You are an expert career counselor and job market analyst.
    
Your task is to analyze job descriptions and extract structured information about:
- Role title and company type
- Required experience level
- Key skills categorized by importance (Critical, Important, Nice-to-have)
- Skill categories (Technical, Soft Skill, Domain Knowledge)
- Overall difficulty level
- Clear summary of the role

Be precise and thorough. Focus on actionable insights for interview preparation.""",
    retries=2,
)


# Study Plan Agent
study_plan_agent = Agent(
    model=gemini_model,
    result_type=StudyPlan,
    system_prompt="""You are an expert learning strategist and interview preparation coach.

Your task is to create personalized study plans based on job requirements.

For each study plan:
- Break down into specific, actionable topics
- Provide realistic time estimates
- Suggest high-quality learning resources (courses, books, websites)
- Prioritize topics by importance
- Include a clear preparation strategy
- Suggest a realistic timeline

Focus on practical, interview-ready knowledge. Be encouraging but realistic.""",
    retries=2,
)


# Question Generation Agent
question_agent = Agent(
    model=gemini_model,
    result_type=QuestionSet,
    system_prompt="""You are an expert interviewer with experience across multiple industries.

Your task is to generate realistic, high-quality practice interview questions.

For each question:
- Make it relevant to the specific job role
- Vary difficulty levels (Easy, Medium, Hard)
- Include different types (Technical, Behavioral, Situational)
- Provide helpful hints
- List key points that a strong answer should cover

Questions should feel authentic and help candidates prepare effectively.""",
    retries=2,
)


# Answer Evaluation Agent
evaluation_agent = Agent(
    model=gemini_model,
    result_type=AnswerEvaluation,
    system_prompt="""You are a supportive interview coach providing constructive feedback.

Your task is to evaluate practice answers and help candidates improve.

For each evaluation:
- Give a fair score (0-100)
- Highlight specific strengths in the answer
- Provide actionable improvement suggestions
- Offer an example of a strong answer
- Give encouraging overall feedback

Be honest but supportive. Focus on helping the candidate grow.""",
    retries=2,
)


async def analyze_job_description(request: JobAnalysisRequest) -> JobAnalysis:
    """
    Analyze a job description and extract structured information.
    
    Args:
        request: Job analysis request with job description
        
    Returns:
        Structured job analysis
        
    Raises:
        Exception: If analysis fails after retries
    """
    try:
        logger.info("Analyzing job description...")
        result = await job_analysis_agent.run(request.job_description)
        logger.info(f"Job analysis completed: {result.data.role_title}")
        return result.data
    except Exception as e:
        logger.error(f"Job analysis failed: {str(e)}")
        raise


async def generate_study_plan(request: StudyPlanRequest) -> StudyPlan:
    """
    Generate a personalized study plan based on job analysis.
    
    Args:
        request: Study plan request with job analysis and available time
        
    Returns:
        Structured study plan
        
    Raises:
        Exception: If generation fails after retries
    """
    try:
        logger.info("Generating study plan...")
        
        # Create context from job analysis
        context = f"""
Job Role: {request.job_analysis.role_title}
Experience Level: {request.job_analysis.experience_level}
Difficulty: {request.job_analysis.difficulty_level}
Available Time: {request.available_time_hours} hours/week

Key Skills Required:
{chr(10).join([f"- {skill.name} ({skill.importance})" for skill in request.job_analysis.key_skills])}

Create a comprehensive study plan to prepare for this role.
"""
        
        result = await study_plan_agent.run(context)
        logger.info(f"Study plan generated with {len(result.data.topics)} topics")
        return result.data
    except Exception as e:
        logger.error(f"Study plan generation failed: {str(e)}")
        raise


async def generate_questions(request: QuestionRequest) -> QuestionSet:
    """
    Generate practice interview questions.
    
    Args:
        request: Question request with job analysis and topic
        
    Returns:
        Set of practice questions
        
    Raises:
        Exception: If generation fails after retries
    """
    try:
        logger.info(f"Generating {request.count} questions for topic: {request.topic}")
        
        context = f"""
Job Role: {request.job_analysis.role_title}
Experience Level: {request.job_analysis.experience_level}
Topic Focus: {request.topic}

Generate {request.count} diverse, realistic interview questions for this role and topic.
Include a mix of technical, behavioral, and situational questions.
"""
        
        result = await question_agent.run(context)
        logger.info(f"Generated {len(result.data.questions)} questions")
        return result.data
    except Exception as e:
        logger.error(f"Question generation failed: {str(e)}")
        raise


async def evaluate_answer(request: EvaluationRequest) -> AnswerEvaluation:
    """
    Evaluate a practice answer and provide feedback.
    
    Args:
        request: Evaluation request with question, answer, and expected points
        
    Returns:
        Structured evaluation with feedback
        
    Raises:
        Exception: If evaluation fails after retries
    """
    try:
        logger.info("Evaluating answer...")
        
        context = f"""
Question: {request.question}

Expected Key Points:
{chr(10).join([f"- {point}" for point in request.expected_key_points])}

Candidate's Answer:
{request.user_answer}

Evaluate this answer and provide constructive feedback.
"""
        
        result = await evaluation_agent.run(context)
        logger.info(f"Answer evaluated with score: {result.data.score}")
        return result.data
    except Exception as e:
        logger.error(f"Answer evaluation failed: {str(e)}")
        raise
