import { Hero } from "../sections/hero";
import BlocksSection from "../sections/blocks";
import Testimonials from "../sections/testimonials";
import CompanyLogos from "../sections/logos-companies";
import SchoolLogos from "../sections/logos-schools";
import WhatWeDid from "../sections/what-we-did";
import OurStory from "../sections/our-story";
import OurPrinciples from "../sections/our-principles";

export default function HomeScreen() {
  return (
    <div className="space-y-12">
      <Hero />
      <BlocksSection />
      <WhatWeDid />
      <Testimonials />
      <CompanyLogos />
      <SchoolLogos />
      <OurStory />
      <OurPrinciples />
    </div>
  );
}
