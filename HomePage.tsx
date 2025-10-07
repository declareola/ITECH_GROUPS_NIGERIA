import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GROWTH_STRATEGY,
  STRATEGIC_GOALS,
  GLOBAL_VISIBILITY_PLAN,
  BLOG_POSTS
} from './constants';
import { 
  CheckCircleIcon,
  GlobeAltIcon,
  MegaphoneIcon
} from './components/IconComponents';
import { FadeIn } from './components/FadeIn';
import { HeroBackground } from './components/HeroBackground';
import { InteractiveCard } from './components/InteractiveCard';


const TimelineItem: React.FC<{ item: {phase: string, description: string}; index: number }> = ({ item, index }) => {
  const isLeft = index % 2 !== 0;
  return (
    <div className={`flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
      <div className="w-5/12"> {/* Content Side */}
        <motion.div
          className="bg-slate-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-teal-400 font-bold mb-2">{item.phase}</p>
          <p className="text-slate-300">{item.description}</p>
        </motion.div>
      </div>
      <div className="w-2/12 flex justify-center"> {/* Center with Dot */}
        <motion.div
          className="w-8 h-8 rounded-full bg-slate-900 border-4 border-teal-500 flex items-center justify-center text-slate-100 font-bold z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          {index + 1}
        </motion.div>
      </div>
      <div className="w-5/12"></div> {/* Spacer Side */}
    </div>
  );
};

const AnimatedTimeline: React.FC = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="max-w-4xl mx-auto mb-20">
        <h3 className="text-3xl font-bold text-center mb-16 text-teal-400">Growth and Expansion Plan</h3>
        <div ref={ref} className="relative">
            {/* Desktop Line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-slate-700 hidden md:block" aria-hidden="true"></div>
            <motion.div style={{ height: lineHeight }} className="absolute left-1/2 -translate-x-1/2 w-1 bg-teal-400 hidden md:block" />

            {/* Desktop View */}
            <div className="space-y-12 hidden md:block">
                {GROWTH_STRATEGY.map((item, index) => (
                    <TimelineItem key={item.phase} item={item} index={index} />
                ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden relative">
                 <div className="absolute left-4 top-4 h-full w-1 bg-slate-700" aria-hidden="true"></div>
                 <div className="space-y-8">
                  {GROWTH_STRATEGY.map((item, index) => (
                      <motion.div key={item.phase} className="pl-12 relative"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                      >
                          <div className="absolute -left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-teal-500 flex items-center justify-center text-slate-100 font-bold z-10">{index + 1}</div>
                          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                              <p className="text-teal-400 font-bold mb-2">{item.phase}</p>
                              <p className="text-slate-300">{item.description}</p>
                          </div>
                      </motion.div>
                  ))}
                 </div>
            </div>
        </div>
    </div>
  );
}

export const HomePage: React.FC = () => (
  <>
    {/* Hero Section */}
    <section 
      id="home" 
      className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden"
    >
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
      <div className="relative z-10 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight"
        >
          ITECH Groups Nigeria
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-xl md:text-2xl font-light mb-6"
        >
          Building Digital Solutions for Africa’s Future
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-lg md:text-xl text-teal-300 font-semibold"
        >
          Empowering Africa through Intelligent Technology
        </motion.p>
      </div>
    </section>

    {/* Blog Preview Section */}
    <FadeIn>
      <section id="blog-preview" className="py-20 bg-slate-950/50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
              <div className="text-center">
                  <h2 className="text-4xl font-bold tracking-tight">ITECH Insights & Innovations</h2>
                  <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                      Explore our thoughts on technology, innovation, and Africa's digital transformation.
                  </p>
              </div>
              <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {BLOG_POSTS.slice(0, 3).map((post) => (
                    <InteractiveCard key={post.title}>
                      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-lg p-6 flex flex-col h-full hover:border-teal-500/50 transition-colors">
                          <h3 className="text-xl font-bold text-teal-400 mb-3 h-20">{post.title}</h3>
                          <p className="text-slate-400 mb-4 flex-grow">{post.summary}</p>
                          <Link
                              to={`/blog/${post.slug}`}
                              className="mt-auto font-medium text-teal-300 hover:text-teal-200 self-start"
                          >
                              Read More &rarr;
                          </Link>
                      </div>
                    </InteractiveCard>
                  ))}
              </div>
              <div className="text-center mt-12">
                   <Link
                      to="/blog"
                      className="btn-primary"
                  >
                      Visit Our Blog
                  </Link>
              </div>
          </div>
      </section>
    </FadeIn>

    {/* Global Strategy Section */}
    <FadeIn>
      <section id="strategy" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">Our Global Strategy & Vision</h2>

              <AnimatedTimeline />

              {/* Strategic Goals & Visibility Plan */}
              <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-800">
                  <FadeIn>
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-teal-400 flex items-center"><GlobeAltIcon className="w-7 h-7 mr-3"/>Strategic Goals</h3>
                        <ul className="space-y-3">
                            {STRATEGIC_GOALS.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0" />{item}</li>)}
                        </ul>
                    </div>
                  </FadeIn>
                  <FadeIn>
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-teal-400 flex items-center"><MegaphoneIcon className="w-7 h-7 mr-3"/>Global Visibility Plan</h3>
                        <ul className="space-y-3">
                            {GLOBAL_VISIBILITY_PLAN.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0" />{item}</li>)}
                        </ul>
                    </div>
                  </FadeIn>
              </div>
          </div>
      </section>
    </FadeIn>
  </>
);