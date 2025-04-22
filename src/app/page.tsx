'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Message type definition
interface ChatMessage {
  type: string;
  text: string;
  isTyping: boolean;
}

// TypewriterEffect component
const TypewriterEffect = ({ text, speed = 40, onComplete = () => {} }: { 
  text: string; 
  speed?: number; 
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return <span>{displayText}</span>;
};

// Dummy data for projects
const projects = [
  {
    id: 1,
    title: 'Visualization and Analysis of Air Pollution in DKI Jakarta (2021)',
    description: 'Comprehensive analysis of air pollution index visualization for Jakarta\'s environmental policy.',
    technologies: ['Data Analysis', 'Visualization', 'Environmental Policy'],
    link: 'https://medium.com/@dinantio/analisa-indeks-standar-pencemar-udara-di-provinsi-dki-jakarta-tahun-2021-c3e4dba96e70'
  },
  {
    id: 2,
    title: 'Machine Learning Approaches to Titanic Survival Prediction',
    description: 'Applying machine learning algorithms to predict Titanic passenger survival based on factors like age, gender, and class using the Kaggle dataset.',
    technologies: ['Machine Learning', 'Python', 'Data Analysis'],
    link: 'https://medium.com/@dinantio/machine-learning-approaches-to-titanic-survival-prediction-fc58adb23ca5'
  },
  {
    id: 3,
    title: 'Customer Churn Prediction with Logistic Regression',
    description: 'Using Logistic Regression to predict customer churn based on data from the Iranian telecommunications industry.',
    technologies: ['Machine Learning', 'Python', 'Data Analysis'],
    link: 'https://medium.com/@dinantio/churn-prediction-in-the-telecommunication-industry-logistic-regression-for-retention-strategies-f94baf0c7aaf'
  },
  {
    id: 4,
    title: 'Jual Cepat Mobil Bekas! Relational Database',
    description: 'Creating a relational database for a used car marketplace with search and filtering capabilities based on various attributes.',
    technologies: ['Database Design', 'SQL', 'ERD'],
    link: 'https://medium.com/@dinantio/jual-cepat-mobil-bekas-relational-database-5722194763cf'
  },
  {
    id: 5,
    title: 'Relational Database and ERD for an E-Library',
    description: 'Designing a relational database model for an e-library with an entity relationship diagram (ERD).',
    technologies: ['Database Design', 'SQL', 'ERD'],
    link: 'https://medium.com/@dinantio/creating-a-relational-database-and-constructing-an-entity-relationship-diagram-for-e-libraries-9a6bb1375c40'
  },
  {
    id: 6,
    title: 'Policy Brief - Environmental Awareness Among Jakarta Youth',
    description: 'Analysis of how social media can strengthen environmental awareness among Jakarta youth.',
    technologies: ['Policy Analysis', 'Research', 'Social Media'],
    link: 'https://drive.google.com/file/d/1qg-EXhTKeBTY0Qso2nd5Qd-NeeiylBCs/view?usp=sharing'
  },
  {
    id: 7,
    title: 'Charting the Calamities: Tableau Visualization and Analysis of Disasters in DKI Jakarta',
    description: 'Visualization and analysis of disaster response dynamics in DKI Jakarta using Tableau to identify patterns and insights.',
    technologies: ['Data Visualization', 'Tableau', 'Disaster Management'],
    link: 'https://medium.com/@dinantio/charting-the-calamities-tableau-visualization-and-analysis-of-disasters-and-response-dynamics-in-a5752a2382c4'
  }
];

// Predefined responses for chatbot
const botResponses = {
  about: "Hi, I'm Putra Dinantio Nugroho, a Data Science enthusiast with a background in Political Science from the University of Indonesia. I am passionate about leveraging data-driven insights to influence decision-making across sectors such as governance, technology, and business. With experience in data visualization, Python programming, and machine learning, I am constantly looking for opportunities to apply my analytical skills to real-world problems.",
  skills: "Technical Skills:\n\n• Programming: Python, SQL, Django\n\n• Data Visualization: Tableau, Excel\n\n• Web Development: HTML, CSS\n\n• Tools: PowerPoint, Excel, Tableau\n\n\nSoft Skills:\n\n• Analytical Thinking: Strong research and data analysis skills\n\n• Communication: Experience in presenting technical findings to non-technical audiences\n\n• Teamwork: Effective collaboration in a team environment, particularly in cross-functional projects",
  projects: "I've worked on several projects, including:\n• Visualization of Air Pollution in Jakarta\n• E-Library Database Design\n• Customer Churn Prediction\n• Policy Brief on Environmental Awareness\n\nAnd more! (For additional projects, visit the Projects section)\n\nNote: If you're using an Android/iPhone, click the 3 horizontal lines next to the Dark Mode button.\n\nFeel free to contact me if you would like to discuss any of these projects in more detail!",
  education: "Education:\n\n• Bachelor of Political Science – Universitas Indonesia (2021–2025)\n\nGPA: 3.52/4.00, Focus on governance and policy analysis\n\n\n• Leiden-Delft-Erasmus University (2024)\n\nJoint Minor Program – Future Challenges Lab\n\n\n• Pacmann, Data Science (2023–2025)\n\nCompleted courses on Python, Machine Learning, and Data Visualization\n\n\nCertifications:\n\n• Responsive Web Design – freeCodeCamp\n\n• Intro to Statistics – Stanford Online\n\n• English (Upper Intermediate) – Duolingo",
  contact: "You can reach me through:\n• Email: pdinantio18@gmail.com\n• LinkedIn: https://www.linkedin.com/in/putra-dinantio-n-5651961b4/\n• Github: https://github.com/dinanditio\n• Phone: +6281528998827",
  
  // Tech knowledge responses
  ai_vs_ml: "AI (Artificial Intelligence) is the broader concept of machines being able to carry out tasks in a way that we would consider 'smart'. Machine Learning is a specific subset of AI that trains a machine how to learn using data without explicit programming for each scenario. Think of AI as the goal of creating intelligent machines and ML as one approach to achieve that goal.",
  
  blockchain: "Blockchain is like a digital ledger that's shared across many computers. Each 'block' contains a list of transactions, and once added to the 'chain', it's very difficult to change. It's secure because no single person controls it – everyone in the network has a copy. This technology powers cryptocurrencies like Bitcoin, but can also be used for smart contracts, supply chain tracking, and more!",
  
  tech_trends: "Some of the latest tech trends include:\n\n• Generative AI and Large Language Models\n• Edge Computing\n• Quantum Computing advancements\n• Web3 and Decentralized Applications\n• Extended Reality (XR) combining VR and AR\n• Sustainable Technology Solutions\n• Zero Trust Security Architectures\n\nThese technologies are reshaping industries and how we interact with digital systems.",
  
  // Additional tech knowledge responses
  cloud_computing: "Cloud computing delivers computing services over the internet rather than using local servers. It provides scalable resources like storage, databases, software, and analytics. Major benefits include cost efficiency, flexibility, and accessibility from anywhere with internet access. Popular providers include AWS, Microsoft Azure, and Google Cloud.",
  
  cybersecurity: "Cybersecurity is protecting systems, networks, and programs from digital attacks. These attacks typically aim to access sensitive information, extort money, or disrupt business processes. Effective cybersecurity requires coordinated efforts across information systems, including network security, application security, and end-user education.",
  
  data_science: "Data science combines statistics, mathematics, programming, and domain expertise to extract insights from data. It involves collecting, cleaning, and analyzing data to find patterns and make predictions. Key tools include Python, R, SQL, and visualization libraries. This field helps organizations make data-driven decisions across various industries.",
  
  // Science knowledge
  universe_age: "The universe is approximately 13.8 billion years old, according to current scientific estimates. This age is determined through multiple methods including cosmic microwave background radiation measurements, the rate of universe expansion, and the ages of the oldest known stars. The Big Bang theory remains the most widely accepted explanation for how the universe began.",
  
  ocean_depth: "The deepest known point on Earth is the Challenger Deep in the Mariana Trench, reaching approximately 10,935 meters (35,876 feet) below sea level. That's deeper than Mount Everest is tall! The extreme pressure at this depth is over 1,000 times the standard atmospheric pressure at sea level, making exploration extremely difficult.",
  
  human_genome: "The human genome contains approximately 3 billion base pairs of DNA and around 20,000-25,000 protein-coding genes. The Human Genome Project, completed in 2003, was a landmark scientific achievement that mapped our complete genetic blueprint. This ongoing research helps scientists understand genetic diseases, human evolution, and potential personalized medical treatments.",
  
  // Fun queries responses
  spirit_animal: "If I had a spirit animal, it would probably be an octopus! They're incredibly intelligent problem solvers with multiple ways to approach challenges. Plus, they can multitask with eight arms - perfect for handling multiple data streams and projects at once!",
  
  coffee_or_tea: "I'm definitely a coffee person! ☕ Nothing beats a good cup of coffee when diving into a complex dataset or coding session. Though I appreciate a nice cup of tea when I need to relax and think through a problem more methodically.",
  
  fun_fact: "Fun fact about me: I once analyzed a dataset on Jakarta's pollution levels and found that air quality significantly improved during COVID-19 lockdowns, providing valuable insights for potential environmental policies. Data can tell fascinating stories about our world!",
  
  favorite_song: "🎵 I can't sing, but I can share lyrics from one of my favorites:\n\n\"Somewhere over the rainbow, way up high\nThere's a land that I heard of once in a lullaby.\nSomewhere over the rainbow, skies are blue\nAnd the dreams that you dare to dream really do come true.\" 🎵",
  
  favorite_meme: "My favorite meme has to be the 'This is fine' dog sitting in a burning room. It perfectly captures how data scientists feel when dealing with messy datasets or debugging code that worked perfectly yesterday! 🔥🐶☕",
  
  // Navigation guidance
  help_with: "I can help you with:\n• Learning about my background and skills\n• Exploring my data science and policy projects\n• Understanding my educational journey\n• Getting my contact information\n• Answering general knowledge questions about tech\n• Having some fun interactions\n\nJust ask me anything you'd like to know!",
  
  navigate_site: "This site has two main sections:\n\n1. Chat (where we are now) - You can ask me anything directly\n2. Projects - Browse through my portfolio of work\n\nUse the navigation tabs at the top to switch between sections, or use the quick response buttons below for common topics!",
  
  recommend_section: "I'd recommend checking out my Projects section to see real examples of my data analysis and policy work. If you're interested in a specific area like data visualization or database design, feel free to ask me about those specific projects!",
  
  // Easter eggs
  video_games: "I do enjoy video games when I'm not analyzing data! My favorite is Civilization VI - it's all about strategy, resource management, and long-term planning, which aligns perfectly with my analytical mindset. Plus, you can win through scientific or cultural victories, not just conquest!",
  
  beam_me_up: "🖖 Energizing... Transport complete! Welcome aboard the USS Data Science, where we boldly analyze what no one has analyzed before! 🚀",
  
  meaning_of_life: "According to my calculations, the meaning of life is to find meaning in the data points of your own journey. Though if you want the computational answer, it's 42. Just make sure you're asking the right question! 📊",
  
  // Advanced tech knowledge
  quantum_computing: "Imagine normal computers use bits (0s and 1s). Quantum computers use 'qubits' that can be 0, 1, or both at the same time! This lets them solve certain problems much faster. Think of it like checking every path in a maze simultaneously instead of one at a time. It's still early days, but quantum computing could revolutionize fields like cryptography, material science, and complex simulations.",
  
  http_vs_https: "HTTP and HTTPS are protocols for transmitting web pages. The big difference is security:\n\n• HTTP (Hypertext Transfer Protocol) sends data in plain text that can be intercepted\n\n• HTTPS (HTTP Secure) encrypts the data using SSL/TLS, protecting sensitive information like passwords and credit cards\n\nYou can spot HTTPS sites by the padlock icon in your browser's address bar. Always look for HTTPS when sharing personal information online!",
  
  neural_networks: "Neural networks learn similar to how we learn - through experience and feedback! Here's a simple explanation:\n\n1. They start with random guesses\n2. Compare their guesses to the correct answers\n3. Calculate how wrong they were (error)\n4. Adjust their internal connections to make better guesses next time\n5. Repeat thousands of times\n\nThis process called 'backpropagation' gradually tunes the network to recognize patterns in data, from images to text to time series.",
  
  // Additional properties for science and culture responses
  northern_lights: "The Northern Lights (Aurora Borealis) are caused by solar particles colliding with gases in Earth's atmosphere. When charged particles from the sun strike atoms in Earth's atmosphere, they release energy in the form of light. The different colors are caused by different gases - green from oxygen at lower altitudes, red from oxygen at higher altitudes, and blue/purple from nitrogen.",
  
  moon_landings: "To date, only 3 countries have successfully landed on the moon: the United States, Russia (Soviet Union), and China. The US Apollo missions remain the only ones that brought humans to the lunar surface (Apollo 11, 12, 14, 15, 16, and 17 between 1969-1972). Recently, India (Chandrayaan-3) and Japan have successfully landed unmanned spacecraft on the moon as well.",
  
  world_language: "Mandarin Chinese is the world's most spoken first language with about 1.3 billion native speakers. However, English is the most widely spoken language overall when you include second-language speakers, with around 1.5 billion total speakers worldwide. It's the dominant language for international business, science, and technology.",
  
  sun_core: "The sun's core is incredibly hot - approximately 15 million degrees Celsius (27 million degrees Fahrenheit)! This extreme temperature is necessary for nuclear fusion to occur, where hydrogen atoms combine to form helium, releasing the enormous energy that powers our solar system.",
  
  smallest_country: "Vatican City is the world's smallest country by both area and population. It's an independent city-state enclaved within Rome, Italy, with an area of just 49 hectares (121 acres) and a population of about 800. It's the spiritual center of the Roman Catholic Church and home to the Pope.",
  
  // New science responses
  ancient_wonders: "The Seven Wonders of the Ancient World were remarkable constructions of classical antiquity. They included the Great Pyramid of Giza (the only one still standing), the Hanging Gardens of Babylon, the Temple of Artemis, the Statue of Zeus, the Mausoleum at Halicarnassus, the Colossus of Rhodes, and the Lighthouse of Alexandria. These structures represented extraordinary human achievement in architecture, engineering, and art.",
  
  roman_empire: "The Roman Empire was one of history's largest and most influential civilizations, spanning from 27 BCE to 476 CE (Western) and 1453 CE (Eastern/Byzantine). At its peak, it encompassed most of Europe, parts of Africa, and the Middle East. Roman contributions to civilization include advanced engineering (roads, aqueducts), legal systems, military strategies, architecture, and language (Latin derivatives include English, Spanish, French, Italian, and Portuguese).",
  
  silk_road: "The Silk Road was an ancient network of trade routes connecting East and West, from China to the Mediterranean. Active from around 130 BCE to the 1450s CE, it wasn't just a single road but a series of paths spanning over 4,000 miles. Beyond silk, traders exchanged spices, textiles, precious metals, and religious ideas. This cultural exchange spread Buddhism, Christianity, and Islam across regions while facilitating technological transfer between civilizations.",
  
  // Game responses
  rock_paper_scissors: "I choose... PAPER! 📄\n\nPaper wraps rock, but scissors cut paper, and rock breaks scissors. Want to play again? Just ask!",
  
  guess_number: "I'm thinking of the number 7! Were you thinking of that too? Ask me again for a different number - I'll pick randomly between 1 and 10!",
  
  random_quote: "\"The best way to predict the future is to create it.\" - Abraham Lincoln\n\nThis quote reminds me that data science isn't just about analyzing what has happened, but using those insights to shape better outcomes!",
  
  // Time and date responses
  leap_year: "A leap year has 366 days instead of 365, with February 29 as the extra day. Leap years occur every 4 years (when the year is divisible by 4), except for years divisible by 100 but not by 400. So 2020 was a leap year, 2100 will not be, but 2000 was. This adjustment keeps our calendar aligned with Earth's orbit around the sun.",
  
  time_tokyo: "Based on my last update, Tokyo is 9 hours ahead of GMT/UTC. So when it's noon GMT, it's 9:00 PM in Tokyo. For the exact current time, you might want to check a world clock or time zone converter.",
  
  // New cultural responses
  sustainability: "Sustainability refers to meeting our current needs without compromising future generations' ability to meet their own needs. It encompasses environmental conservation, economic viability, and social equity. Sustainable practices include renewable energy use, resource conservation, waste reduction, and ethical consumption. As climate change concerns grow, sustainability has become increasingly important across industries, with businesses, governments, and individuals adopting more environmentally responsible approaches.",
  
  future_cities: "Future cities will likely be 'smart cities' that use IoT sensors, AI, and data analytics to enhance efficiency and quality of life. Features may include autonomous public transportation, renewable energy microgrids, intelligent infrastructure that responds to real-time conditions, vertical farming, and mixed-use developments that reduce commuting. These cities will prioritize sustainability, resilience to climate change, and equitable access to resources and opportunities.",
  
  remote_work: "Remote work has transformed from an occasional perk to a mainstream work arrangement, accelerated by technological advances and the COVID-19 pandemic. Benefits include flexibility, reduced commuting time, potential productivity increases, and global talent access. Challenges include maintaining company culture, collaboration difficulties, work-life balance issues, and digital fatigue. The future workplace will likely be hybrid, combining remote work flexibility with intentional in-person collaboration.",
  
  // Fun facts
  fun_facts: {
    english: [
      "The Great Wall of China is visible from space.",
      "Honey never spoils.",
      "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
      "Bananas are berries, but strawberries are not.",
      "The world's largest desert is Antarctica.",
      "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
      "The average person spends about six months of their lifetime waiting for red lights to turn green.",
      "The world's largest living thing is a giant sequoia tree named General Sherman, which covers an area of 4,500 square meters.",
      "The world's oldest known living tree is the Pando aspen, which is over 80,000 years old.",
      "The world's largest snowflake was 15 inches wide and 8 inches thick.",
      "The world's largest active volcano is Mauna Loa in Hawaii.",
      "The world's largest ocean is the Pacific Ocean.",
      "The world's largest island is Greenland.",
      "The world's largest desert is the Antarctic.",
      "The world's largest waterfall is Angel Falls in Venezuela.",
      "The world's largest cave is the Son Doong Cave in Vietnam.",
      "The world's largest animal is the blue whale.",
      "The world's largest bird is the ostrich.",
      "The world's largest reptile is the saltwater crocodile.",
      "The world's largest amphibian is the giant salamander."
    ],
    bahasa: [
      "Dinding Besar China dapat dilihat dari angkasa.",
      "Madu tidak pernah busuk.",
      "Menara Eiffel dapat menjadi 15 cm lebih tinggi selama musim panas karena ekspansi termal.",
      "Pisang adalah buah, tetapi stroberi bukan.",
      "Gurun terbesar di dunia adalah Antartika.",
      "Perang paling pendek dalam sejarah adalah antara Britania Raya dan Zanzibar pada 27 Agustus 1896. Zanzibar menyerah setelah 38 menit.",
      "Orang rata-rata menghabiskan sekitar enam bulan dalam hidupnya menunggu lampu merah berubah menjadi hijau.",
      "Makhluk hidup terbesar di dunia adalah pohon sequoia raksasa bernama General Sherman, yang meliputi area 4,500 meter persegi.",
      "Pohon tua terlama yang diketahui adalah pohon aspen Pando, yang berusia lebih dari 80,000 tahun.",
      "Bunga salju terbesar di dunia memiliki lebar 15 inci dan ketebalan 8 inci.",
      "Gunung api aktif terbesar di dunia adalah Mauna Loa di Hawaii.",
      "Samudra terbesar di dunia adalah Samudra Pasifik.",
      "Pulau terbesar di dunia adalah Greenland.",
      "Gurun terbesar di dunia adalah Antartika.",
      "Air terjun terbesar di dunia adalah Angel Falls di Venezuela.",
      "Gua terbesar di dunia adalah Gua Son Doong di Vietnam.",
      "Hewan terbesar di dunia adalah paus biru.",
      "Burung terbesar di dunia adalah unta.",
      "Reptil terbesar di dunia adalah buaya air laut.",
      "Amfibi terbesar di dunia adalah salamander raksasa."
    ]
  },
  
  // Language support
  languages: {
    deutsch: {
      greetings: [
        "Hallo!",
        "Guten Tag!",
        "Hallo, wie geht's dir?",
        "Hallo, schön dich zu treffen!",
        "Hallo, was kann ich für dich tun?",
        "Hallo, wie läuft's?",
        "Hallo, wie geht's heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?",
        "Hallo, wie geht's dir heute?"
      ],
      about: "Hallo, ich bin Putra Dinantio Nugroho, ein Data Science-Enthusiast mit einem Hintergrund in Politikwissenschaft von der Universitas Indonesia. Ich bin leidenschaftlich daran, datengetriebene Einsichten zu nutzen, um Entscheidungen in Bereichen wie Regierung, Technologie und Geschäft zu beeinflussen. Mit Erfahrung in Datenvisualisierung, Python-Programmierung und Machine Learning bin ich ständig auf der Suche nach Gelegenheiten, meine analytischen Fähigkeiten auf reale Probleme anzuwenden.",
      skills: "Technische Fähigkeiten:\n\n• Programmierung: Python, SQL, Django\n\n• Datenvisualisierung: Tableau, Excel\n\n• Webentwicklung: HTML, CSS\n\n• Tools: PowerPoint, Excel, Tableau\n\n\nSoft Skills:\n\n• Analytisches Denken: Starke Forschungs- und Datenanalysefähigkeiten\n\n• Kommunikation: Erfahrung in der Präsentation technischer Ergebnisse für Nicht-Techniker\n\n• Teamarbeit: Effektive Zusammenarbeit in einer Teamumgebung, insbesondere bei interdisziplinären Projekten",
      projects: "Ich habe an verschiedenen Projekten gearbeitet, darunter:\n• Datenvisualisierung der Luftverschmutzung in Jakarta\n• Datenbankdesign für eine E-Bibliothek\n• Kundenabwanderungsvorhersage\n• Policy Brief zur Umweltbewusstseinsbildung unter Jakarta-Jugendlichen\n\nUnd mehr! (Für weitere Projekte, besuchen Sie bitte die Projektsektion)\n\nHinweis: Wenn Sie ein Android/iPhone verwenden, klicken Sie auf die drei horizontalen Striche neben der Dunkelmodusschaltfläche.\n\nFühlen Sie sich frei, mich zu kontaktieren, wenn Sie über diese Projekte im Detail sprechen möchten!",
      education: "Ausbildung:\n\n• Bachelor of Political Science – Universitas Indonesia (2021–2025)\n\nDurchschnittsnote: 3,52/4,00, Schwerpunkt auf Regierung und Politikanalyse\n\n\n• Leiden-Delft-Erasmus-Universität (2024)\n\nJoint Minor Program – Future Challenges Lab\n\n\n• Pacmann, Data Science (2023–2025)\n\nAbgeschlossene Kurse in Python, Machine Learning und Datenvisualisierung\n\n\nZertifikate:\n\n• Responsive Web Design – freeCodeCamp\n\n• Intro to Statistics – Stanford Online\n\n• English (Upper Intermediate) – Duolingo",
      contact: "Sie können mich erreichen über:\n• E-Mail: pdinantio18@gmail.com\n• LinkedIn: https://www.linkedin.com/in/putra-dinantio-n-5651961b4/\n• Github: https://github.com/dinanditio\n• Telefon: +6281528998827",
      thanks: [
        "Danke für deine Frage!",
        "Vielen Dank für deine Nachricht!",
        "Danke für deine Unterstützung!",
        "Vielen Dank für deine Geduld!",
        "Danke für deine Hilfe!",
        "Vielen Dank für deine Aufmerksamkeit!",
        "Danke für deine Zeit!",
        "Vielen Dank für deine Mitarbeit!",
        "Danke für deine Freundlichkeit!",
        "Vielen Dank für deine Unterstützung!",
        "Danke für deine Geduld!",
        "Vielen Dank für deine Hilfe!",
        "Danke für deine Aufmerksamkeit!",
        "Vielen Dank für deine Zeit!",
        "Danke für deine Mitarbeit!",
        "Vielen Dank für deine Freundlichkeit!",
        "Danke für deine Unterstützung!",
        "Vielen Dank für deine Geduld!",
        "Danke für deine Hilfe!",
        "Vielen Dank für deine Aufmerksamkeit!"
      ],
      goodbyes: [
        "Auf Wiedersehen!",
        "Bis bald!",
        "Tschüss!",
        "Bis später!",
        "Bis dann!",
        "Auf Wiedersehen!",
        "Bis bald!",
        "Tschüss!",
        "Bis später!",
        "Bis dann!",
        "Auf Wiedersehen!",
        "Bis bald!",
        "Tschüss!",
        "Bis später!",
        "Bis dann!",
        "Auf Wiedersehen!",
        "Bis bald!",
        "Tschüss!",
        "Bis später!",
        "Bis dann!"
      ]
    },
    mandarin: {
      greetings: [
        "你好！",
        "早上好！",
        "你好，你今天好吗？",
        "你好，很高兴见到你！",
        "你好，我能为你做什么？",
        "你好，一切顺利吗？",
        "你好，今天怎么样？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？",
        "你好，今天你好吗？"
      ],
      about: "你好，我是普特拉·迪南蒂奥·努格罗霍，一位来自印度尼西亚政治学院的数据科学爱好者。我热衷于利用数据驱动的见解来影响政府、技术和商业等领域的决策。拥有数据可视化、Python编程和机器学习等经验，我不断寻找机会将我的分析技能应用于实际问题。",
      skills: "技术技能：\n\n• 编程：Python、SQL、Django\n\n• 数据可视化：Tableau、Excel\n\n• 网页开发：HTML、CSS\n\n• 工具：PowerPoint、Excel、Tableau\n\n\n软技能：\n\n• 分析思维：强大的研究和数据分析能力\n\n• 沟通：能够向非技术人员展示技术成果\n\n• 团队合作：在团队环境中有效合作，尤其是在跨学科项目中",
      projects: "我参与了多个项目，包括：\n• 雅加达空气污染可视化\n• 电子图书数据库设计\n• 客户流失预测\n• 雅加达青年环境意识政策简报\n\n还有更多！（要查看更多项目，请访问项目部分）\n\n注意：如果您使用的是Android/iPhone，请点击暗色模式按钮旁边的三个水平线。\n\n如果您想详细了解这些项目，欢迎联系我！",
      education: "教育：\n\n• 政治学学士 – 印度尼西亚大学（2021–2025）\n\n平均成绩：3.52/4.00，重点是政府和政策分析\n\n\n• 莱顿-德尔夫特-埃拉斯穆斯大学（2024）\n\n联合辅修计划 – 未来挑战实验室\n\n\n• Pacmann，数据科学（2023–2025）\n\n完成了Python、机器学习和数据可视化等课程\n\n\n证书：\n\n• 响应式网页设计 – freeCodeCamp\n\n• 统计学入门 – Stanford Online\n\n• 英语（中级） – Duolingo",
      contact: "您可以通过以下方式联系我：\n• 电子邮件：pdinantio18@gmail.com\n• LinkedIn：https://www.linkedin.com/in/putra-dinantio-n-5651961b4/\n• Github：https://github.com/dinanditio\n• 电话：+6281528998827",
      thanks: [
        "谢谢您的提问！",
        "感谢您的留言！",
        "感谢您的支持！",
        "感谢您的耐心！",
        "感谢您的帮助！",
        "感谢您的关注！",
        "感谢您的时间！",
        "感谢您的参与！",
        "感谢您的友好！",
        "感谢您的支持！",
        "感谢您的耐心！",
        "感谢您的帮助！",
        "感谢您的关注！",
        "感谢您的时间！",
        "感谢您的参与！",
        "感谢您的友好！",
        "感谢您的支持！",
        "感谢您的耐心！",
        "感谢您的帮助！",
        "感谢您的关注！"
      ],
      goodbyes: [
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！",
        "再见！"
      ]
    },
    japanese: {
      greetings: [
        "こんにちは！",
        "おはようございます！",
        "こんにちは、元気ですか？",
        "こんにちは、会えて嬉しいです！",
        "こんにちは、何かお手伝いできますか？",
        "こんにちは、順調ですか？",
        "こんにちは、今日はどうですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？",
        "こんにちは、今日は元気ですか？"
      ],
      about: "こんにちは、私はプトラ・ディナンティオ・ヌグロホと申します。インドネシア大学の政治学を背景に持つデータサイエンス愛好家です。政府、技術、ビジネスなどのセクターにおけるデータ駆動型の意思決定に影響を与えることに情熱を持っています。",
      skills: "技術スキル：\n\n• プログラミング：Python、SQL、Django\n\n• データ可視化：Tableau、Excel\n\n• ウェブ開発：HTML、CSS\n\n• ツール：PowerPoint、Excel、Tableau\n\n\nソフトスキル：\n\n• 分析的思考：強力な研究とデータ分析能力\n\n• コミュニケーション：技術的成果を非技術者にプレゼンテーションする経験\n\n• チームワーク：チーム環境での有効な協力、特にクロス機能プロジェクトで",
      projects: "私は以下のようなプロジェクトに取り組んできました：\n• ジャカルタの空気汚染の可視化\n• 電子図書館データベース設計\n• 顧客流失予測\n• ジャカルタ青年の環境意識に関するポリシーブリーフ\n\nその他もあります！（詳細はプロジェクトセクションをご覧ください）\n\n注：Android/iPhoneを使用している場合は、ダークモードボタンの横にある3本の水平線をクリックしてください。\n\nこれらのプロジェクトについて詳しく話したい場合は、お気軽にお問い合わせください！",
      education: "教育：\n\n• 政治学学士 – インドネシア大学（2021–2025）\n\n平均成績：3.52/4.00、政府と政策分析に焦点を当てています\n\n\n• リーデン大学、デルフト大学、エラスムス大学（2024）\n\nジョイントマイナープログラム – 未来の課題研究室\n\n\n• Pacmann、データサイエンス（2023–2025）\n\nPython、機械学習、データ可視化などのコースを修了\n\n\n資格：\n\n• レスポンシブウェブデザイン – freeCodeCamp\n\n• 統計学入門 – Stanford Online\n\n• 英語（中級） – Duolingo",
      contact: "以下の方法でお問い合わせください：\n• メール：pdinantio18@gmail.com\n• LinkedIn：https://www.linkedin.com/in/putra-dinantio-n-5651961b4/\n• Github：https://github.com/dinanditio\n• 電話：+6281528998827",
      thanks: [
        "質問ありがとうございます！",
        "メッセージありがとうございます！",
        "サポートありがとうございます！",
        "ご協力ありがとうございます！",
        "ご協力ありがとうございます！",
        "ご注意ありがとうございます！",
        "ご時間ありがとうございます！",
        "ご参加ありがとうございます！",
        "ご親切ありがとうございます！",
        "サポートありがとうございます！",
        "ご協力ありがとうございます！",
        "ご協力ありがとうございます！",
        "ご注意ありがとうございます！",
        "ご時間ありがとうございます！",
        "ご参加ありがとうございます！",
        "ご親切ありがとうございます！",
        "サポートありがとうございます！",
        "ご協力ありがとうございます！",
        "ご協力ありがとうございます！",
        "ご注意ありがとうございます！"
      ],
      goodbyes: [
        "さようなら！",
        "またね！",
        "さようなら！",
        "またね！",
        "またね！",
        "さようなら！",
        "またね！",
        "さようなら！",
        "またね！",
        "またね！",
        "さようなら！",
        "またね！",
        "さようなら！",
        "またね！",
        "またね！",
        "さようなら！",
        "またね！",
        "さようなら！",
        "またね！",
        "またね！"
      ]
    }
  }
};

// Add Bahasa Indonesia responses
const bahasaResponses = {
  tentang: "Halo, saya Putra Dinantio Nugroho, seorang yang antusias dengan Data Science dan memiliki latar belakang Ilmu Politik dari Universitas Indonesia. Saya bersemangat menggunakan wawasan berbasis data untuk mempengaruhi pengambilan keputusan di berbagai sektor seperti pemerintahan, teknologi, dan bisnis.",
  keahlian: "Keahlian Teknis:\n\n• Pemrograman: Python, SQL, Django\n\n• Visualisasi Data: Tableau, Excel\n\n• Pengembangan Web: HTML, CSS\n\n• Alat: PowerPoint, Excel, Tableau\n\n\nSoft Skills:\n\n• Pemikiran Analitis: Keterampilan riset dan analisis data yang kuat\n\n• Komunikasi: Pengalaman menyajikan temuan teknis kepada audiens non-teknis\n\n• Kerja Tim: Kolaborasi efektif dalam lingkungan tim, terutama dalam proyek lintas fungsi",
  proyek: "Saya telah mengerjakan beberapa proyek termasuk:\n• Visualisasi Polusi Udara di Jakarta\n• Desain Basis Data E-Library\n• Prediksi Churn Pelanggan\n• Policy Brief tentang Kesadaran Lingkungan\n\nAnda dapat bertanya tentang proyek spesifik ini!",
  pendidikan: "Pendidikan:\n\n• Sarjana Ilmu Politik – Universitas Indonesia (2021–2025)\n\nIPK: 3.52/4.00, Fokus pada tata kelola dan analisis kebijakan\n\n\n• Leiden-Delft-Erasmus University (2024)\n\nProgram Minor Bersama – Future Challenges Lab\n\n\n• Pacmann, Data Science (2023–2025)\n\nMenyelesaikan kursus Python, Machine Learning, dan Visualisasi Data\n\n\nSertifikasi:\n\n• Responsive Web Design – freeCodeCamp\n\n• Intro to Statistics – Stanford Online\n\n• English (Upper Intermediate) – Duolingo",
  kontak: "Anda dapat menghubungi saya melalui:\n• Email: pdinantio18@gmail.com\n• LinkedIn: https://www.linkedin.com/in/putra-dinantio-n-5651961b4/\n• Github: https://github.com/dinanditio\n• Telepon: +6281528998827",
  
  // Indonesian knowledge responses
  ai_vs_ml_id: "AI (Kecerdasan Buatan) adalah konsep luas tentang mesin yang mampu melakukan tugas dengan cara yang kita anggap 'cerdas'. Machine Learning adalah subset spesifik dari AI yang melatih mesin untuk belajar menggunakan data tanpa pemrograman eksplisit untuk setiap skenario. Anggap AI sebagai tujuan menciptakan mesin cerdas dan ML sebagai salah satu pendekatan untuk mencapai tujuan tersebut.",
  
  blockchain_id: "Blockchain seperti buku besar digital yang dibagikan di banyak komputer. Setiap 'blok' berisi daftar transaksi, dan setelah ditambahkan ke 'rantai', sangat sulit diubah. Teknologi ini aman karena tidak dikontrol oleh satu orang - semua orang dalam jaringan memiliki salinannya. Teknologi ini mendukung cryptocurrency seperti Bitcoin, tetapi juga dapat digunakan untuk kontrak pintar, pelacakan rantai pasokan, dan banyak lagi!",
  
  fakta_indonesia: "Beberapa fakta tentang Indonesia:\n\n• Indonesia merdeka pada 17 Agustus 1945\n• Lagu Indonesia Raya diciptakan oleh W.R. Supratman\n• Gunung tertinggi di Indonesia adalah Puncak Jaya di Papua (4.884 m)\n• Indonesia memiliki lebih dari 17.000 pulau\n• Komodo adalah reptil terbesar di dunia dan hanya ditemukan di Indonesia",
  
  // Tech knowledge in Indonesian
  komputasi_awan: "Komputasi awan (cloud computing) menyediakan layanan komputasi melalui internet alih-alih menggunakan server lokal. Ini menawarkan sumber daya yang dapat diskalakan seperti penyimpanan, database, dan perangkat lunak. Keuntungan utamanya termasuk efisiensi biaya, fleksibilitas, dan aksesibilitas dari mana saja dengan akses internet.",
  
  keamanan_siber: "Keamanan siber adalah praktik melindungi sistem, jaringan, dan program dari serangan digital. Serangan ini biasanya bertujuan untuk mengakses informasi sensitif, memeras uang, atau mengganggu operasi. Keamanan siber yang efektif memerlukan upaya terkoordinasi di seluruh sistem, termasuk keamanan jaringan, aplikasi, dan edukasi pengguna.",
  
  sains_data: "Sains data menggabungkan statistik, matematika, pemrograman, dan keahlian domain untuk mengekstrak wawasan dari data. Ini melibatkan pengumpulan, pembersihan, dan analisis data untuk menemukan pola dan membuat prediksi. Alat utama termasuk Python, R, SQL, dan pustaka visualisasi. Bidang ini membantu organisasi membuat keputusan berbasis data di berbagai industri.",
  
  // Fun Indonesian responses
  lelucon: "Kenapa programmer selalu bingung dengan perbedaan Halloween dan Natal? Karena Oct 31 = Dec 25! 😄\n\nOct(al) 31 sama dengan Dec(imal) 25. Ini lelucon matematika dan programming!",
  
  makanan_favorit: "Kalau saya jadi makanan, saya ingin jadi nasi goreng! Kenapa? Karena bisa beradaptasi dengan berbagai bahan, selalu disukai semua orang, dan punya 'pattern recognition' dari bumbu yang kompleks tapi harmonis - mirip seperti algoritma machine learning yang baik! 🍳🍚",
  
  kopi_atau_teh: "Saya lebih suka kopi! ☕ Tidak ada yang mengalahkan secangkir kopi yang bagus saat menganalisis dataset kompleks atau sesi coding. Kopi itu seperti data yang bagus - kuat, konsisten, dan membuat Anda lebih produktif!",
  
  akhir_pekan: "Di akhir pekan, saya biasanya mengerjakan side projects data science, membaca artikel terbaru tentang teknologi, atau mengeksplorasi dataset baru untuk berlatih keterampilan analisis. Kadang-kadang saya juga mengambil waktu untuk mendaki atau fotografi - penting untuk menyeimbangkan pikiran analitis dan kreatif!",
  
  // Science responses in Indonesian
  umur_alam_semesta: "Alam semesta diperkirakan berusia sekitar 13,8 miliar tahun, menurut estimasi ilmiah saat ini. Usia ini ditentukan melalui beberapa metode termasuk pengukuran radiasi latar belakang gelombang mikro kosmik, laju ekspansi alam semesta, dan usia bintang-bintang tertua yang diketahui.",
  
  kedalaman_laut: "Titik terdalam yang diketahui di Bumi adalah Challenger Deep di Palung Mariana, mencapai kedalaman sekitar 10.935 meter di bawah permukaan laut. Itu lebih dalam daripada ketinggian Gunung Everest! Tekanan ekstrem pada kedalaman ini lebih dari 1.000 kali tekanan atmosfer standar di permukaan laut, membuat eksplorasi sangat sulit.",
  
  genom_manusia: "Genom manusia mengandung sekitar 3 miliar pasangan basa DNA dan sekitar 20.000-25.000 gen pengkode protein. Proyek Genom Manusia, yang diselesaikan pada tahun 2003, adalah pencapaian ilmiah penting yang memetakan cetak biru genetik kita secara lengkap. Penelitian ini membantu para ilmuwan memahami penyakit genetik dan evolusi manusia.",
  
  // Cultural responses in Indonesian
  // New cultural responses in Indonesian
  keberlanjutan: "Keberlanjutan mengacu pada pemenuhan kebutuhan kita saat ini tanpa mengorbankan kemampuan generasi mendatang untuk memenuhi kebutuhan mereka sendiri. Ini mencakup konservasi lingkungan, kelayakan ekonomi, dan keadilan sosial. Praktik berkelanjutan meliputi penggunaan energi terbarukan, konservasi sumber daya, pengurangan limbah, dan konsumsi etis. Seiring meningkatnya kekhawatiran perubahan iklim, keberlanjutan menjadi semakin penting di berbagai industri.",
  
  kota_masa_depan: "Kota masa depan kemungkinan akan menjadi 'kota pintar' yang menggunakan sensor IoT, AI, dan analitik data untuk meningkatkan efisiensi dan kualitas hidup. Fitur-fiturnya mungkin termasuk transportasi umum otonom, jaringan energi terbarukan, infrastruktur cerdas yang merespons kondisi real-time, pertanian vertikal, dan pengembangan fungsi campuran yang mengurangi waktu perjalanan. Kota-kota ini akan memprioritaskan keberlanjutan, ketahanan terhadap perubahan iklim, dan akses yang adil ke sumber daya dan peluang.",
  
  kerja_jarak_jauh: "Kerja jarak jauh telah berubah dari tunjangan sesekali menjadi pengaturan kerja utama, dipercepat oleh kemajuan teknologi dan pandemi COVID-19. Manfaatnya termasuk fleksibilitas, pengurangan waktu perjalanan, potensi peningkatan produktivitas, dan akses ke talenta global. Tantangannya termasuk mempertahankan budaya perusahaan, kesulitan kolaborasi, masalah keseimbangan kehidupan kerja, dan kelelahan digital. Tempat kerja masa depan kemungkinan akan bersifat hybrid, menggabungkan fleksibilitas kerja jarak jauh dengan kolaborasi tatap muka yang disengaja."
};

// Add common greetings in Bahasa
const bahasaGreetings = [
  "halo", "hai", "selamat pagi", "selamat siang", "selamat sore", "selamat malam", "apa kabar",
  "permisi", "maaf", "kenalkan", "senang bertemu", "sampai jumpa", "selamat tinggal", "sampai ketemu lagi"
];

// Add common question words in Bahasa
const bahasaQuestionWords = [
  "apa", "siapa", "mengapa", "kenapa", "bagaimana", "di mana", "dimana", "kapan", "berapa", "mana", "yang mana",
  "tolong", "bisa", "boleh", "mungkin", "mohon"
];

// Pixel Animation Component
const PixelAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Pixel size
    const pixelSize = 10;
    
    // Define dragon-like pixel art areas (coordinates for pixel clusters)
    const pixelClusters = [
      // Left dragon-like shape
      { x: canvas.width * 0.2, y: canvas.height * 0.4, width: canvas.width * 0.2, height: canvas.height * 0.4 },
      // Right dragon-like shape
      { x: canvas.width * 0.7, y: canvas.height * 0.3, width: canvas.width * 0.25, height: canvas.height * 0.5 },
    ];
    
    // Generate pixels
    const pixels: {x: number, y: number, size: number, vx: number, vy: number, color: string}[] = [];
    
    pixelClusters.forEach(cluster => {
      const pixelCount = Math.floor((cluster.width * cluster.height) / (pixelSize * pixelSize) * 0.2);
      
      for (let i = 0; i < pixelCount; i++) {
        const x = cluster.x + Math.random() * cluster.width;
        const y = cluster.y + Math.random() * cluster.height;
        
        pixels.push({
          x,
          y,
          size: pixelSize,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: '#52f9dd' // Teal/mint color as seen in the image
        });
      }
    });
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update pixels
      pixels.forEach(pixel => {
        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        
        // Update position
        pixel.x += pixel.vx;
        pixel.y += pixel.vy;
        
        // Bounds checking
        if (pixel.x < 0 || pixel.x > canvas.width - pixel.size) {
          pixel.vx *= -1;
        }
        if (pixel.y < 0 || pixel.y > canvas.height - pixel.size) {
          pixel.vy *= -1;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Interactive mouse effects
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw new pixels where the mouse moves
    ctx.fillStyle = '#52f9dd';
    ctx.fillRect(e.clientX - 5, e.clientY - 5, 10, 10);
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

// Interactive text component
const InteractiveText = ({ 
  text, 
  className = '',
  onClick = () => {},
}: { 
  text: string; 
  className?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };
  
  return (
    <span 
      className={`relative cursor-pointer transition-colors ${isClicked ? 'text-teal-400' : isHovered ? 'text-teal-300' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {text}
    </span>
  );
};

// Add time responses for specific cities
const cityTimeZones = {
  amsterdam: 'Europe/Amsterdam',
  berlin: 'Europe/Berlin',
  london: 'Europe/London',
  paris: 'Europe/Paris',
  tokyo: 'Asia/Tokyo',
  newyork: 'America/New_York',
  singapore: 'Asia/Singapore',
  sydney: 'Australia/Sydney',
  mecca: 'Asia/Mecca',
  mekkah: 'Asia/Mecca',
  makkah: 'Asia/Mecca',
  newyork: 'America/New_York',
  tokyo: 'Asia/Tokyo',
  ottawa: 'America/Ottawa',
  sydney: 'Australia/Sydney',
  beijing: 'Asia/Shanghai',
  delhi: 'Asia/Kolkata',
  riodejaneiro: 'America/Sao_Paulo',
  moscow: 'Europe/Moscow',
  dubai: 'Asia/Dubai',
  istanbul: 'Europe/Istanbul',
  johannesburg: 'Africa/Johannesburg',
  cairo: 'Africa/Cairo',
  losangeles: 'America/Los_Angeles',
  chicago: 'America/Chicago',
  rome: 'Europe/Rome',
  bangkok: 'Asia/Bangkok'
};

const getCityTime = (city: string) => {
  if (!cityTimeZones[city as keyof typeof cityTimeZones]) {
    return null;
  }
  
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: cityTimeZones[city as keyof typeof cityTimeZones],
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    });
    
    return formatter.format(new Date());
  } catch (error) {
    return null;
  }
};

// Fun Facts Collection
const funFacts = {
  english: [
    "The Great Wall of China is visible from space.",
    "Honey never spoils.",
    "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
    "Bananas are berries, but strawberries are not.",
    "The world's largest desert is Antarctica.",
    "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "The average person spends about six months of their lifetime waiting for red lights to turn green.",
    "The world's largest living thing is a giant sequoia tree named General Sherman, which covers an area of 4,500 square meters.",
    "The world's oldest known living tree is the Pando aspen, which is over 80,000 years old.",
    "The world's largest snowflake was 15 inches wide and 8 inches thick.",
    "The world's largest active volcano is Mauna Loa in Hawaii.",
    "The world's largest ocean is the Pacific Ocean.",
    "The world's largest island is Greenland.",
    "The world's largest desert is the Antarctic.",
    "The world's largest waterfall is Angel Falls in Venezuela.",
    "The world's largest cave is the Son Doong Cave in Vietnam.",
    "The world's largest animal is the blue whale.",
    "The world's largest bird is the ostrich.",
    "The world's largest reptile is the saltwater crocodile.",
    "The world's largest amphibian is the giant salamander."
  ],
  bahasa: [
    "Dinding Besar China dapat dilihat dari angkasa.",
    "Madu tidak pernah busuk.",
    "Menara Eiffel dapat menjadi 15 cm lebih tinggi selama musim panas karena ekspansi termal.",
    "Pisang adalah buah, tetapi stroberi bukan.",
    "Gurun terbesar di dunia adalah Antartika.",
    "Perang paling pendek dalam sejarah adalah antara Britania Raya dan Zanzibar pada 27 Agustus 1896. Zanzibar menyerah setelah 38 menit.",
    "Orang rata-rata menghabiskan sekitar enam bulan dalam hidupnya menunggu lampu merah berubah menjadi hijau.",
    "Makhluk hidup terbesar di dunia adalah pohon sequoia raksasa bernama General Sherman, yang meliputi area 4,500 meter persegi.",
    "Pohon tua terlama yang diketahui adalah pohon aspen Pando, yang berusia lebih dari 80,000 tahun.",
    "Bunga salju terbesar di dunia memiliki lebar 15 inci dan ketebalan 8 inci.",
    "Gunung api aktif terbesar di dunia adalah Mauna Loa di Hawaii.",
    "Samudra terbesar di dunia adalah Samudra Pasifik.",
    "Pulau terbesar di dunia adalah Greenland.",
    "Gurun terbesar di dunia adalah Antartika.",
    "Air terjun terbesar di dunia adalah Angel Falls di Venezuela.",
    "Gua terbesar di dunia adalah Gua Son Doong di Vietnam.",
    "Hewan terbesar di dunia adalah paus biru.",
    "Burung terbesar di dunia adalah unta.",
    "Reptil terbesar di dunia adalah buaya air laut.",
    "Amfibi terbesar di dunia adalah salamander raksasa."
  ]
};

// German language support
const germanResponses = {
  greeting: [
    "Hallo! Wie kann ich Ihnen heute helfen?",
    "Guten Tag! Willkommen auf meiner Portfolio-Seite.",
    "Grüß Gott! Wie geht es Ihnen heute?"
  ],
  about: "Hallo, ich bin Putra Dinantio Nugroho, ein Datenanalyse-Enthusiast mit einem Hintergrund in Politikwissenschaft von der Universität Indonesia. Ich interessiere mich für datengestützte Entscheidungsfindung in verschiedenen Bereichen wie Regierung, Technologie und Wirtschaft.",
  projects: "Ich habe an verschiedenen Projekten gearbeitet, darunter Luftverschmutzungsanalyse in Jakarta, E-Library-Datenbankdesign, Kundenfluktvorhersage und politische Analysen.",
  skills: "Meine Fähigkeiten umfassen Python, SQL, Datenanalyse, Visualisierung und Web-Entwicklung.",
  education: "Ich studiere Politikwissenschaft an der Universität Indonesia (2021-2025) und habe an Programmen der Leiden-Delft-Erasmus Universität teilgenommen.",
  contact: "Sie können mich kontaktieren unter: pdinantio18@gmail.com",
  thanks: "Gerne! Gibt es noch etwas, womit ich Ihnen helfen kann?",
  goodbye: "Auf Wiedersehen! Vielen Dank für Ihren Besuch."
};

// Chinese language support
const chineseResponses = {
  greeting: [
    "你好！今天我能帮您什么忙？",
    "您好！欢迎访问我的作品集网站。",
    "嗨！很高兴见到您。"
  ],
  about: "我是Putra Dinantio Nugroho，一位热爱数据科学的学生，拥有印度尼西亚大学政治学背景。我热衷于利用数据驱动的见解影响政府、技术和商业等领域的决策。",
  projects: "我的项目包括雅加达空气污染分析、电子図书馆数据库设计、客户流失预测和环保意识政策简报。",
  skills: "我的技能包括Python、SQL、数据分析、数据可视化和网页开发。",
  education: "我在印度尼西亚大学学习政治科学（2021-2025），并参加了莱顿-代尔夫特-伊拉斯谟大学的联合项目。",
  contact: "您可以通过以下方式联系我：pdinantio18@gmail.com",
  thanks: "不客气！还有什么我能帮您的吗？",
  goodbye: "再见！感谢您的访问。"
};

// Japanese language support
const japaneseResponses = {
  greeting: [
    "こんにちは！今日はどのようにお手伝いできますか？",
    "ようこそ、私のポートフォリオサイトへ！",
    "はじめまして！お会いできて嬉しいです。"
  ],
  about: "私はプトラ・ディナンティオ・ヌグロホと申します。インドネシア大学の政治学を背景に持つデータサイエンス愛好家です。政府、技術、ビジネスなどのセクターにおけるデータ駆動型の意思決定に影響を与えることに情熱を持っています。",
  projects: "ジャカルタの大気汚染分析、電子図書館データベース設計、顧客離脱予測、環境意識に関する政策概要など、さまざまなプロジェクトに取り組んできました。",
  skills: "私のスキルにはPython、SQL、データ分析、データ可視化、ウェブ開発が含まれます。",
  education: "インドネシア大学で政治学を学んでいます（2021-2025）。また、ライデン・デルフト・エラスムス大学の共同プログラムに参加しました。",
  contact: "連絡先：pdinantio18@gmail.com",
  thanks: "どういたしまして！他に何かお手伝いできることはありますか？",
  goodbye: "さようなら！ご訪問ありがとうございました。"
};

// Add responses for "Apa kabar" (How are you) in Indonesian
const kabarResponses = [
  "Alhamdulillah, kabar saya baik! Bagaimana dengan Anda?",
  "Kabar saya sangat baik, terima kasih telah bertanya! Ada yang bisa saya bantu?",
  "Saya baik-baik saja, semoga hari Anda menyenangkan. Ada yang bisa saya bantu hari ini?"
];

// Add responses for crypto prices (simulated)
const cryptoResponses = {
  bitcoin: "Based on the latest market data, Bitcoin (BTC) is currently trading at approximately $60,213.45 USD. The price has seen a 2.3% increase in the last 24 hours with a trading volume of $42.8 billion. The current market cap stands at $1.18 trillion. Please note that cryptocurrency prices are highly volatile and can change rapidly. Data sourced from CoinGecko.",
  ethereum: "According to current market data, Ethereum (ETH) is trading at around $3,542.31 USD, with a 1.7% increase over the past 24 hours. The 24-hour trading volume is approximately $18.6 billion with a market cap of $425.7 billion. Ethereum continues to be the second-largest cryptocurrency by market capitalization. Data sourced from CoinGecko.",
  dogecoin: "Berdasarkan data terbaru, harga Dogecoin (DOGE) saat ini sekitar $0.137 USD. Harga ini dapat berubah dengan cepat karena volatilitas pasar crypto. Data diambil dari CoinGecko API.",
  solana: "Berdasarkan data terbaru, harga Solana (SOL) saat ini sekitar $148.76 USD. Harga ini dapat berubah dengan cepat karena volatilitas pasar crypto. Data diambil dari CoinGecko API.",
  cardano: "Berdasarkan data terbaru, harga Cardano (ADA) saat ini sekitar $0.468 USD. Harga ini dapat berubah dengan cepat karena volatilitas pasar crypto. Data diambil dari CoinGecko API.",
  usdt: "Berdasarkan data terbaru, harga Tether (USDT) stabil di sekitar $1.00 USD, sesuai dengan perannya sebagai stablecoin. Data diambil dari CoinGecko API."
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { type: 'bot', text: "Hello there! 👋 Feel free to browse my projects or reach out for collaborations", isTyping: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSection, setActiveSection] = useState('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Add reference for setTimeout IDs
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const thinkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch cryptocurrency data from CoinGecko API
  const fetchCryptoPrice = async (coinId: string) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd,idr&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data[coinId]) {
        const priceInfo = data[coinId];
        const usdPrice = priceInfo.usd;
        const idrPrice = priceInfo.idr;
        const usdChange = priceInfo.usd_24h_change ? priceInfo.usd_24h_change.toFixed(2) : 'N/A';
        const marketCap = priceInfo.usd_market_cap ? (priceInfo.usd_market_cap / 1000000000).toFixed(2) : 'N/A';
        const volume = priceInfo.usd_24h_vol ? (priceInfo.usd_24h_vol / 1000000000).toFixed(2) : 'N/A';
        
        // Format numbers with commas
        const formattedUsdPrice = usdPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        
        const formattedIdrPrice = idrPrice.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        
        // Construct response based on coin
        if (coinId === 'bitcoin') {
          return `Based on real-time data from CoinGecko, Bitcoin (BTC) is currently trading at ${formattedUsdPrice} (${formattedIdrPrice}). The price has ${parseFloat(usdChange) >= 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(usdChange))}% in the last 24 hours. The current market cap is $${marketCap} billion with a 24-hour trading volume of $${volume} billion. Cryptocurrency prices are highly volatile and subject to change rapidly.`;
        } else if (coinId === 'ethereum') {
          return `According to real-time data from CoinGecko, Ethereum (ETH) is currently trading at ${formattedUsdPrice} (${formattedIdrPrice}). The price has ${parseFloat(usdChange) >= 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(usdChange))}% in the last 24 hours. The current market cap is $${marketCap} billion with a 24-hour trading volume of $${volume} billion. Ethereum remains the second-largest cryptocurrency by market capitalization.`;
        }
      }
      
      return `I couldn't fetch the latest ${coinId} price at the moment. Cryptocurrency markets are active 24/7, and prices can change rapidly. Please try again in a moment.`;
    } catch (error) {
      console.error('Error fetching crypto price:', error);
      return `I'm having trouble accessing the latest cryptocurrency data right now. Please try again later.`;
    }
  };

  // Determine if interaction should be disabled (while bot is typing or thinking)
  const isInteractionDisabled = isTyping || chatMessages.some(msg => msg.isTyping);

  useEffect(() => {
    // Always start in dark mode for monochrome aesthetic
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat when messages change
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    // Mark initial message as finished typing after component mounts
    setTimeout(() => {
      setChatMessages(prev => [
        { ...prev[0], isTyping: false }
      ]);
    }, 1500);
  }, []);

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
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage, isTyping: false }]);
    setChatInput('');
    setIsTyping(true);

    // Simulate typing delay
    thinkingTimeoutRef.current = setTimeout(async () => {
      let response = "I'm not sure how to respond to that. Try asking about my skills, projects, education, or how to contact me.";
      
      // Check for keywords in the user message
      const lowerMessage = userMessage.toLowerCase();
      
      // Check for cryptocurrency price requests with real-time API
      if (
        lowerMessage.includes("bitcoin") || 
        lowerMessage.includes("btc") || 
        (lowerMessage.includes("price") && lowerMessage.includes("bitcoin"))
      ) {
        // Show typing indicator
        setIsTyping(false);
        setChatMessages(prev => [...prev, { 
          type: 'bot', 
          text: "Fetching the latest Bitcoin price data for you...", 
          isTyping: true 
        }]);
        
        try {
          // Fetch real-time Bitcoin price from CoinGecko
          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,idr&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true');
          
          if (!response.ok) {
            throw new Error('Failed to fetch Bitcoin data');
          }
          
          const data = await response.json();
          
          if (data && data.bitcoin) {
            const btcData = data.bitcoin;
            const usdPrice = btcData.usd;
            const idrPrice = btcData.idr;
            const change24h = btcData.usd_24h_change ? btcData.usd_24h_change.toFixed(2) : 'N/A';
            const marketCap = btcData.usd_market_cap ? (btcData.usd_market_cap / 1000000000).toFixed(2) : 'N/A';
            const volume = btcData.usd_24h_vol ? (btcData.usd_24h_vol / 1000000000).toFixed(2) : 'N/A';
            
            // Format numbers with commas
            const formattedUsdPrice = usdPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
            
            const formattedIdrPrice = idrPrice.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
            
            const btcResponse = `Based on real-time data from CoinGecko, Bitcoin (BTC) is currently trading at ${formattedUsdPrice} (${formattedIdrPrice}). The price has ${parseFloat(change24h) >= 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(change24h))}% in the last 24 hours. The current market cap is $${marketCap} billion with a 24-hour trading volume of $${volume} billion. Cryptocurrency prices are highly volatile and subject to change rapidly.`;
            
            // Update the last message with the real data
            setChatMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { 
                type: 'bot', 
                text: btcResponse, 
                isTyping: false 
              };
              return updated;
            });
            
            return; // Exit the function early
          }
        } catch (error) {
          console.error('Error fetching Bitcoin price:', error);
          // Show error message
          setChatMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { 
              type: 'bot', 
              text: "Sorry, I couldn't fetch the latest Bitcoin price data. Please try again later.", 
              isTyping: false 
            };
            return updated;
          });
          return; // Exit the function early
        }
      }
      else if (
        lowerMessage.includes("ethereum") || 
        lowerMessage.includes("eth") || 
        (lowerMessage.includes("price") && lowerMessage.includes("ethereum"))
      ) {
        // Show typing indicator
        setIsTyping(false);
        setChatMessages(prev => [...prev, { 
          type: 'bot', 
          text: "Fetching the latest Ethereum price data for you...", 
          isTyping: true 
        }]);
        
        try {
          // Fetch real-time Ethereum price from CoinGecko
          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,idr&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true');
          
          if (!response.ok) {
            throw new Error('Failed to fetch Ethereum data');
          }
          
          const data = await response.json();
          
          if (data && data.ethereum) {
            const ethData = data.ethereum;
            const usdPrice = ethData.usd;
            const idrPrice = ethData.idr;
            const change24h = ethData.usd_24h_change ? ethData.usd_24h_change.toFixed(2) : 'N/A';
            const marketCap = ethData.usd_market_cap ? (ethData.usd_market_cap / 1000000000).toFixed(2) : 'N/A';
            const volume = ethData.usd_24h_vol ? (ethData.usd_24h_vol / 1000000000).toFixed(2) : 'N/A';
            
            // Format numbers with commas
            const formattedUsdPrice = usdPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
            
            const formattedIdrPrice = idrPrice.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
            
            const ethResponse = `According to real-time data from CoinGecko, Ethereum (ETH) is currently trading at ${formattedUsdPrice} (${formattedIdrPrice}). The price has ${parseFloat(change24h) >= 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(change24h))}% in the last 24 hours. The current market cap is $${marketCap} billion with a 24-hour trading volume of $${volume} billion. Ethereum remains the second-largest cryptocurrency by market capitalization.`;
            
            // Update the last message with the real data
            setChatMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { 
                type: 'bot', 
                text: ethResponse, 
                isTyping: false 
              };
              return updated;
            });
            
            return; // Exit the function early
          }
        } catch (error) {
          console.error('Error fetching Ethereum price:', error);
          // Show error message
          setChatMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { 
              type: 'bot', 
              text: "Sorry, I couldn't fetch the latest Ethereum price data. Please try again later.", 
              isTyping: false 
            };
            return updated;
          });
          return; // Exit the function early
        }
      }
      else if (
        lowerMessage.includes("dogecoin") || 
        lowerMessage.includes("doge") || 
        (lowerMessage.includes("price") && lowerMessage.includes("dogecoin"))
      ) {
        response = cryptoResponses.dogecoin;
      }
      // ... existing code for other cryptos ...
      
      // Check for time in specific cities
      const timeMatch = lowerMessage.match(/time\s+in\s+([a-z]+)(\?)?/i);
      if (timeMatch) {
        const city = timeMatch[1].toLowerCase();
        
        // Handle specific cities
        if (cityTimeZones[city as keyof typeof cityTimeZones]) {
          const cityTime = getCityTime(city);
          if (cityTime) {
            response = `The current time in ${city.charAt(0).toUpperCase() + city.slice(1)} is ${cityTime}.`;
          } else {
            response = `I apologize, but I couldn't retrieve the current time for ${city}.`;
          }
        } else {
          response = `I don't have time information for ${city}. I can provide times for major cities like Amsterdam, Berlin, London, Paris, Tokyo, New York, Singapore, and Sydney.`;
        }
      }
      // ... rest of the existing code ...

      // Stop thinking effect and start typing effect
      setIsTyping(false);
      
      // Add bot message with typing effect
      setChatMessages(prev => [...prev, { type: 'bot', text: response, isTyping: true }]);
      
      // Simulate typing completion based on message length (longer messages take more time)
      const typingTime = Math.min(1500, Math.max(800, response.length * 10));
      typingTimeoutRef.current = setTimeout(() => {
        setChatMessages(prev => prev.map((msg, i) => 
          i === prev.length - 1 ? { ...msg, isTyping: false } : msg
        ));
      }, typingTime);
    }, 1500); // Thinking time before starting to type
  };

  const handleQuickResponse = (topic: keyof typeof botResponses) => {
    // Clear any pending timeouts first
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current);
      thinkingTimeoutRef.current = null;
    }
    
    // Create customized user message text based on topic
    let userMessage = "";
    
    switch(topic) {
      case 'about':
        userMessage = "Tell me about you";
        break;
      case 'contact':
        userMessage = "How can I reach you?";
        break;
      default:
        userMessage = `Tell me about your ${topic}`;
    }
    
    // Add user message and immediately start bot response
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage, isTyping: false }]);
    
    // Ensure UI updates before continuing
    setTimeout(() => {
      // Show thinking effect
      setIsTyping(true);
      
      // Simulate thinking delay before responding
      thinkingTimeoutRef.current = setTimeout(() => {
        // Stop thinking effect
        setIsTyping(false);
        
        // Add bot message with typing effect
        setChatMessages(prev => [...prev, { type: 'bot', text: botResponses[topic], isTyping: true }]);
        
        // Simulate typing completion for bot response
        const typingTime = Math.min(2000, Math.max(1000, botResponses[topic].length * 8));
        typingTimeoutRef.current = setTimeout(() => {
          setChatMessages(prev => prev.map((msg, i) => 
            i === prev.length - 1 ? { ...msg, isTyping: false } : msg
          ));
        }, typingTime);
      }, 1000); // Slightly shorter thinking time to improve responsiveness
    }, 100);
  };

  // Reset chat function
  const resetChat = () => {
    // Clear any pending timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current);
      thinkingTimeoutRef.current = null;
    }

    // Reset chat immediately
    setChatMessages([
      { type: 'bot', text: "Hello there! 👋 Feel free to browse my projects or reach out for collaborations", isTyping: true }
    ]);
    setChatInput('');
    setIsTyping(false);
    
    // Mark initial message as finished typing after a delay
    typingTimeoutRef.current = setTimeout(() => {
      setChatMessages(prev => [
        { ...prev[0], isTyping: false }
      ]);
    }, 1500);
  };

  const router = useRouter();
  
  const navigateTo = (path: string) => {
    window.open(path, '_blank');
  };

  // ... rest of the existing code ...

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-4"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 0112 21a9 9 0 01-7.747-4.646 9 9 0 011.353-9.428l-.707-.707M14 11a5 5 0 00-7.547.756c-.712.712-.712 1.888 0 2.6s1.888.712 2.6 0C10.81 12.186 12 13 13.438 13h.124c.516 0 .99.207 1.33.55l3.205 3.205a1 1 0 01-1.414 1.414l-3.205-3.205a1.007 1.007 0 01-.55-.55l-.168-.168M14 11a5 5 0 007.547-.756c.712-.712.712-1.888 0-2.6s-1.888-.712-2.6 0c-.712.712-.712 1.888 0 2.6s1.888.712 2.6 0c.712-.712.712-1.888 0-2.6s-1.888-.712-2.6 0z" />
                </svg>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-4"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Putra Dinantio</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <button 
              onClick={() => setActiveSection('chat')}
              className={`py-2 px-4 ${activeSection === 'chat' ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            >
              Chat
            </button>
            <button 
              onClick={() => setActiveSection('projects')}
              className={`py-2 px-4 ${activeSection === 'projects' ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            >
              Projects
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow p-4 md:p-8">
        {activeSection === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Chat</h2>
            
            <div className="relative">
              <div className="absolute inset-0 z-0">
                <PixelAnimation />
              </div>
              <div className="relative z-10">
                <div className="space-y-4">
                  {chatMessages.map((message, i) => (
                    <div key={i} className="flex">
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-gray-200 dark:bg-gray-800 rounded-br-none' 
                          : 'bg-gray-100 dark:bg-gray-950 rounded-bl-none'
                      }`}>
                        {message.isTyping ? (
                          <TypewriterEffect 
                            text={message.text} 
                            speed={20} 
                            onComplete={() => {
                              // Update the message to mark typing as complete
                              setChatMessages(prev => prev.map((msg, idx) => 
                                idx === i ? { ...msg, isTyping: false } : msg
                              ));
                            }}
                          />
                        ) : (
                          <div>
                            {message.text.split('\n').map((line, j) => {
                              // Convert URLs in text to clickable links
                              if (line.includes('http') || line.includes('www') || 
                                  line.includes('github.com') || line.includes('linkedin.com')) {
                                const parts = line.split(/(\bhttps?:\/\/\S+|\bwww\.\S+|\bgithub\.com\/\S+|\blinkedin\.com\/\S+)/g);
                                return (
                                  <p key={j} className={j > 0 ? 'mt-2' : ''}>
                                    {parts.map((part, k) => {
                                      if (part.match(/^https?:\/\//i) || 
                                          part.match(/^www\./i) ||
                                          part.match(/^github\.com/i) || 
                                          part.match(/^linkedin\.com/i)) {
                                        const url = part.startsWith('http') ? part : `https://${part}`;
                                        return (
                                          <a 
                                            key={k}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                          >
                                            {part}
                                          </a>
                                        );
                                      }
                                      return part;
                                    })}
                                  </p>
                                );
                              }
                              return (
                            <p key={j} className={j > 0 ? 'mt-2' : ''}>
                              {line}
                            </p>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="mr-auto max-w-[75%]">
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-900 rounded-bl-none">
                        <div className="flex items-center gap-3">
                          <div className="text-gray-500 dark:text-gray-400">
                            <span className="font-medium">Thinking</span>
                            <div className="typing-dots inline-flex ml-1">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                
                {/* Chat input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex space-x-2">
                    <form onSubmit={handleChatSubmit} className="flex space-x-2 flex-1">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed font-[Inter,system-ui]"
                        disabled={isInteractionDisabled}
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-gray-900 dark:bg-white dark:text-black text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isInteractionDisabled || !chatInput.trim()}
                      >
                        Send
                      </button>
                    </form>
                    <button 
                      onClick={resetChat}
                      className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition text-gray-600 dark:text-gray-400"
                      aria-label="Reset chat"
                      title="Reset chat"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <div 
                  key={project.id} 
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition cursor-pointer shake-on-hover"
                  onClick={() => navigateTo(project.link)}
                >
                  <h3 className="text-lg font-semibold mb-3 font-[Inter,system-ui]">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 font-[Inter,system-ui]">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-900 rounded font-[Inter,system-ui]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button 
                    className="inline-flex items-center text-sm font-medium px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition font-[Inter,system-ui]"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo(project.link);
                    }}
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400 font-[Inter,system-ui]">
          Made with ❤️ by Putra Dinantio
        </div>
      </footer>
    </div>
  );
}