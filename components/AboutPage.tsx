import React from 'react';
import { 
  CORE_VALUES, 
  TARGET_MARKET, 
  COMPETITIVE_ADVANTAGE, 
  REVENUE_STREAMS, 
  LEADERSHIP 
} from '../constants';
import { 
  InnovationIcon, 
  ExcellenceIcon, 
  IntegrityIcon, 
  ImpactIcon, 
  CollaborationIcon,
  GlobalThinkingIcon,
  ContinuousLearningIcon,
  CheckCircleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BeakerIcon,
  AiBotIcon,
  Squares2X2Icon
} from './IconComponents';
import { FadeIn, StaggeredFadeIn, FadeInItem } from './FadeIn';
import { InteractiveCard } from './InteractiveCard';

const valueIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  Innovation: InnovationIcon,
  Excellence: ExcellenceIcon,
  Integrity: IntegrityIcon,
  Impact: ImpactIcon,
  Collaboration: CollaborationIcon,
  "Global Thinking": GlobalThinkingIcon,
  "Continuous Learning": ContinuousLearningIcon,
};

const advantageIcons = [
  Squares2X2Icon,
  AiBotIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ChartBarIcon,
  BeakerIcon,
];

export const AboutPage: React.FC = () => (
  <div className="pt-24">
    {/* Page Header */}
    <FadeIn>
      <section className="bg-slate-950/80 backdrop-blur-sm py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About ITECH Groups Nigeria</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
              Discover our mission, vision, and the core values that drive us to build Africa's digital future.
          </p>
      </section>
    </FadeIn>

    {/* Overview, Mission, Vision Section */}
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <StaggeredFadeIn className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center" stagger={0.15}>
        <FadeInItem>
            <InteractiveCard className="h-full">
              <div className="bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all duration-300 h-full border border-transparent hover:border-teal-500/50">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Overview</h2>
              <p className="text-slate-300 leading-relaxed">
                  A technology and innovation holding company building Africa’s next generation of intelligent solutions. We drive digital transformation by delivering AI-powered platforms, data analytics, and automation tools that enhance growth and efficiency.
              </p>
              </div>
            </InteractiveCard>
        </FadeInItem>
        <FadeInItem>
            <InteractiveCard className="h-full">
              <div className="bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all duration-300 h-full border border-transparent hover:border-teal-500/50">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed">
                  To create intelligent, scalable, and data-driven solutions that solve Africa’s most pressing challenges while meeting global standards in technology and innovation.
              </p>
              </div>
            </InteractiveCard>
        </FadeInItem>
        <FadeInItem>
            <InteractiveCard className="h-full">
              <div className="bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all duration-300 h-full border border-transparent hover:border-teal-500/50">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Our Vision</h2>
              <p className="text-slate-300 leading-relaxed">
                  To position ITECH Groups Nigeria as the leading global technology powerhouse from Africa, recognized for excellence, data leadership, and human-centered innovation.
              </p>
              </div>
            </InteractiveCard>
        </FadeInItem>
      </StaggeredFadeIn>
    </section>

    {/* The ITECH Advantage Section */}
    <FadeIn>
      <section id="advantage" className="py-20 bg-slate-900/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold">The ITECH Advantage</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
              We combine deep local insight with global technological standards to deliver solutions that are not just innovative, but impactful and sustainable.
            </p>
          </div>
          <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Value Prop */}
            <div>
              <h3 className="text-3xl font-bold text-teal-400 mb-6">Our Unique Value Proposition</h3>
              <p className="text-slate-300 text-lg mb-4 leading-relaxed">
                At ITECH, our strength lies in our holistic, multi-sector approach. We don't just build software; we engineer ecosystems. By integrating AI, data analytics, and cloud infrastructure across key African sectors, we create a synergistic effect where advancements in one area fuel growth in another.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                This cross-pollination of ideas and technologies, driven by our core values, allows us to build robust, scalable, and locally relevant solutions that address complex challenges at their root.
              </p>
            </div>
            
            {/* Right column - Competitive Advantages */}
            <StaggeredFadeIn className="space-y-6">
              {COMPETITIVE_ADVANTAGE.map((advantage, index) => {
                const Icon = advantageIcons[index];
                return (
                  <FadeInItem key={advantage}>
                    <div className="flex items-start p-4 bg-slate-800/50 rounded-lg transition-all hover:bg-slate-800 hover:shadow-lg">
                      <div className="flex-shrink-0">
                         <Icon className="w-8 h-8 text-teal-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg text-slate-300">{advantage}</p>
                      </div>
                    </div>
                  </FadeInItem>
                );
              })}
            </StaggeredFadeIn>
          </div>
        </div>
      </section>
    </FadeIn>

    {/* Core Values Section */}
    <section id="values" className="py-20 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
        </FadeIn>
        <StaggeredFadeIn className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 text-center" stagger={0.05}>
          {CORE_VALUES.map((value) => {
            const Icon = valueIcons[value];
            return (
              <FadeInItem key={value}>
                <div className="flex flex-col items-center group">
                  <div className="bg-slate-800 rounded-full p-4 mb-4 border-2 border-teal-500/50 transition-transform duration-300 transform group-hover:scale-110 group-hover:-rotate-12">
                    <Icon className="w-10 h-10 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{value}</h3>
                </div>
              </FadeInItem>
            );
          })}
        </StaggeredFadeIn>
      </div>
    </section>

    {/* Target Market, Advantage, Revenue Section */}
    <FadeIn>
      <section id="business" className="py-20 bg-slate-900/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Business Edge</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-teal-400 flex items-center"><UserGroupIcon className="w-7 h-7 mr-3"/>Target Market</h3>
              <ul className="space-y-3">
                {TARGET_MARKET.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0" />{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-teal-400 flex items-center"><AcademicCapIcon className="w-7 h-7 mr-3"/>Competitive Advantage</h3>
              <ul className="space-y-3">
                {COMPETITIVE_ADVANTAGE.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0" />{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-teal-400 flex items-center"><ChartBarIcon className="w-7 h-7 mr-3"/>Revenue Streams</h3>
              <ul className="space-y-3">
                {REVENUE_STREAMS.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 mr-2 mt-1 text-teal-500 flex-shrink-0" />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
    
    {/* Leadership Section */}
    <FadeIn>
      <section id="leadership" className="py-20 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Leadership</h2>
          <div className="bg-slate-800 inline-block p-8 rounded-xl shadow-lg max-w-2xl text-left transition-all duration-300 hover:shadow-teal-500/20 hover:scale-105">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <img 
                  src="https://i.ibb.co/NdqKCSsW/profile-picture-edited.png"
                  alt="Olabode Ilesanmi, Founder of ITECH Groups Nigeria" 
                  className="w-40 h-40 rounded-full border-4 border-teal-500 object-cover" 
              />
              <div>
                <h3 className="text-3xl font-bold text-teal-400">{LEADERSHIP.name}</h3>
                <p className="text-lg text-slate-300 font-medium mb-4">{LEADERSHIP.title}</p>
                <p className="text-slate-400 mb-4">{LEADERSHIP.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {LEADERSHIP.skills.map(skill => (
                    <span key={skill} className="bg-slate-700 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  </div>
);