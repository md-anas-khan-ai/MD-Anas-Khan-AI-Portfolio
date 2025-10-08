import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/Contact';

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main className="container-responsive py-24">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


