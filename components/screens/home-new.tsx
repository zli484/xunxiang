"use client";

import Hero from "../home-new/hero";
import Feature from "../home-new/feature";
import SubFeature from "../home-new/sub-feature";
import CompanyLogos from "../sections/logos-companies";
import SchoolLogos from "../sections/logos-schools";
import Carousel from "../home-new/carousel";
import LaraIntro from "../home-new/lara-intro";

export default function HomeScreenNew() {
  return (
    <div className="space-y-12">
      <Hero />
      <div className="mx-24">
        <Carousel />
        <Feature />
        <LaraIntro />
        <SubFeature />
        <CompanyLogos />
        <SchoolLogos />
      </div>
    </div>
  );
}
