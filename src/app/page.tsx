'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Dummy data for projects
const projects = [
  {
    id: 1,
    title: 'Goal Scoring Analysis',
    description: 'Analysis of goal scoring patterns across major European leagues with predictive modeling.',
    technologies: ['Python', 'Data Analysis', 'Sports Analytics'],
    link: 'https://github.com/dinanditio/goal-analysis'
  },
  {
    id: 2,
    title: 'Training Performance Tracker',
    description: 'Mobile app to track training performance metrics for professional footballers.',
    technologies: ['React Native', 'Firebase', 'Fitness Tech'],
    link: 'https://github.com/dinanditio/performance-tracker'
  },
  {
    id: 3,
    title: 'Tactical Formation Visualizer',
    description: 'Interactive tool to visualize and analyze team formations and player movements.',
    technologies: ['JavaScript', 'D3.js', 'Soccer Tactics'],
    link: 'https://github.com/dinanditio/formation-viz'
  }
];

// Predefined responses for chatbot
const botResponses = {
  about: "I'm Dinantinho, a professional Brazilian footballer with 8 years of experience playing across South American and European leagues. Known for my technical skills, vision on the field, and ability to create scoring opportunities.",
  skills: "My key skills include:\n- Advanced ball control and dribbling\n- Strategic passing and playmaking\n- Free kick specialist\n- Field vision and game reading\n- Team leadership\n- Multilingual: Portuguese, English, Spanish",
  projects: "I've worked on several projects including a Goal Scoring Analysis tool, a Training Performance Tracker, and a Tactical Formation Visualizer. You can ask me about any of these specific projects!",
  education: "I've completed a Sports Science degree from the University of São Paulo, with specialization in Athletic Performance. I also hold UEFA B coaching license and various certifications in sports nutrition and injury prevention.",
  contact: "You can reach me at contact@dinantinho.com or through my agent at agent@sportsstars.com. I'm also active on Twitter (@dinantinho) and Instagram (@dinantinho_official)."
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi there! I\'m Dinantinho\'s virtual assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for system preference on initial load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat when messages change
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      let response = "I'm not sure how to respond to that. Try asking about my skills, projects, education, or how to contact me.";
      
      // Check for keywords in the user message
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('tell me about yourself')) {
        response = botResponses.about;
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('what can you do')) {
        response = botResponses.skills;
      } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
        response = botResponses.projects;
      } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
        response = botResponses.education;
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
        response = botResponses.contact;
      } else if (lowerMessage.includes('goal scoring') || lowerMessage.includes('analysis')) {
        response = "The Goal Scoring Analysis is a data science project where I analyzed scoring patterns across the top 5 European leagues to identify optimal shooting positions and situations.";
      } else if (lowerMessage.includes('tracker') || lowerMessage.includes('performance')) {
        response = "My Training Performance Tracker app helps players monitor their fitness levels, recovery rates, and training load to optimize performance and prevent injuries.";
      } else if (lowerMessage.includes('formation') || lowerMessage.includes('tactical') || lowerMessage.includes('visualizer')) {
        response = "The Tactical Formation Visualizer is an interactive tool that helps coaches and analysts visualize team formations, player movements, and tactical patterns during matches.";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = "Hello! I'm Dinantinho's virtual assistant. How can I help you today?";
      }

      setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickResponse = (topic: keyof typeof botResponses) => {
    setChatMessages(prev => [
      ...prev, 
      { type: 'user', text: `Tell me about your ${topic}` },
      { type: 'bot', text: botResponses[topic] }
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`mobile-sidebar md:sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Profile Section */}
        <div className="profile-section">
          <div className="w-24 h-24 mb-2 relative mx-auto">
            <Image 
              src="/images/profile.jpg" 
              alt="Dinantinho" 
              fill
              className="rounded-full object-cover border-2 border-primary"
              priority
            />
          </div>
          <h1 className="text-lg font-bold text-center">Dinantinho</h1>
          <p className="text-sm text-muted-foreground text-center">Brazilian Footballer</p>
          
          {/* Dark Mode Toggle */}
          <div className="mt-4 flex items-center justify-center">
            <span className="mr-2 text-sm">
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                className="toggle-switch-input" 
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <span className="toggle-switch-label">
                <span className="toggle-switch-dot"></span>
              </span>
            </label>
          </div>
        </div>
        
        {/* Resume & Github Section */}
        <div className="mt-6 space-y-2">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              alert('Resume download functionality would be implemented here');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
          <a 
            href="https://github.com/dinanditio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
        
        {/* Latest Projects Section - Mobile Only */}
        <div className="mt-6 md:hidden">
          <h2 className="text-lg font-semibold mb-2 text-center">Latest Projects</h2>
          <div className="space-y-2">
            {projects.map(project => (
              <a 
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
              >
                {project.title}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content - Centered */}
      <main className="main-content flex-1 flex flex-col items-center justify-start pt-10">
        <div className="max-w-4xl w-full mx-auto px-4">
          {/* Chatbot Section */}
          <div className="mb-16 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-center">Hi, I'm Dinantinho. Ask me anything!</h1>
            
            <div className="chatbox w-full max-w-xl mx-auto">
              <div className="overflow-y-auto max-h-80 mb-4">
                {chatMessages.map((message, i) => (
                  <div 
                    key={i} 
                    className={`chat-message ${message.type === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}
                  >
                    {message.text.split('\n').map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-message chat-message-bot">
                    <p className="flex">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-150">.</span>
                      <span className="animate-bounce delay-300">.</span>
                    </p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              <form onSubmit={handleChatSubmit}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me something..."
                    className="chat-input"
                    disabled={isTyping}
                  />
                  <button 
                    type="submit"
                    className="button button-primary"
                    disabled={isTyping}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
              
              {/* Quick Response Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <button 
                  onClick={() => handleQuickResponse('about')}
                  className="button-outline px-3 py-1 text-sm rounded-full"
                >
                  About Me
                </button>
                <button 
                  onClick={() => handleQuickResponse('skills')}
                  className="button-outline px-3 py-1 text-sm rounded-full"
                >
                  Skills
                </button>
                <button 
                  onClick={() => handleQuickResponse('projects')}
                  className="button-outline px-3 py-1 text-sm rounded-full"
                >
                  Projects
                </button>
                <button 
                  onClick={() => handleQuickResponse('education')}
                  className="button-outline px-3 py-1 text-sm rounded-full"
                >
                  Education
                </button>
                <button 
                  onClick={() => handleQuickResponse('contact')}
                  className="button-outline px-3 py-1 text-sm rounded-full"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Projects Section - Desktop Only */}
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold mb-8 text-center">Latest Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Project
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 