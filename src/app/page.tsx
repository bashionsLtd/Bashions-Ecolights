import HeroSection from "./components/pages/homepage/heroSection";
import Reviews from "./components/pages/homepage/reviews";
import ServicesSection from "./components/pages/homepage/services";
import TeamSection from "./components/pages/homepage/teams";
import TrendingProducts from "./components/pages/homepage/trending";
export default function Home() {
  return (
    <>
      <HeroSection/>
      <TrendingProducts />
      <Reviews />
      <ServicesSection />
      <TeamSection />
    </>
  );
}
