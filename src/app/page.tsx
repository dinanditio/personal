'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 100) {
          current = section.getAttribute('id') || '';
        }
      });
      
      setActiveSection(current);
      
      if (window.scrollY > 100) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${isNavVisible ? 'bg-white/95 dark:bg-sky-950/95 shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 dark:from-sky-300 dark:to-sky-500 text-transparent bg-clip-text">Dito</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-2">
                <button onClick={() => scrollToSection('home')} className={`nav-link ${activeSection === 'home' ? 'bg-sky-100 dark:bg-sky-800' : ''}`}>Home</button>
                <button onClick={() => scrollToSection('about')} className={`nav-link ${activeSection === 'about' ? 'bg-sky-100 dark:bg-sky-800' : ''}`}>About</button>
                <button onClick={() => scrollToSection('education')} className={`nav-link ${activeSection === 'education' ? 'bg-sky-100 dark:bg-sky-800' : ''}`}>Education</button>
                <button onClick={() => scrollToSection('interests')} className={`nav-link ${activeSection === 'interests' ? 'bg-sky-100 dark:bg-sky-800' : ''}`}>Interests</button>
                <button onClick={() => scrollToSection('contact')} className={`nav-link ${activeSection === 'contact' ? 'bg-sky-100 dark:bg-sky-800' : ''}`}>Contact</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hi, I&apos;m <span className="bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">Putra Dinantio</span>
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-sky-700 dark:text-sky-300">Political Science Student</h2>
              <p className="mb-8 text-lg">
                Known to friends as <span className="font-semibold text-sky-500">Dito</span> — 
                exploring the world of politics with the same curiosity and determination 
                as a Pokémon trainer on their journey.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="btn btn-primary"
                >
                  Get in Touch
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="btn bg-transparent border border-sky-400 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-800 dark:to-sky-900 flex items-center justify-center overflow-hidden border-4 border-white dark:border-sky-700 shadow-lg">
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-sky-300 dark:bg-sky-600"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-sky-200 rounded-full border-4 border-sky-400 dark:border-sky-500 z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-b from-white to-sky-50 dark:from-sky-950 dark:to-sky-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">About Me</h2>
          <div className="card">
            <p className="mb-4">
              I&apos;m a passionate political science student with a deep interest in understanding how 
              governance systems shape our society and everyday lives. Just like my nickname &ldquo;Dito&ldquo; suggests,
              I bring a unique perspective to political analysis.
            </p>
            <p>
              My approach to political science combines rigorous academic analysis with creative thinking.
              I believe that understanding political systems requires both theoretical knowledge and
              practical insights into how policies affect communities.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-sky-50 dark:bg-sky-800/50 p-4 rounded-lg">
                <h3 className="font-medium text-sky-700 dark:text-sky-300 mb-2">Analytical</h3>
                <p className="text-sm">I analyze political systems with careful attention to detail and context.</p>
              </div>
              <div className="bg-sky-50 dark:bg-sky-800/50 p-4 rounded-lg">
                <h3 className="font-medium text-sky-700 dark:text-sky-300 mb-2">Curious</h3>
                <p className="text-sm">I approach political questions with the same curiosity as exploring a new region.</p>
              </div>
              <div className="bg-sky-50 dark:bg-sky-800/50 p-4 rounded-lg">
                <h3 className="font-medium text-sky-700 dark:text-sky-300 mb-2">Dedicated</h3>
                <p className="text-sm">I pursue knowledge and understanding with persistent dedication.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section id="education" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Education</h2>
          <div className="card">
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">Bachelor of Political Science</h3>
                <span className="text-sky-500 bg-sky-50 dark:bg-sky-900 px-3 py-1 rounded-full text-sm">Current</span>
              </div>
              <p className="text-sky-600 dark:text-sky-400 mb-1">University Name, 2020 - Present</p>
              <p className="text-sm">Focusing on comparative politics and political theory with a minor in international relations.</p>
            </div>
            <div className="border-t border-sky-100 dark:border-sky-800 pt-4">
              <h4 className="font-medium mb-2">Key Courses</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="pokemon-bullet">Comparative Political Systems</li>
                <li className="pokemon-bullet">International Relations Theory</li>
                <li className="pokemon-bullet">Public Policy Analysis</li>
                <li className="pokemon-bullet">Political Philosophy</li>
                <li className="pokemon-bullet">Constitutional Law</li>
                <li className="pokemon-bullet">Democracy and Governance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Research Interests */}
      <section id="interests" className="py-16 px-4 bg-gradient-to-t from-white to-sky-50 dark:from-sky-950 dark:to-sky-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Research Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-medium text-lg mb-3 text-sky-700 dark:text-sky-300">Comparative Politics</h3>
              <p>Examining different political systems and how they shape policy outcomes across various countries and regions.</p>
            </div>
            <div className="card">
              <h3 className="font-medium text-lg mb-3 text-sky-700 dark:text-sky-300">Political Institutions</h3>
              <p>Studying how formal and informal political institutions influence decision-making processes and power dynamics.</p>
            </div>
            <div className="card">
              <h3 className="font-medium text-lg mb-3 text-sky-700 dark:text-sky-300">Public Policy Analysis</h3>
              <p>Analyzing how policies are developed, implemented, and evaluated, with a focus on their societal impacts.</p>
            </div>
            <div className="card">
              <h3 className="font-medium text-lg mb-3 text-sky-700 dark:text-sky-300">Democratic Systems</h3>
              <p>Exploring the challenges and opportunities facing democratic governance in the modern world.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Contact</h2>
          <div className="card">
            <p className="mb-6">
              I&apos;m always open to discussing political science, research opportunities, 
              or just having a conversation about the latest developments in politics.
              Feel free to reach out through any of the channels below:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-sky-50 dark:bg-sky-800/40 rounded-lg transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-sky-700 dark:text-sky-300">Email</h3>
                  <p className="text-sm">contact@putradinantio.com</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-sky-50 dark:bg-sky-800/40 rounded-lg transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-sky-700 dark:text-sky-300">LinkedIn</h3>
                  <p className="text-sm">linkedin.com/in/putradinantio</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-sky-50 dark:bg-sky-800/40 rounded-lg transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-sky-700 dark:text-sky-300">Twitter</h3>
                  <p className="text-sm">@putradinantio</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-sky-50 dark:bg-sky-800/40 rounded-lg transition-transform hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-sky-700 dark:text-sky-300">Phone</h3>
                  <p className="text-sm">+1 (123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-sky-100 dark:bg-sky-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-4 flex justify-center space-x-1">
            {['P', 'U', 'T', 'R', 'A'].map((letter, i) => (
              <span key={i} className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 text-sm font-bold">{letter}</span>
            ))}
          </div>
          <p className="text-sky-700 dark:text-sky-300 text-sm">
            &copy; {new Date().getFullYear()} Putra Dinantio. All rights reserved.
          </p>
          <p className="text-sky-500 dark:text-sky-400 text-xs mt-1">
            Inspired by the journey of a Political Science student nicknamed Dito.
          </p>
        </div>
      </footer>
    </main>
  );
} 