import skills from '@/data/skills.json';

export function ResumeContent() {
  const langGroup = skills.groups.find((g: any) => g.title.toLowerCase().includes('language'));
  const frontend = skills.groups.find((g: any) => g.title.toLowerCase().includes('frontend'));
  const backend = skills.groups.find((g: any) => g.title.toLowerCase().includes('backend'));
  const aiml = skills.groups.find((g: any) => g.title.toLowerCase() === 'ai/ml');
  const llm = skills.groups.find((g: any) => g.title.toLowerCase().includes('llms'));
  const dataCloud = skills.groups.find((g: any) => g.title.toLowerCase().includes('data'));
  const tooling = skills.groups.find((g: any) => g.title.toLowerCase().includes('tooling'));
  const soft = skills.groups.find((g: any) => g.title.toLowerCase().includes('soft'));

  return (
    <section className="prose prose-invert max-w-none glass p-6">
      <h1>MD ANAS KHAN</h1>
      <p>B.Tech CSE (AI & ML) Student | Aspiring Software Developer</p>
      <p>
        Email: <a href="mailto:md.anaskhan.aiml@gmail.com">md.anaskhan.aiml@gmail.com</a> · Phone: +91 9142861355
        <br />
        LinkedIn: <a href="https://linkedin.com/in/md-anas-khan-ai">linkedin.com/in/md-anas-khan-ai</a> · GitHub: <a href="https://github.com/md-anas-khan-ai">github.com/md-anas-khan-ai</a>
      </p>
      <h2>Summary</h2>
      <p>
        Aspiring software developer focused on algorithmic thinking and clean code. Building practical AI/ML projects with Python and modern tooling.
      </p>
      <h2>Education</h2>
      <ul>
        <li>2024 – Present — B.Tech CSE (AI & ML), Netaji Subhash Engineering College</li>
        <li>2022 – 2023 — Class 12 – CBSE | 73.8% (GGECT St. Xavier’s International School)</li>
        <li>2020 – 2021 — Class 10 – CBSE | 79.2% (BRL DAV Public School)</li>
      </ul>
      <h2>Skills</h2>
      <ul>
        {langGroup && (<li>Languages: {langGroup.items.join(', ')}</li>)}
        {frontend && (<li>Frontend: {frontend.items.join(', ')}</li>)}
        {backend && (<li>Backend & APIs: {backend.items.join(', ')}</li>)}
        {aiml && (<li>AI/ML: {aiml.items.join(', ')}</li>)}
        {llm && (<li>LLMs & RAG: {llm.items.join(', ')}</li>)}
        {dataCloud && (<li>Data & Cloud: {dataCloud.items.join(', ')}</li>)}
        {tooling && (<li>Tooling & Design: {tooling.items.join(', ')}</li>)}
        {soft && (<li>Soft Skills: {soft.items.join(', ')}</li>)}
      </ul>
      <h2>Projects</h2>
      <ul>
        <li>AI Chatbot for College Queries (2024 – Present) – Python + NLP; Flask web app</li>
        <li>Stock Price Prediction System (2023 – 2024) – Regression with Scikit-learn; 82% accuracy</li>
        <li>Portfolio Website Development (2023 – 2024) – Responsive site hosted on GitHub Pages</li>
      </ul>
      <h2>Contact</h2>
      <ul>
        <li>Email: md.anaskhan.aiml@gmail.com</li>
        <li>LinkedIn: linkedin.com/in/md-anas-khan-ai</li>
        <li>GitHub: github.com/md-anas-khan-ai</li>
      </ul>
    </section>
  );
}


