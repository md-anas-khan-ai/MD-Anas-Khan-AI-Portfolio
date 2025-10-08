import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Projects } from '@/components/Projects';

export default function ProjectsPage() {
  return (
    <div>
      <Navbar />
      <main className="container-responsive py-24">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}


