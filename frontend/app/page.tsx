'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Skill {
  name: string;
  importance: string;
  category: string;
}

interface JobAnalysis {
  role_title: string;
  company_type: string;
  experience_level: string;
  key_skills: Skill[];
  difficulty_level: string;
  summary: string;
}

interface StudyTopic {
  topic: string;
  description: string;
  estimated_hours: number;
  resources: string[];
  priority: number;
}

interface StudyPlan {
  total_duration_hours: number;
  topics: StudyTopic[];
  preparation_strategy: string;
  timeline_suggestion: string;
}

interface PracticeQuestion {
  question: string;
  type: string;
  difficulty: string;
  hints: string[];
  key_points: string[];
}

interface AnswerEvaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  suggested_answer: string;
  overall_feedback: string;
}

export default function Home() {
  const [step, setStep] = useState<'input' | 'analysis' | 'plan' | 'practice' | 'evaluation'>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [jobDescription, setJobDescription] = useState('');
  const [jobAnalysis, setJobAnalysis] = useState<JobAnalysis | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);

  const analyzeJob = async () => {
    if (!jobDescription.trim() || jobDescription.length < 50) {
      setError('Please enter a job description (at least 50 characters)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/analyze-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: jobDescription }),
      });

      if (!response.ok) throw new Error('Failed to analyze job');

      const data = await response.json();
      setJobAnalysis(data);
      setStep('analysis');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze job description');
    } finally {
      setLoading(false);
    }
  };

  const generateStudyPlan = async () => {
    if (!jobAnalysis) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/generate-study-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_analysis: jobAnalysis,
          available_time_hours: 40
        }),
      });

      if (!response.ok) throw new Error('Failed to generate study plan');

      const data = await response.json();
      setStudyPlan(data);
      setStep('plan');
    } catch (err: any) {
      setError(err.message || 'Failed to generate study plan');
    } finally {
      setLoading(false);
    }
  };

  const generateQuestions = async (topic: string) => {
    if (!jobAnalysis) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/generate-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_analysis: jobAnalysis,
          topic: topic,
          count: 5
        }),
      });

      if (!response.ok) throw new Error('Failed to generate questions');

      const data = await response.json();
      setQuestions(data.questions);
      setCurrentQuestionIndex(0);
      setStep('practice');
    } catch (err: any) {
      setError(err.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!userAnswer.trim() || userAnswer.length < 10) {
      setError('Please provide an answer (at least 10 characters)');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/evaluate-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          user_answer: userAnswer,
          expected_key_points: currentQuestion.key_points
        }),
      });

      if (!response.ok) throw new Error('Failed to evaluate answer');

      const data = await response.json();
      setEvaluation(data);
      setStep('evaluation');
    } catch (err: any) {
      setError(err.message || 'Failed to evaluate answer');
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setEvaluation(null);
      setStep('practice');
    }
  };

  const reset = () => {
    setStep('input');
    setJobDescription('');
    setJobAnalysis(null);
    setStudyPlan(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setEvaluation(null);
    setError('');
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Interview Prep AI
          </h1>
          <p className="text-xl text-gray-400">
            Your AI-powered study assistant for acing interviews
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 fade-in">
            {error}
          </div>
        )}

        {/* Step 1: Job Description Input */}
        {step === 'input' && (
          <div className="card fade-in">
            <h2 className="text-2xl font-bold mb-4">Step 1: Paste Job Description</h2>
            <p className="text-gray-400 mb-6">
              Paste the job description you want to prepare for, and our AI will analyze it.
            </p>
            <textarea
              className="input-field min-h-[300px] mb-4"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn-primary w-full"
              onClick={analyzeJob}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="loading-spinner w-5 h-5" />
                  Analyzing...
                </span>
              ) : (
                'Analyze Job Description'
              )}
            </button>
          </div>
        )}

        {/* Step 2: Job Analysis Results */}
        {step === 'analysis' && jobAnalysis && (
          <div className="space-y-6 fade-in">
            <div className="card">
              <h2 className="text-3xl font-bold mb-2">{jobAnalysis.role_title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-important">{jobAnalysis.company_type}</span>
                <span className="badge badge-important">{jobAnalysis.experience_level}</span>
                <span className="badge badge-critical">{jobAnalysis.difficulty_level}</span>
              </div>
              <p className="text-gray-300 mb-6">{jobAnalysis.summary}</p>

              <h3 className="text-xl font-semibold mb-4">Key Skills Required</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {jobAnalysis.key_skills.map((skill, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold">{skill.name}</span>
                      <span className={`badge ${skill.importance === 'Critical' ? 'badge-critical' :
                          skill.importance === 'Important' ? 'badge-important' : 'badge-nice'
                        }`}>
                        {skill.importance}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="btn-primary flex-1" onClick={generateStudyPlan} disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="loading-spinner w-5 h-5" />
                    Generating...
                  </span>
                ) : (
                  'Generate Study Plan'
                )}
              </button>
              <button
                className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                onClick={reset}
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Study Plan */}
        {step === 'plan' && studyPlan && (
          <div className="space-y-6 fade-in">
            <div className="card">
              <h2 className="text-3xl font-bold mb-4">Your Personalized Study Plan</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400">Total Duration</div>
                  <div className="text-2xl font-bold">{studyPlan.total_duration_hours} hours</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-gray-400">Timeline</div>
                  <div className="text-2xl font-bold">{studyPlan.timeline_suggestion}</div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                <h3 className="font-semibold mb-2">Strategy</h3>
                <p className="text-gray-300">{studyPlan.preparation_strategy}</p>
              </div>

              <h3 className="text-xl font-semibold mb-4">Study Topics</h3>
              <div className="space-y-4">
                {studyPlan.topics.map((topic, idx) => (
                  <div key={idx} className="card">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold">{topic.topic}</h4>
                      <div className="flex gap-2">
                        <span className="badge badge-important">{topic.estimated_hours}h</span>
                        <span className="badge badge-nice">Priority {topic.priority}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{topic.description}</p>
                    <div>
                      <div className="text-sm font-semibold mb-2 text-gray-400">Resources:</div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        {topic.resources.map((resource, ridx) => (
                          <li key={ridx}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="mt-4 btn-primary w-full"
                      onClick={() => generateQuestions(topic.topic)}
                      disabled={loading}
                    >
                      Practice {topic.topic}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition w-full"
              onClick={reset}
            >
              Start Over
            </button>
          </div>
        )}

        {/* Step 4: Practice Questions */}
        {step === 'practice' && questions.length > 0 && (
          <div className="card fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Practice Question {currentQuestionIndex + 1}/{questions.length}</h2>
              <span className={`badge ${questions[currentQuestionIndex].difficulty === 'Hard' ? 'badge-critical' :
                  questions[currentQuestionIndex].difficulty === 'Medium' ? 'badge-important' : 'badge-nice'
                }`}>
                {questions[currentQuestionIndex].difficulty}
              </span>
            </div>

            <div className="mb-6 p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">{questions[currentQuestionIndex].type}</div>
              <p className="text-lg">{questions[currentQuestionIndex].question}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">💡 Hints:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {questions[currentQuestionIndex].hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>

            <textarea
              className="input-field min-h-[200px] mb-4"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={loading}
            />

            <div className="flex gap-4">
              <button
                className="btn-primary flex-1"
                onClick={evaluateAnswer}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="loading-spinner w-5 h-5" />
                    Evaluating...
                  </span>
                ) : (
                  'Submit Answer'
                )}
              </button>
              <button
                className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                onClick={() => setStep('plan')}
              >
                Back to Plan
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Answer Evaluation */}
        {step === 'evaluation' && evaluation && (
          <div className="space-y-6 fade-in">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Your Score</h2>
                <div className="text-5xl font-bold gradient-text">{evaluation.score}/100</div>
              </div>

              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <h3 className="font-semibold mb-2">✅ Strengths</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {evaluation.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <h3 className="font-semibold mb-2">📈 Areas for Improvement</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {evaluation.improvements.map((improvement, idx) => (
                    <li key={idx}>{improvement}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Suggested Answer</h3>
                <p className="text-gray-300">{evaluation.suggested_answer}</p>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-semibold mb-2">Overall Feedback</h3>
                <p className="text-gray-300">{evaluation.overall_feedback}</p>
              </div>
            </div>

            <div className="flex gap-4">
              {currentQuestionIndex < questions.length - 1 ? (
                <button className="btn-primary flex-1" onClick={nextQuestion}>
                  Next Question ({currentQuestionIndex + 2}/{questions.length})
                </button>
              ) : (
                <button className="btn-primary flex-1" onClick={() => setStep('plan')}>
                  Back to Study Plan
                </button>
              )}
              <button
                className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                onClick={reset}
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by Pydantic AI & Google Gemini</p>
        </footer>
      </div>
    </main>
  );
}
