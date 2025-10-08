export function About() {
  return (
    <section id="about" className="space-y-6">
      <h2 className="text-2xl font-semibold holographic-title">About</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass p-6">
          <p className="text-textMuted">
            Aspiring software developer pursuing B.Tech in CSE (AI & ML), with strong proficiency in C, C++, and Python. Focused on algorithmic thinking, problem-solving, and writing clean, efficient code. Currently deepening skills in Data Structures to build a strong foundation for impactful development and internship opportunities.
          </p>
        </div>
        <div className="glass p-6">
          <dl className="grid grid-cols-3 text-center">
            <div>
              <dt className="text-textMuted text-sm">Projects</dt>
              <dd className="text-2xl font-bold">3</dd>
            </div>
            <div>
              <dt className="text-textMuted text-sm">Repos</dt>
              <dd className="text-2xl font-bold">12+</dd>
            </div>
            <div>
              <dt className="text-textMuted text-sm">Prediction Acc.</dt>
              <dd className="text-2xl font-bold">82%</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="font-semibold mb-3">Education</h3>
        <ul className="space-y-2 text-textMuted">
          <li>
            <span className="text-surfaceLight">2024 – Present</span> — B.Tech CSE (AI & ML), Netaji Subhash Engineering College
          </li>
          <li>
            <span className="text-surfaceLight">2022 – 2023</span> — Class 12 – CBSE | 73.8% (GGECT St. Xavier’s International School)
          </li>
          <li>
            <span className="text-surfaceLight">2020 – 2021</span> — Class 10 – CBSE | 79.2% (BRL DAV Public School)
          </li>
        </ul>
      </div>
    </section>
  );
}


