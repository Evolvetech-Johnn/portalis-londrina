import Hero from '../components/Hero.jsx';
import ProblemSection from '../components/ProblemSection.jsx';
import SolutionSection from '../components/SolutionSection.jsx';
import SocialProof from '../components/SocialProof.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import LeadForm from '../components/LeadForm.jsx';
import FAQ from '../components/FAQ.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <SocialProof />
      <HowItWorks />
      <LeadForm />
      <FAQ />
    </>
  );
}
