
import AboutOurServices from "./components/pages/homepage/aboutOurServices";
import HeroSection from "./components/pages/homepage/heroSection";
import Reviews from "./components/pages/homepage/reviews";
import ServicesSection from "./components/pages/homepage/services";
import TeamSection from "./components/pages/homepage/teams";
import {TrendingProducts} from "./components/pages/homepage/trending";
import Info from "./components/pages/homepage/info";
export default function Home() {
  return (
    <>
      <HeroSection/>
      <ServicesSection />
      <AboutOurServices />
      <TrendingProducts />
      <Reviews />
      <Info />
      <TeamSection />
    </>
  );
}
