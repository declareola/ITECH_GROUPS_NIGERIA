import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Type } from '@google/genai';
import { PROJECT_SCOPING_QUESTIONS_PROMPT, PROJECT_SCOPING_BRIEF_PROMPT } from '../constants';
import { 
  XMarkIcon, 
  LoadingSpinnerIcon, 
  SparklesIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon
} from './IconComponents';
import { trackEvent } from '../utils/analytics';
import { Link } from 'react-router-dom';

let aiInstance: GoogleGenAI | null = null;
const getAi = (): GoogleGenAI | null => {
  try {
    if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
      console.error("API_KEY is not available. AI features will be disabled.");
      return null;
    }
    if (!aiInstance) {
      aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return aiInstance;
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e);
    return null;
  }
};

type ToolStep = 'initial' | 'questions' | 'answers' | 'briefing' | 'complete';

interface ProjectBrief {
  projectTitle: string;
  summary: string;
  suggestedSolutions: string[];
  recommendedItechServices: string[];
  recommendedItechDivisions: string[];
  nextSteps: string;
}

interface ProjectScopingToolProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectScopingTool: React.FC<ProjectScopingToolProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ToolStep>('initial');
  const [initialPrompt, setInitialPrompt] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [brief, setBrief] = useState<ProjectBrief | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      trackEvent('scoping_tool_opened');
    }
  }, [isOpen]);

  const resetState = () => {
    setStep('initial');
    setInitialPrompt('');
    setQuestions([]);
    setAnswers([]);
    setBrief(null);
    setIsLoading(false);
    setError(null);
  };
  
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleAskQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialPrompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    trackEvent('scoping_tool_step1_submit');

    const ai = getAi();
    if (!ai) {
      setError("AI service is not configured. Please contact support.");
      setIsLoading(false);
      return;
    }

    try {
      const fullPrompt = `${PROJECT_SCOPING_QUESTIONS_PROMPT}\n${initialPrompt}`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['questions'],
          },
        },
      });

      const data = JSON.parse(response.text);
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(''));
      setStep('answers');
      trackEvent('scoping_tool_questions_generated');
    } catch (err) {
      console.error("Error generating scoping questions:", err);
      setError("Unable to generate clarifying questions. Please try again or rephrase your project.");
      trackEvent('scoping_tool_error', { step: 'questions' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleGenerateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some(a => !a.trim())) {
      setError("Please answer all clarifying questions to proceed.");
      return;
    }

    setIsLoading(true);
    setStep('briefing');
    setError(null);
    trackEvent('scoping_tool_step2_submit');

    const ai = getAi();
    if (!ai) {
      setError("AI service is not configured.");
      setIsLoading(false);
      setStep('answers');
      return;
    }

    try {
      let combinedInfo = `Initial Idea: ${initialPrompt}\n\nQuestions & Answers:\n`;
      questions.forEach((q, i) => {
        combinedInfo += `Q: ${q}\nA: ${answers[i]}\n\n`;
      });

      const fullPrompt = `${PROJECT_SCOPING_BRIEF_PROMPT}\n${combinedInfo}`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              projectTitle: { type: Type.STRING },
              summary: { type: Type.STRING },
              suggestedSolutions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommendedItechServices: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommendedItechDivisions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              nextSteps: { type: Type.STRING },
            },
            required: [
              'projectTitle',
              'summary',
              'suggestedSolutions',
              'recommendedItechServices',
              'recommendedItechDivisions',
              'nextSteps',
            ],
          },
        },
      });

      const data: ProjectBrief = JSON.parse(response.text);
      setBrief(data);
      setStep('complete');
      trackEvent('scoping_tool_brief_generated', { projectTitle: data.projectTitle });
    } catch (err) {
      console.error("Error generating project brief:", err);
      setError("Unable to synthesize the project brief. Please try again.");
      setStep('answers');
      trackEvent('scoping_tool_error', { step: 'brief' });
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepInfo = useMemo(() => {
    switch (step) {
      case 'initial':
        return { number: 1, title: 'Project Vision' };
      case 'answers':
        return { number: 2, title: 'Clarifications' };
      case 'briefing':
      case 'complete':
        return { number: 3, title: 'Architectural Brief' };
      default:
        return { number: 1, title: 'Project Vision' };
    }
  }, [step]);

  const renderContent = () => {
    if (isLoading && step !== 'briefing') {
      return (
        <div className="text-center p-12">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <LoadingSpinnerIcon className="w-6 h-6 text-amber-400" />
          </div>
          <p className="text-slate-900 font-black uppercase text-sm tracking-wider">AI Strategist Analyzing Scope...</p>
          <p className="text-slate-500 text-xs mt-1 font-normal">Formulating targeted clarifying questions.</p>
        </div>
      );
    }
    
    switch (step) {
      case 'initial':
        return (
          <form onSubmit={handleAskQuestions} className="p-6 sm:p-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              STEP 01
            </span>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Describe What You Want to Engineer
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-normal">
              State your organizational goal, target audience, and desired technology capabilities. The more context you provide, the sharper the engineering brief.
            </p>
            
            <textarea
              id="initial-prompt"
              value={initialPrompt}
              onChange={(e) => setInitialPrompt(e.target.value)}
              placeholder="e.g. We want to deploy an autonomous real-time crop telemetry platform for 5,000 farmers in Nigeria with predictive weather alerts and local language USSD fallback..."
              className="w-full h-36 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder-slate-400 font-medium"
              required
            />
            {error && <p className="text-red-700 bg-red-50 border border-red-200 text-xs font-semibold p-3 rounded-xl mt-3">{error}</p>}
            
            <button 
              type="submit" 
              className="mt-6 w-full py-3.5 px-8 rounded-full text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-md" 
              disabled={isLoading}
            >
              Generate Clarifying Questions &rarr;
            </button>
          </form>
        );

      case 'answers':
        return (
          <form onSubmit={handleGenerateBrief} className="p-6 sm:p-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              STEP 02
            </span>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Clarifying Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal">
              To calibrate timelines, budgets, and architecture, please answer these targeted questions:
            </p>
            
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label htmlFor={`answer-${i}`} className="block font-bold text-xs uppercase tracking-wide text-slate-800 mb-2">
                    0{i + 1}. {q}
                  </label>
                  <input
                    type="text"
                    id={`answer-${i}`}
                    value={answers[i]}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                    placeholder="Your answer..."
                    required
                  />
                </div>
              ))}
            </div>
            {error && <p className="text-red-700 bg-red-50 border border-red-200 text-xs font-semibold p-3 rounded-xl mt-4">{error}</p>}
            
            <button 
              type="submit" 
              className="mt-6 w-full py-3.5 px-8 rounded-full text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-md" 
              disabled={isLoading}
            >
              Synthesize Architectural Brief &rarr;
            </button>
          </form>
        );

      case 'briefing':
        return (
          <div className="text-center p-12 sm:p-16">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <LoadingSpinnerIcon className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              GENERATING EXECUTIVE BRIEF
            </span>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Synthesizing Solution Architecture
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-sm mx-auto font-normal">
              Mapping your specifications to ITECH operating divisions and recommended service capabilities...
            </p>
          </div>
        );

      case 'complete':
        if (!brief) return null;
        return (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full inline-block mb-2">
                EXECUTIVE BRIEF COMPLETE
              </span>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{brief.projectTitle}</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed font-normal">{brief.summary}</p>
            </div>
            
            {/* Solutions */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">
                SUGGESTED TECHNICAL SOLUTIONS
              </span>
              <ul className="space-y-2">
                {brief.suggestedSolutions.map((s, i) => (
                  <li key={i} className="flex items-start text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircleIcon className="w-4 h-4 mr-2.5 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mapped Divisions & Services in Obsidian Card */}
            <div className="bg-[#181d27] text-white p-6 rounded-2xl border border-slate-800 shadow-md">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-2">
                    MAPPED ITECH DIVISIONS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {brief.recommendedItechDivisions.map(d => (
                      <span key={d} className="bg-slate-800 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    RECOMMENDED CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {brief.recommendedItechServices.map(s => (
                      <span key={s} className="bg-slate-800 text-slate-200 text-[11px] font-medium px-3 py-1 rounded-full border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                RECOMMENDED NEXT STEP
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed font-normal">
                {brief.nextSteps}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                onClick={handleClose}
                className="flex-1 py-3 px-6 rounded-full text-xs font-black uppercase tracking-widest text-center text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-md"
              >
                Schedule Formal Briefing &rarr;
              </Link>
              <button 
                onClick={resetState} 
                className="py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 hover:border-slate-900 transition-all text-center"
              >
                Scope Another Project
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="scoping-tool-title"
        >
          <motion.div 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: 25, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 25, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white text-slate-900 rounded-[32px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-200/90 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <h2 id="scoping-tool-title" className="font-black text-sm uppercase tracking-wider text-slate-900">
                  AI Project Scoping Tool
                  <span className="text-slate-400 font-bold ml-2 text-xs">
                    (Step {currentStepInfo.number}/3: {currentStepInfo.title})
                  </span>
                </h2>
              </div>
              <button 
                onClick={handleClose} 
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors" 
                aria-label="Close scoping tool"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto">
              {renderContent()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};