// app/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import InvitationSection from '@/components/sections/InvitationSection';
import ProgramGuideSection from '@/components/sections/ProgramGuideSection';
import CeremonyDetailsSection from '@/components/sections/CeremonyDetailsSection';
import ForumDetailsSection from '@/components/sections/ForumDetailsSection';
import SessionDetailsSection from '@/components/sections/SessionDetailsSection';
import LocationSection from '@/components/sections/LocationSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <InvitationSection />
        <ProgramGuideSection />
        <CeremonyDetailsSection />
        <ForumDetailsSection />
        <SessionDetailsSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}