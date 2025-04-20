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
  }
];

// Predefined responses for chatbot
const botResponses = {
  about: "Hi, I'm Putra Dinantio Nugroho, a Data Science enthusiast with a background in Political Science from the University of Indonesia. I am passionate about leveraging data-driven insights to influence decision-making across sectors such as governance, technology, and business. With experience in data visualization, Python programming, and machine learning, I am constantly looking for opportunities to apply my analytical skills to real-world problems.",
  skills: "Technical Skills:\n\n• Programming: Python, SQL, Django\n\n• Data Visualization: Tableau, Excel\n\n• Web Development: HTML, CSS\n\n• Tools: PowerPoint, Excel, Tableau\n\n\nSoft Skills:\n\n• Analytical Thinking: Strong research and data analysis skills\n\n• Communication: Experience in presenting technical findings to non-technical audiences\n\n• Teamwork: Effective collaboration in a team environment, particularly in cross-functional projects",
  projects: "I've worked on several projects including:\n• Visualization of Air Pollution in Jakarta\n• E-Library Database Design\n• Customer Churn Prediction\n• Policy Brief on Environmental Awareness\n\nYou can ask me about any of these specific projects!",
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
  
  remote_work: "Remote work has transformed from an occasional perk to a mainstream work arrangement, accelerated by technological advances and the COVID-19 pandemic. Benefits include flexibility, reduced commuting time, potential productivity increases, and global talent access. Challenges include maintaining company culture, collaboration difficulties, work-life balance issues, and digital fatigue. The future workplace will likely be hybrid, combining remote work flexibility with intentional in-person collaboration."
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

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { type: 'bot', text: "Hello! I'm Ditto. How can I help you today? ^_^", isTyping: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSection, setActiveSection] = useState('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Add reference for setTimeout IDs
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const thinkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    thinkingTimeoutRef.current = setTimeout(() => {
      let response = "I'm not sure how to respond to that. Try asking about my skills, projects, education, or how to contact me.";
      
      // Check for keywords in the user message
      const lowerMessage = userMessage.toLowerCase();
      
      // Check for Bahasa Indonesia queries first
      const isBahasaGreeting = bahasaGreetings.some(greeting => lowerMessage.includes(greeting));
      const isBahasaQuestion = bahasaQuestionWords.some(word => lowerMessage.includes(word));
      const isBahasaQuery = isBahasaGreeting || isBahasaQuestion || 
                            lowerMessage.includes("indonesia") || 
                            lowerMessage.includes("bahasa");
      
      if (isBahasaGreeting && !lowerMessage.includes("english") && !lowerMessage.includes("inggris")) {
        // Respond to Bahasa greetings
        const greetingResponses = [
          "Halo! Ada yang bisa saya bantu?",
          "Hai! Senang bertemu dengan Anda. Apa yang ingin Anda ketahui?",
          "Selamat datang! Bagaimana saya bisa membantu Anda hari ini?"
        ];
        response = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
      } 
      // Indonesian responses
      else if (isBahasaQuery && lowerMessage.includes("tentang") || lowerMessage.includes("siapa kamu")) {
        response = bahasaResponses.tentang;
      } else if (lowerMessage.includes("keahlian") || lowerMessage.includes("bisa apa")) {
        response = bahasaResponses.keahlian;
      } else if (lowerMessage.includes("proyek") || lowerMessage.includes("karya")) {
        response = bahasaResponses.proyek;
      } else if (lowerMessage.includes("pendidikan") || lowerMessage.includes("kuliah") || lowerMessage.includes("sekolah")) {
        response = bahasaResponses.pendidikan;
      } else if (lowerMessage.includes("kontak") || lowerMessage.includes("hubungi") || lowerMessage.includes("email")) {
        response = bahasaResponses.kontak;
      } else if (lowerMessage.includes("terima kasih") || lowerMessage.includes("makasih")) {
        response = "Sama-sama! Senang bisa membantu Anda.";
      } else if (lowerMessage.includes("jakarta") && (lowerMessage.includes("ibukota") || lowerMessage.includes("ibu kota"))) {
        response = "Jakarta adalah ibu kota Indonesia dan merupakan kota metropolitan terbesar di Asia Tenggara.";
      } else if (lowerMessage.includes("indonesia") && lowerMessage.includes("merdeka")) {
        response = "Indonesia memproklamasikan kemerdekaannya pada tanggal 17 Agustus 1945.";
      } else if (lowerMessage.includes("fakta") && lowerMessage.includes("indonesia")) {
        response = bahasaResponses.fakta_indonesia;
      } else if (lowerMessage.includes("lelucon") || lowerMessage.includes("lucu") || lowerMessage.includes("joke")) {
        response = bahasaResponses.lelucon;
      } else if (lowerMessage.includes("makanan") && lowerMessage.includes("favorit")) {
        response = bahasaResponses.makanan_favorit;
      } else if ((lowerMessage.includes("kopi") || lowerMessage.includes("teh")) && lowerMessage.includes("atau")) {
        response = bahasaResponses.kopi_atau_teh;
      } else if (lowerMessage.includes("akhir pekan") || lowerMessage.includes("weekend")) {
        response = bahasaResponses.akhir_pekan;
      } else if (lowerMessage.includes("presiden pertama") || lowerMessage.includes("soekarno")) {
        response = "Soekarno adalah presiden pertama Indonesia dan salah satu proklamator kemerdekaan! Beliau adalah pemimpin yang karismatik dan visioner dalam perjuangan kemerdekaan Indonesia. 🇮🇩";
      } else if (lowerMessage.includes("bhineka tunggal ika") || lowerMessage.includes("bhinneka")) {
        response = "Bhineka Tunggal Ika artinya 'Berbeda-beda tetapi tetap satu jua'. Ini adalah semboyan nasional Indonesia yang mencerminkan keberagaman budaya, bahasa, agama, dan etnis yang disatukan dalam identitas nasional Indonesia. Moto ini berasal dari kakawin Sutasoma karya Mpu Tantular dari abad ke-14. 🦅";
      } else if (lowerMessage.includes("jadi developer") || lowerMessage.includes("menjadi programmer")) {
        response = "Cara jadi developer? Konsistensi adalah kuncinya! \n\n1. Bangun pagi\n2. Siapkan kopi/teh\n3. Belajar coding (Python sangat bagus untuk data science!)\n4. Kerjakan project nyata\n5. Bergabung dengan komunitas\n6. Ulangi setiap hari! ☕💻";
      } else if ((lowerMessage.includes("ai") && lowerMessage.includes("ml")) || 
                (lowerMessage.includes("artificial") && lowerMessage.includes("machine"))) {
        if (lowerMessage.includes("bahasa") || lowerMessage.includes("indonesia")) {
          response = bahasaResponses.ai_vs_ml_id;
        } else {
          response = botResponses.ai_vs_ml;
        }
      } else if (lowerMessage.includes("blockchain")) {
        if (lowerMessage.includes("bahasa") || lowerMessage.includes("indonesia")) {
          response = bahasaResponses.blockchain_id;
        } else {
          response = botResponses.blockchain;
        }
      } 
      // Handle math questions with a simple explanation instead of calculations
      else if (lowerMessage.match(/what is|calculate|compute|solve|math|plus|minus|times|multiply|divide|divided by|addition|subtraction|multiplication|division|sqrt|square root|area|perimeter|circumference|equation|formula/i)) {
        response = "Mohon maaf, saya belum dapat melakukan perhitungan matematika dengan baik. Sebaiknya gunakan kalkulator atau aplikasi khusus matematika untuk perhitungan yang akurat.";
      } 
      // English responses for general queries
      else if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('tell me about yourself')) {
        response = botResponses.about;
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('what can you do')) {
        response = botResponses.skills;
      } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
        response = botResponses.projects;
      } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
        response = botResponses.education;
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
        response = botResponses.contact;
      } 
      // Project-specific responses
      else if (lowerMessage.includes('pollution') || lowerMessage.includes('air') || lowerMessage.includes('jakarta')) {
        response = "My Air Pollution analysis project visualizes pollution data in Jakarta to support environmental policy decisions.";
      } else if (lowerMessage.includes('titanic') || lowerMessage.includes('survival')) {
        response = "My Titanic Survival Prediction project applies machine learning algorithms to predict passenger survival based on factors like age, gender, and class using the Kaggle dataset.";
      } else if (lowerMessage.includes('jual') || lowerMessage.includes('mobil') || lowerMessage.includes('car')) {
        response = "The Jual Cepat Mobil Bekas project focuses on creating a relational database for a used car marketplace with an efficient database schema for filtering cars based on various attributes.";
      } else if (lowerMessage.includes('churn') || lowerMessage.includes('customer')) {
        response = "My Customer Churn Prediction project uses Logistic Regression to analyze telecom customer data and identify factors leading to customer attrition.";
      } else if (lowerMessage.includes('library') || lowerMessage.includes('e-library')) {
        response = "My E-Library Database project designs a relational database model with an entity relationship diagram (ERD) to efficiently organize and access digital library resources.";
      } else if (lowerMessage.includes('youth') || lowerMessage.includes('environmental') || lowerMessage.includes('awareness')) {
        response = "My Policy Brief analyzes how social media platforms can be leveraged to strengthen environmental awareness among Jakarta's youth population.";  
      } 
      // Basic greetings
      else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = "Hello! I'm Putra Dinantio's personal assistant. How can I help you today?";
      } 
      // Fun queries
      else if (lowerMessage.includes('joke')) {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "Why was the math book sad? Because it had too many problems.",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
          "What did one wall say to the other wall? I'll meet you at the corner!",
          "Why don't scientists trust atoms? Because they make up everything!",
          "How does a penguin build its house? Igloos it together!",
          "Why couldn't the bicycle stand up by itself? It was two tired!",
          "Why do we tell actors to 'break a leg?' Because every play has a cast!"
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
      } 
      // Tech trends and knowledge
      else if (lowerMessage.includes('tech') && lowerMessage.includes('trend')) {
        response = botResponses.tech_trends;
      } else if ((lowerMessage.includes('quantum') && lowerMessage.includes('comput')) || 
               (lowerMessage.includes('explain') && lowerMessage.includes('quantum'))) {
        response = botResponses.quantum_computing;
      } else if ((lowerMessage.includes('http') && lowerMessage.includes('https')) || 
               (lowerMessage.includes('difference') && lowerMessage.includes('http'))) {
        response = botResponses.http_vs_https;
      } else if (lowerMessage.includes('neural') && lowerMessage.includes('network')) {
        response = botResponses.neural_networks;
      } 
      // Nature and science
      else if (lowerMessage.includes('northern') && lowerMessage.includes('light')) {
        response = botResponses.northern_lights;
      } else if ((lowerMessage.includes('moon') && lowerMessage.includes('land')) || 
               (lowerMessage.includes('countries') && lowerMessage.includes('moon'))) {
        response = botResponses.moon_landings;
      } else if (lowerMessage.includes('most') && lowerMessage.includes('language')) {
        response = botResponses.world_language;
      } else if (lowerMessage.includes('sun') && (lowerMessage.includes('core') || lowerMessage.includes('hot'))) {
        response = botResponses.sun_core;
      } else if (lowerMessage.includes('smallest') && lowerMessage.includes('country')) {
        response = botResponses.smallest_country;
      } 
      // Fun personality questions
      else if (lowerMessage.includes('spirit') && lowerMessage.includes('animal')) {
        response = botResponses.spirit_animal;
      } else if ((lowerMessage.includes('coffee') || lowerMessage.includes('tea')) && lowerMessage.includes('or')) {
        response = botResponses.coffee_or_tea;
      } else if (lowerMessage.includes('fun') && lowerMessage.includes('fact')) {
        response = botResponses.fun_fact;
      } else if (lowerMessage.includes('sing') || (lowerMessage.includes('favorite') && lowerMessage.includes('song'))) {
        response = botResponses.favorite_song;
      } else if (lowerMessage.includes('favorite') && lowerMessage.includes('meme')) {
        response = botResponses.favorite_meme;
      } 
      // Games and interactive
      else if (lowerMessage.includes('rock') && lowerMessage.includes('paper') && lowerMessage.includes('scissors')) {
        response = botResponses.rock_paper_scissors;
      } else if (lowerMessage.includes('guess') && lowerMessage.includes('number')) {
        response = botResponses.guess_number;
      } else if (lowerMessage.includes('random') && lowerMessage.includes('quote')) {
        response = botResponses.random_quote;
      } 
      // Navigation and help
      else if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
        response = botResponses.help_with;
      } else if (lowerMessage.includes('navigate') || lowerMessage.includes('use this site')) {
        response = botResponses.navigate_site;
      } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('what should i')) {
        response = botResponses.recommend_section;
      } 
      // Time and date
      else if (lowerMessage.includes('leap') && lowerMessage.includes('year')) {
        response = botResponses.leap_year;
      } else if (lowerMessage.includes('tokyo') && lowerMessage.includes('time')) {
        response = botResponses.time_tokyo;
      } else if (lowerMessage.includes('phone') || lowerMessage.includes('telephone')) {
        response = "The telephone was invented by Alexander Graham Bell, who patented his invention in 1876.";
      } else if (lowerMessage.includes('indonesia') && lowerMessage.includes('independent')) {
        response = "Indonesia proclaimed its independence on August 17, 1945.";
      } else if (lowerMessage.includes('capital') && lowerMessage.includes('japan')) {
        response = "The capital of Japan is Tokyo.";
      } else if (lowerMessage.includes('nile')) {
        response = "The Nile River is about 6,650 kilometers long and is considered the longest river in the world.";
      } else if (lowerMessage.includes('planet') && lowerMessage.includes('largest')) {
        response = "The largest planet in our solar system is Jupiter.";
      } 
      // Easter eggs
      else if (lowerMessage.includes('video') && lowerMessage.includes('game')) {
        response = botResponses.video_games;
      } else if (lowerMessage.includes('beam me up') || lowerMessage.includes('scotty')) {
        response = botResponses.beam_me_up;
      } else if (lowerMessage.includes('meaning') && lowerMessage.includes('life')) {
        response = botResponses.meaning_of_life;
      } 
      // Time and date
      else if (lowerMessage.includes('time') && !lowerMessage.includes('times')) {
        const now = new Date();
        response = `The current time is ${now.toLocaleTimeString()}.`;
      } else if (lowerMessage.includes('date') || lowerMessage.includes('today')) {
        const now = new Date();
        response = `Today's date is ${now.toLocaleDateString()}.`;
      } else if (lowerMessage.includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        response = `Tomorrow's date will be ${tomorrow.toLocaleDateString()}.`;
      } else if (lowerMessage.includes('weather')) {
        response = "I'm sorry, I don't have access to real-time weather data. You can check a weather app or website for current conditions.";
      } else if (lowerMessage.includes('thank')) {
        response = "You're welcome! Feel free to ask if you have any other questions.";
      } else if (lowerMessage.includes('name')) {
        response = "My name is Ditto, I'm Putra Dinantio's personal assistant.";
      } else if (lowerMessage.includes('old') || lowerMessage.includes('age')) {
        response = "I'm a digital assistant, so I don't have an age in the traditional sense. I was created recently!";
      } else if (lowerMessage.includes('color') || lowerMessage.includes('favourite')) {
        response = "If I had to choose a favorite color, it would probably be purple - like my Ditto form!";
      } else if (lowerMessage.includes('music') || lowerMessage.includes('song')) {
        response = "I don't listen to music, but I'd love to know what kind of music you enjoy!";
      }

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
    
    // Create the user message text
    const userMessage = `Tell me about your ${topic}`;
    
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
        setChatMessages(currentMessages => [...currentMessages, { type: 'bot', text: botResponses[topic], isTyping: true }]);
        
        // Simulate typing completion for bot response
        const typingTime = Math.min(2000, Math.max(1000, botResponses[topic].length * 8));
        typingTimeoutRef.current = setTimeout(() => {
          setChatMessages(currentMessages => currentMessages.map((msg, i) => 
            i === currentMessages.length - 1 ? { ...msg, isTyping: false } : msg
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
      { type: 'bot', text: "Hello! I'm Ditto. How can I help you today? ^_^", isTyping: true }
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

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white font-[system-ui]">
      {/* Header with profile */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-3 md:mb-0">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image
                src="/images/profile.jpg" 
                alt="Putra Dinantio" 
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-xl">Putra Dinantio</h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Data and Public Policy Enthusiast</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <a 
              href="https://drive.google.com/drive/u/0/folders/1VDoTZRxnbobzqWEdm0jGaYKbMgUEFcbS" 
              className="text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center space-x-1 md:space-x-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </a>
            <a
              href="https://github.com/dinanditio" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center space-x-1 md:space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-1.5 md:p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button 
              className="md:hidden border border-gray-300 dark:border-gray-700 p-1.5 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex space-x-8">
            <button 
              className={`py-3 md:py-4 border-b-2 ${activeSection === 'chat' ? 'border-black dark:border-white font-medium' : 'border-transparent text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveSection('chat')}
            >
              Chat
            </button>
            <button 
              className={`py-3 md:py-4 border-b-2 ${activeSection === 'projects' ? 'border-black dark:border-white font-medium' : 'border-transparent text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveSection('projects')}
            >
              Projects
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-2 flex flex-col space-y-2">
              <button 
                className={`py-2 ${activeSection === 'chat' ? 'font-medium' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => {
                  setActiveSection('chat');
                  setIsMobileMenuOpen(false);
                }}
              >
                Chat
              </button>
              <button 
                className={`py-2 ${activeSection === 'projects' ? 'font-medium' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => {
                  setActiveSection('projects');
                  setIsMobileMenuOpen(false);
                }}
              >
                Projects
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {activeSection === 'chat' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-8 text-center">Ask me anything</h2>
              
              {/* Chat container */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                {/* Chat messages */}
                <div className="h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                  {chatMessages.map((message, i) => (
                    <div 
                      key={i} 
                      className={`mb-4 ${message.type === 'user' ? 'ml-auto max-w-[75%]' : 'mr-auto max-w-[75%]'}`}
                    >
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
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-950 rounded-bl-none">
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
              
              {/* Quick responses */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => handleQuickResponse('about')}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed font-[Inter,system-ui]"
                    disabled={isInteractionDisabled}
                  >
                    About Me
                  </button>
                  <button 
                    onClick={() => handleQuickResponse('skills')}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed font-[Inter,system-ui]"
                    disabled={isInteractionDisabled}
                  >
                    Skills
                  </button>
                  <button 
                    onClick={() => handleQuickResponse('projects')}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed font-[Inter,system-ui]"
                    disabled={isInteractionDisabled}
                  >
                    Projects
                  </button>
                  <button 
                    onClick={() => handleQuickResponse('education')}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed font-[Inter,system-ui]"
                    disabled={isInteractionDisabled}
                  >
                    Education
                  </button>
                  <button 
                    onClick={() => handleQuickResponse('contact')}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed font-[Inter,system-ui]" 
                    disabled={isInteractionDisabled}
                  >
                    Contact
                  </button>
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