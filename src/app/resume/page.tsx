import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ResumeContent } from '@/components/ResumeContent';

export default function ResumePage() {
  return (
    <div>
      <Navbar />
      <main className="container-responsive py-24">
        <ResumeContent />
      </main>
      <Footer />
    </div>
  );
}


