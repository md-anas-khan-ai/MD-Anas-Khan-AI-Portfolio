"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeData {
  [key: string]: {
    title: string;
    sections: string[];
    emphasis: string[];
  };
}

const resumeTemplates: ResumeData = {
  hr: {
    title: "HR-Focused Resume",
    sections: [
      "Strong communication and team collaboration skills",
      "Problem-solving abilities demonstrated through AI/ML projects",
      "Self-motivated learner with continuous skill development",
      "Academic excellence with consistent performance",
      "Open to internships and entry-level opportunities"
    ],
    emphasis: ["Soft Skills", "Communication", "Teamwork", "Learning Agility"]
  },
  developer: {
    title: "Developer-Focused Resume",
    sections: [
      "Proficient in Python, C++, and C with strong algorithmic thinking",
      "AI/ML expertise: Scikit-learn, Pandas, OpenCV, Deep Learning",
      "Web development: Flask, React, Next.js, HTML/CSS, JavaScript",
      "Version control: Git, GitHub with 12+ repositories",
      "Project portfolio: 13+ projects including chatbots, prediction systems"
    ],
    emphasis: ["Technical Skills", "Programming Languages", "Frameworks", "Projects"]
  },
  recruiter: {
    title: "Recruiter-Focused Resume",
    sections: [
      "B.Tech CSE (AI & ML) student at Netaji Subhash Engineering College",
      "Strong academic foundation with 73.8% in Class 12, 79.2% in Class 10",
      "AI/ML specialization with practical project experience",
      "Open to internships in software development and AI/ML roles",
      "Demonstrated ability to deliver projects with measurable outcomes"
    ],
    emphasis: ["Education", "Academic Performance", "Specialization", "Career Goals"]
  }
};

export function SmartResumeGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [generatedResume, setGeneratedResume] = useState<any>(null);

  const generateResume = () => {
    if (!selectedRole) return;
    
    const template = resumeTemplates[selectedRole as keyof ResumeData];
    if (template) {
      setGeneratedResume(template);
    }
  };

  const downloadResume = () => {
    if (!generatedResume) return;
    
    const resumeContent = `
MD ANAS KHAN - ${generatedResume.title}
=====================================

CONTACT INFORMATION
Email: md.anaskhan.aiml@gmail.com
LinkedIn: linkedin.com/in/md-anas-khan-ai
GitHub: github.com/md-anas-khan-ai

EDUCATION
2024 – Present: B.Tech CSE (AI & ML), Netaji Subhash Engineering College
2022 – 2023: Class 12 – CBSE | 73.8% (GGECT St. Xavier's International School)
2020 – 2021: Class 10 – CBSE | 79.2% (BRL DAV Public School)

KEY HIGHLIGHTS
${generatedResume.sections.map((section: string) => `• ${section}`).join('\n')}

TECHNICAL SKILLS
Languages: C, C++, Python
AI/ML: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, OpenCV
Web Development: Flask, React, Next.js, HTML, CSS, JavaScript
Tools: Git, GitHub, VS Code

PROJECTS
• AI Chatbot for College Queries (2024) - Python, NLP, Flask
• Stock Price Prediction System (2023-2024) - 82% accuracy
• AI Resume Screening System (2024) - 88% match accuracy
• Fake News Detection (2024) - 93% classification accuracy

EMPHASIS AREAS
${generatedResume.emphasis.join(' • ')}
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MD_Anas_Khan_${selectedRole}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="btn-outline"
      >
        Generate Smart Resume
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="glass p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-textMuted hover:text-cyan text-2xl"
              >
                ×
              </button>

              <h3 className="text-2xl font-bold text-cyan mb-6">Smart Resume Generator</h3>

              {!generatedResume ? (
                <div className="space-y-6">
                  <p className="text-textMuted">
                    Select your role to generate a targeted resume that highlights the most relevant aspects of Anas's profile.
                  </p>

                  <div className="grid gap-4">
                    {Object.entries(resumeTemplates).map(([key, template]) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedRole(key)}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          selectedRole === key
                            ? 'border-cyan bg-cyan/10 shadow-glow'
                            : 'border-borderMuted hover:border-cyan/50'
                        }`}
                      >
                        <h4 className="text-lg font-semibold text-cyan">{template.title}</h4>
                        <p className="text-textMuted text-sm mt-1">
                          Emphasizes: {template.emphasis.join(', ')}
                        </p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={generateResume}
                      disabled={!selectedRole}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate Resume
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-cyan">{generatedResume.title}</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={downloadResume}
                        className="btn-primary"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => setGeneratedResume(null)}
                        className="btn-outline"
                      >
                        Back
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-lg font-semibold text-cyan mb-2">Key Highlights</h5>
                      <ul className="space-y-2">
                        {generatedResume.sections.map((section: string, index: number) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-textMuted flex items-start"
                          >
                            <span className="text-cyan mr-2">•</span>
                            {section}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-cyan mb-2">Emphasis Areas</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.emphasis.map((area: string, index: number) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-1 bg-cyan/20 border border-cyan/30 rounded-full text-cyan text-sm"
                          >
                            {area}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
