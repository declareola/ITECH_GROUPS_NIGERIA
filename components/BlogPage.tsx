import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { updateMetadata } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { 
    LoadingSpinnerIcon, 
    XMarkIcon,
    LeafIcon, 
    AcademicCapIcon, 
    AiBotIcon, 
    ChartBarIcon, 
    HeartIcon, 
    BuildingOfficeIcon 
} from './IconComponents';
import { InteractiveCard } from './InteractiveCard';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  LeafIcon, AcademicCapIcon, AiBotIcon, ChartBarIcon, HeartIcon, BuildingOfficeIcon
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// A simple function to parse inline markdown for bold and italics
const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Regex to split by ***, **, or *
    const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('***') && part.endsWith('***')) {
            return <strong key={i}><em className="font-semibold">{part.slice(3, -3)}</em></strong>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return part;
    });
};


// Component for the modal to display the article
const ArticleModal = ({ content, onClose, title }: { content: string, onClose: () => void, title: string }) => {
  const formattedContent = content.split('\n')
    .map(line => line.trim())
    // FIX: Changed JSX.Element[] to React.ReactNode[] to resolve issue with JSX namespace not being found.
    .reduce<React.ReactNode[]>((acc, line, index) => {
      if (!line) return acc; // Skip empty lines

      // Headings
      if (line.startsWith('### ')) {
        acc.push(<h4 key={index} className="text-xl font-bold mt-6 mb-2 text-teal-300">{parseInlineMarkdown(line.replace('### ', ''))}</h4>);
        return acc;
      }
      if (line.startsWith('## ')) {
        acc.push(<h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-teal-300">{parseInlineMarkdown(line.replace('## ', ''))}</h3>);
        return acc;
      }
      if (line.startsWith('# ')) {
        acc.push(<h2 key={index} className="text-3xl font-bold mt-8 mb-4 text-teal-300">{parseInlineMarkdown(line.replace('# ', ''))}</h2>);
        return acc;
      }

      // Lists
      const isUnorderedListItem = line.startsWith('* ') || line.startsWith('- ');
      const isOrderedListItem = /^\d+\.\s/.test(line);

      if (isUnorderedListItem || isOrderedListItem) {
        const lastElement = acc.length > 0 ? acc[acc.length - 1] : null;
        const text = isUnorderedListItem ? line.substring(2) : line.replace(/^\d+\.\s/, '');
        const listItem = <li key={`li-${index}`}>{parseInlineMarkdown(text)}</li>;

        // Check if the last element was a list of the same type
        if (React.isValidElement(lastElement) && ((isUnorderedListItem && lastElement.type === 'ul') || (isOrderedListItem && lastElement.type === 'ol'))) {
          // Add to existing list
          const newChildren = [...lastElement.props.children, listItem];
          const newList = React.cloneElement(lastElement, { children: newChildren });
          acc[acc.length - 1] = newList;
        } else {
          // Start a new list
          if (isUnorderedListItem) {
            acc.push(<ul key={`ul-${index}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-slate-300">{[listItem]}</ul>);
          } else {
            acc.push(<ol key={`ol-${index}`} className="list-decimal list-inside space-y-2 my-4 pl-4 text-slate-300">{[listItem]}</ol>);
          }
        }
        return acc;
      }

      // Paragraphs
      acc.push(<p key={index} className="mb-4">{parseInlineMarkdown(line)}</p>);
      return acc;

    }, [] as React.ReactNode[]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="article-title">
      <div 
        className="bg-slate-800 text-slate-200 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button onClick={onClose} className="sticky top-4 right-4 float-right text-slate-400 hover:text-white z-10 bg-slate-800 rounded-full p-1" aria-label="Close article">
          <XMarkIcon className="w-8 h-8" />
        </button>
        <div className="p-8 md:p-12">
          <h2 id="article-title" className="text-4xl font-bold text-teal-400 mb-8">{title}</h2>
          <div className="text-slate-300 leading-relaxed text-lg">
             {formattedContent}
          </div>
        </div>
      </div>
    </div>
  );
};


export const BlogPage: React.FC = () => {
    const { postSlug } = useParams<{ postSlug: string }>();
    const navigate = useNavigate();
    const [loadingPost, setLoadingPost] = useState<string | null>(null);
    const [selectedPost, setSelectedPost] = useState<{title: string; content: string} | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const generateArticle = useCallback(async (post: { title: string, slug: string }) => {
        if (!post) return;
        setLoadingPost(post.title);
        setError(null);
        trackEvent('generate_article_start', { post_slug: post.slug, post_title: post.title });
        try {
            const prompt = `Write a 500-word blog post on the topic: "${post.title}". Structure it with a clear introduction, body, and conclusion. Use markdown for formatting, including headings (e.g., ## Heading), unordered lists (using *), and bold text (using **text**).`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: "You are an expert technology writer for a leading African tech company, ITECH Groups Nigeria. Your writing style is insightful, professional, and optimistic, focusing on the practical application and impact of technology in Africa. Avoid overly technical jargon."
                }
            });

            const text = response.text;
            setSelectedPost({ title: post.title, content: text });
            trackEvent('generate_article_success', { post_slug: post.slug, post_title: post.title });
        } catch (err) {
            console.error("Error generating article:", err);
            setError("Sorry, we couldn't generate the article at this time. Please try again later.");
            trackEvent('generate_article_failure', { post_slug: post.slug, post_title: post.title, error: (err as Error).message });
        } finally {
            setLoadingPost(null);
        }
    }, []);

    useEffect(() => {
        if (postSlug) {
            const postToLoad = BLOG_POSTS.find(p => p.slug === postSlug);
            if (postToLoad && (!selectedPost || selectedPost.title !== postToLoad.title)) {
                generateArticle(postToLoad);
            }
        } else {
             // If URL is cleared, close modal
            if (selectedPost) {
                setSelectedPost(null);
            }
        }
    }, [postSlug, generateArticle, selectedPost]);


    const handleGenerateClick = (post: { title: string, slug: string }) => {
        navigate(`/blog/${post.slug}`);
    };

    const closeModal = () => {
        navigate('/blog');
    };

    return (
        <section id="blog" className="py-20 bg-slate-900/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-32 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">ITECH Insights & Innovations</h1>
                    <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                       Explore our AI-generated articles on technology, innovation, and Africa's digital transformation. Click on any topic to generate a unique blog post.
                    </p>
                </div>

                {error && (
                    <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg max-w-2xl mx-auto">
                        <p>{error}</p>
                    </div>
                )}
                
                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => {
                        const Icon = iconMap[post.icon as keyof typeof iconMap];
                        return (
                            <InteractiveCard key={post.title}>
                                <div className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col h-full border border-transparent hover:border-teal-500/50 transition-colors duration-300">
                                    <div className="flex items-start mb-4">
                                        {Icon && <Icon className="w-10 h-10 text-teal-400 mr-4 flex-shrink-0" />}
                                        <h2 className="text-xl font-bold text-teal-400">{post.title}</h2>
                                    </div>
                                    <p className="text-slate-400 mb-6 flex-grow">{post.summary}</p>
                                    <button
                                        onClick={() => handleGenerateClick(post)}
                                        disabled={!!loadingPost}
                                        className="mt-auto w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                                    >
                                        {loadingPost === post.title ? (
                                            <>
                                                <LoadingSpinnerIcon className="w-6 h-6 mr-2" />
                                                Generating...
                                            </>
                                        ) : (
                                            'Generate & Read Article'
                                        )}
                                    </button>
                                </div>
                            </InteractiveCard>
                        );
                    })}
                </div>
            </div>

            {selectedPost && postSlug && (
                <ArticleModal 
                    title={selectedPost.title}
                    content={selectedPost.content} 
                    onClose={closeModal} 
                />
            )}
        </section>
    );
};