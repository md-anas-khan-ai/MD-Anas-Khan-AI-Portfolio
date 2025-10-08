export type ProjectCategory =
  | 'AI/ML'
  | 'Web Dev'
  | 'Academic'
  | 'Personal'
  | 'Cognitive'
  | 'Predictive'
  | 'Vision'
  | 'Generative'
  | 'Smart';

export type ProjectItem = {
  id: number;
  title: string;
  year: string;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  outcomes?: string[];
  github?: string;
  liveDemo?: string;
  image?: string;
};

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'AI Chatbot for College Queries',
    year: '2024 – Present',
    category: 'AI/ML',
    description:
      'Built an AI-powered chatbot using Python + NLP to answer student FAQs. Served via Flask web app. Trained on real student Q&A data to improve accuracy and response time.',
    technologies: ['Python', 'NLP', 'Flask', 'HTML/CSS'],
  },
  {
    id: 2,
    title: 'Stock Price Prediction System',
    year: '2023 – 2024',
    category: 'AI/ML',
    description:
      'Created ML model using Scikit-learn, Pandas, NumPy for stock predictions with regression and data visualization. Achieved 82% accuracy.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    id: 3,
    title: 'Portfolio Website Development',
    year: '2023 – 2024',
    category: 'Web Dev',
    description:
      'Designed and deployed a personal portfolio using HTML/CSS/JS. Responsive UI, hosted on GitHub Pages with version control via Git.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
  },
  {
    id: 4,
    title: 'AI Resume Screening System (ATS Clone)',
    year: '2024',
    category: 'AI/ML',
    description:
      'Developed an NLP-powered resume screening model that matches candidate profiles with job descriptions using BERT embeddings.',
    technologies: ['Python', 'NLP', 'Transformers', 'Flask'],
    outcomes: ['Reduced manual screening time by 70%', 'Achieved 88% match accuracy'],
    github: 'https://github.com/md-anas-khan-ai/ai-resume-screening',
  },
  {
    id: 5,
    title: 'Fake News Detection using Machine Learning',
    year: '2024',
    category: 'AI/ML',
    description:
      'Built a text classification model to detect fake news articles using TF-IDF and Logistic Regression.',
    technologies: ['Python', 'Scikit-learn', 'NLP', 'Streamlit'],
    outcomes: ['Reached 93% classification accuracy'],
    github: 'https://github.com/md-anas-khan-ai/fake-news-detection',
  },
  {
    id: 6,
    title: 'Smart Attendance System (Face Recognition)',
    year: '2024',
    category: 'AI/ML',
    description:
      'Implemented a face recognition attendance system using OpenCV and deep learning models for automatic logging.',
    technologies: ['Python', 'OpenCV', 'Deep Learning', 'Tkinter'],
    outcomes: ['Automated attendance marking with 96% accuracy'],
  },
  {
    id: 7,
    title: 'Hybrid Movie Recommendation System',
    year: '2023',
    category: 'AI/ML',
    description:
      'Combined collaborative and content-based filtering using cosine similarity and user behavior data.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Flask'],
    outcomes: ['Improved recommendation relevance by 30%'],
  },
  {
    id: 8,
    title: 'AI Chat Assistant for Students (RAG-based)',
    year: '2024',
    category: 'AI/ML',
    description:
      'Built a Retrieval-Augmented Generation chatbot that answers academic queries from syllabus documents.',
    technologies: ['LangChain', 'OpenAI API', 'Pinecone', 'Next.js'],
    outcomes: ['Improved query accuracy by 45%'],
  },
  {
    id: 9,
    title: 'Health Disease Prediction Dashboard',
    year: '2023',
    category: 'AI/ML',
    description:
      'Created a web dashboard for predicting diseases like diabetes and heart disease using ML classification models.',
    technologies: ['Python', 'Flask', 'Matplotlib', 'HTML/CSS'],
    outcomes: ['Achieved 85% accuracy', 'Visualized real-time prediction results'],
  },
  {
    id: 10,
    title: 'AI-powered Code Review Assistant',
    year: '2024',
    category: 'AI/ML',
    description:
      'Developed an AI assistant that reviews Python code and suggests improvements using LLM-based analysis.',
    technologies: ['OpenAI API', 'FastAPI', 'Next.js'],
    outcomes: ['Detected 70% of common coding issues automatically'],
  },
  {
    id: 11,
    title: 'Real-Time Object Detection & Tracking',
    year: '2023',
    category: 'AI/ML',
    description:
      'Integrated YOLOv8 and OpenCV to detect and track multiple objects in live video streams.',
    technologies: ['Python', 'YOLOv8', 'OpenCV', 'DeepSort'],
    outcomes: ['Enabled real-time tracking at 30 FPS'],
  },
  {
    id: 12,
    title: 'Email Spam Classification System',
    year: '2023',
    category: 'AI/ML',
    description:
      'Implemented a Naive Bayes classifier for spam detection using NLP preprocessing and feature engineering.',
    technologies: ['Python', 'Scikit-learn', 'NLP'],
    outcomes: ['Achieved 95% precision in spam detection'],
  },
  {
    id: 13,
    title: 'AI-powered Personal Finance Tracker',
    year: '2024',
    category: 'AI/ML',
    description:
      'Developed a budget tracking tool enhanced with AI insights for expense prediction and visualization.',
    technologies: ['React', 'Next.js', 'TensorFlow.js'],
    outcomes: ['Improved monthly expense prediction by 22%'],
  },
  {
    id: 14,
    title: 'AI Waste Sorting System',
    year: '2024',
    category: 'Vision',
    description:
      'Computer vision model that classifies waste into categories (recyclable, organic, metal, plastic) to enable automated sorting on conveyor belts.',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'YOLOv8'],
    outcomes: ['Achieved 92% F1 across 4 classes', 'Realtime inference at 25 FPS'],
    github: '',
    liveDemo: '',
    
  },
];



