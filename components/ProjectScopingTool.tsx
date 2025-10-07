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

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

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
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        setQuestions(jsonResponse.questions || []);
        setAnswers(new Array(jsonResponse.questions?.length || 0).fill(''));
        setStep('answers');
    } catch (err) {
      console.error("Error generating questions:", err);
      setError("I'm having trouble analyzing your request. Could you please try rephrasing it?");
      trackEvent('scoping_tool_error', { step: 'questions', error: (err as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some(a => !a.trim())) return;

    setIsLoading(true);
    setError(null);
    setStep('briefing');
    trackEvent('scoping_tool_step2_submit');

    try {
        const combinedInfo = `
            Initial User Idea: "${initialPrompt}"
            ---
            ${questions.map((q, i) => `Question: ${q}\nAnswer: ${answers[i]}`).join('\n---\n')}
        `;
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
                        suggestedSolutions: { type: Type.ARRAY, items: { type: Type.STRING } },
                        recommendedItechServices: { type: Type.ARRAY, items: { type: Type.STRING } },
                        recommendedItechDivisions: { type: Type.ARRAY, items: { type: Type.STRING } },
                        nextSteps: { type: Type.STRING }
                    }
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        setBrief(jsonResponse);
        setStep('complete');
        trackEvent('scoping_tool_brief_generated');
    } catch (err) {
      console.error("Error generating brief:", err);
      setError("I'm sorry, I couldn't generate the project brief. Please try again.");
      setStep('answers'); // Go back to the answers step
      trackEvent('scoping_tool_error', { step: 'briefing', error: (err as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
  
  const currentStepInfo = useMemo(() => {
    switch (step) {
      case 'initial':
        return { number: 1, title: 'Describe Your Vision' };
      case 'answers':
        return { number: 2, title: 'A Few More Details' };
      case 'briefing':
      case 'complete':
        return { number: 3, title: 'Your Project Brief' };
      default:
        return { number: 1, title: '' };
    }
  }, [step]);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  
  const modalVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { y: 30, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const renderContent = () => {
    if (isLoading && step !== 'briefing') {
      return (
        <div className="text-center p-8">
            <LoadingSpinnerIcon className="w-12 h-12 text-teal-400 mx-auto" />
            <p className="mt-4 text-slate-300">AI is analyzing your request...</p>
        </div>
      );
    }
    
    switch (step) {
      case 'initial':
        return (
          <form onSubmit={handleAskQuestions} className="p-8">
            <p className="mb-4 text-slate-300">Start by telling us what you want to build, improve, or solve. The more detail, the better!</p>
            <label htmlFor="initial-prompt" className="sr-only">Your project idea</label>
            <textarea
              id="initial-prompt"
              value={initialPrompt}
              onChange={(e) => setInitialPrompt(e.target.value)}
              placeholder="e.g., I want to build an e-commerce website for my fashion brand..."
              className="w-full h-40 bg-slate-900 border border-slate-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
             {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <button type="submit" className="mt-6 w-full btn-primary" disabled={isLoading}>
              Next Step
            </button>
          </form>
        );
      case 'answers':
        return (
          <form onSubmit={handleGenerateBrief} className="p-8">
            <p className="mb-6 text-slate-300">Great! To help me create an accurate brief, please answer these questions:</p>
            <div className="space-y-6">
              {questions.map((q, i) => (
                <div key={i}>
                  <label htmlFor={`answer-${i}`} className="block font-medium text-slate-200 mb-2">{q}</label>
                  <input
                    type="text"
                    id={`answer-${i}`}
                    value={answers[i]}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              ))}
            </div>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            <button type="submit" className="mt-8 w-full btn-primary" disabled={isLoading}>
              Generate Project Brief
            </button>
          </form>
        );
      case 'briefing':
        return (
          <div className="text-center p-12">
            <LoadingSpinnerIcon className="w-12 h-12 text-teal-400 mx-auto" />
            <p className="mt-6 text-xl text-slate-300">Generating your personalized project brief...</p>
            <p className="text-slate-400 mt-2">This may take a moment.</p>
          </div>
        );
      case 'complete':
        if (!brief) return null;
        return (
          <div className="p-8">
            <h3 className="text-2xl font-bold text-teal-300 mb-2">{brief.projectTitle}</h3>
            <p className="text-slate-300 mb-6">{brief.summary}</p>
            
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-teal-400 mb-3 text-lg">Suggested Solutions</h4>
                    <ul className="space-y-2">
                        {brief.suggestedSolutions.map((s, i) => <li key={i} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-teal-500 flex-shrink-0" />{s}</li>)}
                    </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-teal-400 mb-3 text-lg">Recommended Services</h4>
                        <div className="flex flex-wrap gap-2">
                            {brief.recommendedItechServices.map(s => <span key={s} className="bg-slate-700 text-teal-300 text-sm font-semibold px-3 py-1 rounded-full">{s}</span>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold text-teal-400 mb-3 text-lg">Recommended Divisions</h4>
                        <div className="flex flex-wrap gap-2">
                            {brief.recommendedItechDivisions.map(d => <span key={d} className="bg-slate-700 text-teal-300 text-sm font-semibold px-3 py-1 rounded-full">{d}</span>)}
                        </div>
                    </div>
                </div>
                 <div>
                    <h4 className="font-bold text-teal-400 mb-3 text-lg">Next Steps</h4>
                    <p className="text-slate-300 bg-slate-900/50 p-4 rounded-md border border-slate-700">{brief.nextSteps}</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                 <button onClick={handleClose} className="btn-primary">
                    Contact Us to Proceed
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="scoping-tool-title"
        >
          <motion.div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
              <div className="flex items-center">
                  {step === 'complete' ? <ClipboardDocumentListIcon className="w-7 h-7 text-teal-400 mr-3"/> : <SparklesIcon className="w-7 h-7 text-teal-400 mr-3"/>}
                  <h2 id="scoping-tool-title" className="font-bold text-lg text-white">
                    AI Project Scoping Tool
                    <span className="text-slate-400 font-normal text-sm ml-2"> (Step {currentStepInfo.number}/3: {currentStepInfo.title})</span>
                  </h2>
              </div>
              <button onClick={handleClose} className="text-slate-400 hover:text-white" aria-label="Close scoping tool">
                <XMarkIcon className="w-6 h-6" />
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
