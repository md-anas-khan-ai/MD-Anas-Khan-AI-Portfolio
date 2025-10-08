"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoResult {
  prediction: string;
  confidence: number;
  explanation: string;
}

export function AIBrainDemos() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [sentimentInput, setSentimentInput] = useState('');
  const [sentimentResult, setSentimentResult] = useState<DemoResult | null>(null);
  const [newsInput, setNewsInput] = useState('');
  const [newsResult, setNewsResult] = useState<DemoResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const analyzeSentiment = async (text: string) => {
    setIsProcessing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple sentiment analysis simulation
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'awesome'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disgusting', 'horrible', 'sad', 'angry', 'disappointed'];
    
    const words = text.toLowerCase().split(' ');
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    let prediction: string;
    let confidence: number;
    let explanation: string;
    
    if (positiveCount > negativeCount) {
      prediction = 'Positive';
      confidence = Math.min(85 + Math.random() * 10, 95);
      explanation = 'The text contains positive sentiment indicators and optimistic language patterns.';
    } else if (negativeCount > positiveCount) {
      prediction = 'Negative';
      confidence = Math.min(85 + Math.random() * 10, 95);
      explanation = 'The text contains negative sentiment indicators and pessimistic language patterns.';
    } else {
      prediction = 'Neutral';
      confidence = Math.min(70 + Math.random() * 15, 85);
      explanation = 'The text shows balanced sentiment with no strong positive or negative indicators.';
    }
    
    setSentimentResult({ prediction, confidence, explanation });
    setIsProcessing(false);
  };

  const detectFakeNews = async (headline: string) => {
    setIsProcessing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple fake news detection simulation
    const fakeIndicators = ['shocking', 'unbelievable', 'you won\'t believe', 'doctors hate', 'one weird trick', 'miracle cure'];
    const realIndicators = ['study shows', 'research indicates', 'according to', 'official report', 'confirmed'];
    
    const lowerHeadline = headline.toLowerCase();
    const fakeCount = fakeIndicators.filter(indicator => lowerHeadline.includes(indicator)).length;
    const realCount = realIndicators.filter(indicator => lowerHeadline.includes(indicator)).length;
    
    let prediction: string;
    let confidence: number;
    let explanation: string;
    
    if (fakeCount > realCount) {
      prediction = 'Likely Fake';
      confidence = Math.min(80 + Math.random() * 15, 95);
      explanation = 'Contains sensational language and clickbait patterns commonly found in fake news.';
    } else if (realCount > fakeCount) {
      prediction = 'Likely True';
      confidence = Math.min(75 + Math.random() * 20, 95);
      explanation = 'Contains factual language and credible source indicators.';
    } else {
      prediction = 'Uncertain';
      confidence = Math.min(60 + Math.random() * 20, 80);
      explanation = 'Mixed signals detected. Further verification recommended.';
    }
    
    setNewsResult({ prediction, confidence, explanation });
    setIsProcessing(false);
  };

  const demos = [
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Analyze emotional tone of text using NLP',
      icon: '🧠',
      color: 'from-cyan to-blue-500'
    },
    {
      id: 'fakenews',
      title: 'Fake News Detection',
      description: 'Identify potentially misleading headlines',
      icon: '📰',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'ats',
      title: 'Resume Screening',
      description: 'AI-powered ATS resume analysis',
      icon: '📄',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold holographic-title mb-4">Anas's AI Brain</h2>
        <p className="text-textMuted max-w-2xl mx-auto">
          Interactive demonstrations of my AI/ML projects. Try them out and see the algorithms in action.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {demos.map((demo) => (
          <motion.div
            key={demo.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveDemo(demo.id)}
            className="glass p-6 cursor-pointer group hover:shadow-glow-strong transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{demo.icon}</div>
              <h3 className="text-xl font-semibold text-cyan mb-2">{demo.title}</h3>
              <p className="text-textMuted text-sm">{demo.description}</p>
              <div className={`mt-4 w-full h-1 bg-gradient-to-r ${demo.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-8 mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-cyan">
                {demos.find(d => d.id === activeDemo)?.title}
              </h3>
              <button
                onClick={() => setActiveDemo(null)}
                className="text-textMuted hover:text-cyan text-2xl"
              >
                ×
              </button>
            </div>

            {activeDemo === 'sentiment' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-cyan font-medium mb-2">
                    Enter text to analyze sentiment:
                  </label>
                  <textarea
                    value={sentimentInput}
                    onChange={(e) => setSentimentInput(e.target.value)}
                    placeholder="Type your text here... e.g., 'I love this amazing product!'"
                    className="w-full h-24 bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight placeholder-textMuted focus:border-cyan focus:shadow-glow resize-none"
                  />
                </div>
                
                <button
                  onClick={() => analyzeSentiment(sentimentInput)}
                  disabled={!sentimentInput.trim() || isProcessing}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Analyzing...' : 'Analyze Sentiment'}
                </button>

                {sentimentResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-surface/30 border border-cyan/30 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-cyan">
                        Prediction: {sentimentResult.prediction}
                      </span>
                      <span className="text-cyan font-mono">
                        {sentimentResult.confidence.toFixed(1)}% confidence
                      </span>
                    </div>
                    <p className="text-textMuted text-sm">{sentimentResult.explanation}</p>
                  </motion.div>
                )}
              </div>
            )}

            {activeDemo === 'fakenews' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-cyan font-medium mb-2">
                    Enter news headline to analyze:
                  </label>
                  <textarea
                    value={newsInput}
                    onChange={(e) => setNewsInput(e.target.value)}
                    placeholder="Paste a news headline here... e.g., 'Scientists discover shocking new treatment'"
                    className="w-full h-24 bg-surface/50 border border-cyan/30 rounded px-3 py-2 text-textLight placeholder-textMuted focus:border-cyan focus:shadow-glow resize-none"
                  />
                </div>
                
                <button
                  onClick={() => detectFakeNews(newsInput)}
                  disabled={!newsInput.trim() || isProcessing}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Analyzing...' : 'Detect Fake News'}
                </button>

                {newsResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-surface/30 border border-cyan/30 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-cyan">
                        Result: {newsResult.prediction}
                      </span>
                      <span className="text-cyan font-mono">
                        {newsResult.confidence.toFixed(1)}% confidence
                      </span>
                    </div>
                    <p className="text-textMuted text-sm">{newsResult.explanation}</p>
                  </motion.div>
                )}
              </div>
            )}

            {activeDemo === 'ats' && (
              <div className="space-y-6">
                <div className="text-center p-8 border-2 border-dashed border-cyan/30 rounded-lg">
                  <div className="text-4xl mb-4">📄</div>
                  <h4 className="text-lg font-semibold text-cyan mb-2">Resume Screening Demo</h4>
                  <p className="text-textMuted mb-4">
                    Drag and drop a resume file or click to upload
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="btn-outline cursor-pointer"
                  >
                    Upload Resume
                  </label>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-surface/30 rounded-lg">
                    <div className="text-2xl font-bold text-cyan">88%</div>
                    <div className="text-sm text-textMuted">Match Score</div>
                  </div>
                  <div className="p-4 bg-surface/30 rounded-lg">
                    <div className="text-2xl font-bold text-cyan">12</div>
                    <div className="text-sm text-textMuted">Skills Found</div>
                  </div>
                  <div className="p-4 bg-surface/30 rounded-lg">
                    <div className="text-2xl font-bold text-cyan">A+</div>
                    <div className="text-sm text-textMuted">ATS Grade</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
