export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-light-accent/20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-light-accent/10 blur-3xl -z-10"></div>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-sm bg-background/80 z-10 border-b border-light-accent/20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <div className="w-full h-full rounded-full border-2 border-accent"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-background"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"></div>
            </div>
            <span className="font-medium">Dito</span>
          </div>
          <ul className="flex gap-6 text-sm">
            <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
            <li><a href="#education" className="hover:text-accent transition-colors">Education</a></li>
            <li><a href="#research" className="hover:text-accent transition-colors">Research</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>
      
      <main className="min-h-screen flex flex-col px-4 py-16 pt-24 md:px-8 md:py-24 md:pt-32 max-w-3xl mx-auto relative">
        <header className="mb-12 flex items-center gap-4">
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Putra Dinantio</h1>
            <p className="text-accent flex items-center gap-2">
              Political Science Student
              <span className="inline-block w-5 h-5 rounded-full border border-accent animate-pulse"></span>
            </p>
            <div className="absolute -right-12 -top-8 opacity-10 rotate-12">
              <div className="w-20 h-20 relative">
                <div className="w-full h-full rounded-full border-4 border-accent"></div>
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-background"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent border-4 border-background"></div>
              </div>
            </div>
          </div>
        </header>

        <section id="about" className="mb-12 group">
          <h2 className="text-xl font-semibold mb-4 border-b border-light-accent pb-2 flex items-center">
            <span className="relative">About Me
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </h2>
          <div className="pl-0 transition-all duration-300 group-hover:pl-2 border-l-0 group-hover:border-l-2 border-light-accent/50">
            <p className="mb-4">
              I am a passionate political science student interested in exploring the dynamics of power, 
              governance, and social systems. My research focuses on understanding how political 
              institutions shape society and influence policy outcomes.
            </p>
            <p className="relative">
              Through critical analysis and interdisciplinary approaches, I aim to contribute to our 
              understanding of contemporary political challenges.
              <span className="absolute -right-8 bottom-0 text-xs opacity-30">✨ Dito</span>
            </p>
          </div>
        </section>

        <section id="education" className="mb-12 group">
          <h2 className="text-xl font-semibold mb-4 border-b border-light-accent pb-2 flex items-center">
            <span className="relative">Education
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </h2>
          <div className="pl-0 transition-all duration-300 group-hover:pl-2 border-l-0 group-hover:border-l-2 border-light-accent/50">
            <div className="mb-4">
              <h3 className="font-medium">Bachelor of Political Science</h3>
              <p className="text-accent text-sm">University Name, 2020 - Present</p>
              <p className="mt-1">Focusing on comparative politics and political theory.</p>
            </div>
          </div>
        </section>

        <section id="research" className="mb-12 group">
          <h2 className="text-xl font-semibold mb-4 border-b border-light-accent pb-2 flex items-center">
            <span className="relative">Research Interests
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </h2>
          <div className="pl-0 transition-all duration-300 group-hover:pl-2 border-l-0 group-hover:border-l-2 border-light-accent/50">
            <ul className="space-y-2">
              {["Comparative politics", "Political institutions", "Public policy analysis", "Democratic systems", "Political economy"].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 relative flex-shrink-0">
                    <span className="absolute inset-0 rounded-full border border-accent"></span>
                    <span className="absolute inset-[3px] rounded-full bg-accent/30"></span>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="group">
          <h2 className="text-xl font-semibold mb-4 border-b border-light-accent pb-2 flex items-center">
            <span className="relative">Contact
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </h2>
          <div className="pl-0 transition-all duration-300 group-hover:pl-2 border-l-0 group-hover:border-l-2 border-light-accent/50">
            <div className="flex flex-col gap-2">
              {[
                { label: "Email", value: "contact@putradinantio.com" },
                { label: "LinkedIn", value: "linkedin.com/in/putradinantio" },
                { label: "Twitter", value: "@putradinantio" }
              ].map((item, index) => (
                <p key={index} className="transition-all duration-300 hover:translate-x-1">
                  <span className="font-medium text-accent">{item.label}:</span> {item.value}
                </p>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 pt-6 border-t border-light-accent text-sm text-accent text-center relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-background px-4">
            <div className="w-6 h-6 relative mx-auto">
              <div className="w-full h-full rounded-full border-2 border-accent"></div>
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-background"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"></div>
            </div>
          </div>
          © {new Date().getFullYear()} Putra &ldquo;Dito&rdquo; Dinantio. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
