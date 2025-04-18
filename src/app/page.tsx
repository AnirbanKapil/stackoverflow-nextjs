import Image from "next/image";

import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";


export default function Home() {
  return (
    <>
     <div>
      <HeroSection />
      <LatestQuestions />
     </div>
    </>
  );
}
