// // import Hero from "../home-new/hero";
// import Feature from "../home-new/feature";
// import SubFeature from "../home-new/sub-feature";
// import CompanyLogos from "../sections/logos-companies";
// import SchoolLogos from "../sections/logos-schools";
// import Carousel from "../home-new/carousel";
// import LaraIntro from "../home-new/lara-intro";
// import { Hero } from "../sections-marketing/hero";
// import { BentoGridDemo } from "../sections-marketing/bento-grid";
// import { LampDemo } from "../sections-marketing/lamp-text";
// import { Globe } from "../ui/ace/globe";
// import { GlobeDemo } from "../sections-marketing/globe";
// import { FlipWordsDemo } from "../sections-marketing/flip-words";
// import OurMembers from "../sections-marketing/our-members";

// export default function HomeScreenNew() {
//   return (
//     <>
//       <div className="space-y-12">
//         {/* <Hero /> */}
//         {/* <LampDemo /> */}
//         <Hero />
//         <BentoGridDemo />
//         <OurMembers />
//         <div className="flex">
//           <div className="w-1/2">
//             <CompanyLogos />
//           </div>
//           <div className="w-1/2">
//             <SchoolLogos />
//           </div>
//         </div>

//       </div>
//       <GlobeDemo />
//     </>
//   );
// }

import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ContactSection } from "@/components/marketing/ContactSection";
import { Container } from "@/components/marketing/Container";
import { FadeIn, FadeInStagger } from "@/components/marketing/FadeIn";
import { List, ListItem } from "@/components/marketing/List";
import { SectionIntro } from "@/components/marketing/SectionIntro";
import { StylizedImage } from "@/components/marketing/StylizedImage";
import { Testimonial } from "@/components/marketing/Testimonial";
import logoBrightPath from "@/images/clients/bright-path/logo-light.svg";
import logoFamilyFund from "@/images/clients/family-fund/logo-light.svg";
import logoGreenLife from "@/images/clients/green-life/logo-light.svg";
import logoHomeWork from "@/images/clients/home-work/logo-light.svg";
import logoMailSmirk from "@/images/clients/mail-smirk/logo-light.svg";
import logoNorthAdventures from "@/images/clients/north-adventures/logo-light.svg";
import logoPhobiaDark from "@/images/clients/phobia/logo-dark.svg";
import logoPhobiaLight from "@/images/clients/phobia/logo-light.svg";
import logoUnseal from "@/images/clients/unseal/logo-light.svg";
import imageLaptop from "@/images/laptop.jpg";
import { type CaseStudy, type MDXEntry, loadCaseStudies } from "@/lib/mdx";
import { FlipWords } from "../ui/ace/flip-words";
import { BentoGridDemo } from "../sections-marketing/bento-grid";
import CountupComponent from "../marketing/Countup";

import { PhotoGallary } from "../sections-marketing/photos-gallary";

import testimonials_user_1 from "@/public/img/testimonials/profile_avatars/belinda_hu_profile.jpeg";
import testimonials_user_2 from "@/public/img/testimonials/profile_avatars/karen_zheng_profile.jpeg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import mainBg from "@/public/img/mainbg.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountupSection from "../marketing/CountupSection";
import CompanyLogos from "../sections/logos-companies";

const clients = [
  ["Phobia", logoPhobiaLight],
  ["Family Fund", logoFamilyFund],
  ["Unseal", logoUnseal],
  ["Mail Smirk", logoMailSmirk],
  ["Home Work", logoHomeWork],
  ["Green Life", logoGreenLife],
  ["Bright Path", logoBrightPath],
  ["North Adventures", logoNorthAdventures],
];

const companyURLs = [
  "img/LXS/company/Alibaba.png",
  "img/LXS/company/mainpage/BCG.png",
  "img/LXS/company/ByteDance.png",
  "img/LXS/company/Deloitte.png",
  "img/LXS/company/mainpage/godaddy.png",
  "img/LXS/company/Goldman Sachs.png",
  "img/LXS/company/Google.png",
  "img/LXS/company/Hana.png",
  "img/LXS/company/InterMF.jpg",
  "img/LXS/company/Info.jpg",
  "img/LXS/company/Lyft.png",
  "img/LXS/company/McKinseyCompany.png",
  "img/LXS/company/mainpage/Microsoft.png",
  "img/LXS/company/Milliman.png",
  "img/LXS/company/mainpage/PwC.png",
  "img/LXS/company/Snap.png",
  "img/LXS/company/mainpage/tripadvisor.png",
  "img/LXS/company/Truist.png",
  "img/LXS/company/mainpage/Tuixiang.png",
  "img/LXS/company/mainpage/WIstateInvestmentBoard.png",
  "img/LXS/company/mainpage/Zhenfund.png",
];

const schoolURLs = [
  "img/LXS/school/Barnard.png",
  "img/LXS/school/Bentley.png",
  "img/LXS/school/BC.png",
  "img/LXS/school/BU.png",
  "img/LXS/school/CMU.png",
  "img/LXS/school/CMC.jpg",
  "img/LXS/school/Cornell.png",
  "img/LXS/school/Emerson.png",
  "img/LXS/school/Emory.png",
  "img/LXS/school/HMC.png",
  "img/LXS/school/mainpage/mountHcollege.png",
  "img/LXS/school/NYU.png",
  "img/LXS/school/Northwestern.png",
  "img/LXS/school/Pomona.png",
  "img/LXS/school/TuftsU.jpg",
  "img/LXS/school/Tulane.png",
  "img/LXS/school/UCB.png",
  "img/LXS/school/mainpage/ucsb.jpg",
  "img/LXS/school/UNC.png",
  "img/LXS/school/UChicago.png",
  "img/LXS/school/UGeorgia.png",
  "img/LXS/school/mainpage/iowa.png",
  "img/LXS/school/UMichigan.png",
  "img/LXS/school/UPenn.png",
  "img/LXS/school/USC.png",
  "img/LXS/school/UW-Madison.png",
  "img/LXS/school/Villanova.jpg",
  "img/LXS/school/Wesleyan.png",
];

function Clients() {
  return (
    <div className="rounded-4xl my-24">
      <SectionIntro title="成员" className="mt-24 sm:mt-32 lg:mt-40">
        <p>寻向的成员来自全美各地的大学和公司</p>
      </SectionIntro>
      <Container className="">
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-y-2 lg:grid-cols-10 mx-32"
          >
            {companyURLs.map((url) => (
              <li key={url} className="flex w-full justify-center items-center">
                <FadeIn>
                  <Image
                    width={"50"}
                    height={"50"}
                    src={url}
                    alt={url}
                    unoptimized
                  />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>

        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-1 gap-y-10 lg:grid-cols-10 mx-32"
          >
            {schoolURLs.map((url) => (
              <li key={url} className="flex w-full justify-center items-center">
                <FadeIn>
                  <Image
                    width={"50"}
                    height={"50"}
                    src={url}
                    alt={url}
                    unoptimized
                  />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>;
}) {
  return (
    <>
      <SectionIntro title="愿景" className="mt-24 sm:mt-32 lg:mt-40">
        <p>
          成员到任何一个城市都有一群有趣的人成为朋友 <br />
          做任何一番事业都有志同道合的人成为伙伴
          <br />
          看任何一个领域都有专业懂行的人分享见解
          <br />
          18-35岁，事业生活，绚烂璀璨
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split("-")[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split("-")[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  );
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="We help you identify, explore and respond to new opportunities."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          As long as those opportunities involve giving us money to re-purpose
          old projects — we can come up with an endless number of those.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Web development">
              We specialise in crafting beautiful, high quality marketing pages.
              The rest of the website will be a shell that uses lorem ipsum
              everywhere.
            </ListItem>
            <ListItem title="Application development">
              We have a team of skilled developers who are experts in the latest
              app frameworks, like Angular 1 and Google Web Toolkit.
            </ListItem>
            <ListItem title="E-commerce">
              We are at the forefront of modern e-commerce development. Which
              mainly means adding your logo to the Shopify store template we’ve
              used for the past six years.
            </ListItem>
            <ListItem title="Custom content management">
              At Studio we understand the importance of having a robust and
              customised CMS. That’s why we run all of our client projects out
              of a single, enormous Joomla instance.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
}

export const metadata: Metadata = {
  description:
    "We are a development studio working at the intersection of design and technology.",
};

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3);
  const words = ["co-founder", "best friend", "travel buddy", "mentor"];

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <div className="flex">
          <div>
            <FadeIn className="max-w-3xl">
              <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                Building the best community for Chinese professionals, founders,
                and scholars
              </h1>
              <div className="mt-6 text-xl text-sky-500">
                Find your next <FlipWords words={words} />
              </div>
            </FadeIn>
          </div>
          <div className="px-32">
            <Image src={mainBg} className="main-bg" alt="main bg" />
          </div>
        </div>
        <div>
          <CountupSection />
        </div>
      </Container>

      <Clients />

      <BentoGridDemo />

      <CaseStudies caseStudies={caseStudies} />

      <Carousel className="w-2/3 mx-auto">
        <CarouselContent>
          <CarouselItem key={0}>
            <Testimonial
              className="mt-24 sm:mt-32 lg:mt-40"
              client={{
                name: "Belinda Hu",
                avatarUrl: testimonials_user_1,
                title: "就职于International Monetary Fund 寻向领队",
              }}
            >
              寻向的大家都很暖，寻求帮助的时候大家都会竭尽所能。寻向的大家都很强，各行各业优秀的同学都在向着自己的目标和理想努力。寻向的大家都很会，所有话题都能遇到能侃侃而谈，迸发火花的人。从学长学姐那里获得帮助再进而用自己知道的帮助学弟学妹，我在寻向看到了无私传承。所以，寻向入股不亏！
            </Testimonial>
          </CarouselItem>
          <CarouselItem key={1}>
            <Testimonial
              className="mt-24 sm:mt-32 lg:mt-40"
              client={{
                name: "Phobia",
                avatarUrl: testimonials_user_2,
                title: "就读于University of Pennsylvania 寻向练习生",
              }}
            >
              人生的路总是孤独，但有志同道合的人，不论怎样都会精彩。来到寻向后，我意识到我们并不孤单，也不是一个人在战斗。在寻向，努力认真的学弟学妹激励着我，同龄人的理想激励着我，寻向作为一个互帮互助的团体，不断给予我继续向上的动力。同样，在如此特殊的留学环境下，寻向的存在给予了这个团体中的每一个成员坚持的勇气、成功的信心，以及对美好未来的希望。作为一名领队，我很开心能跟寻向一起成长、一起进步。愿终有一天，寻向的名字可以和埋藏在大家心中的梦想一起，发光发热。
            </Testimonial>
          </CarouselItem>
          <CarouselItem key={2}>
            <Testimonial
              className="mt-24 sm:mt-32 lg:mt-40"
              client={{
                name: "Steven Zhang",
                avatarUrl: "",
                title: "准大一寻向笔记读者",
              }}
            >
              虽然作为一个美高学生一直感觉大学和工作远在天边，毫无头绪。但关注寻向之后感觉改变自己的未来真的近在咫尺，有迹可循。只有寻到正确的方向才能让自己的努力有价值，寻向的文章和学哥学姐们真的通过他们实打实的经历让我少走很多弯路。谢谢寻向，让追梦路上不再迷茫孤单。
            </Testimonial>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <Services /> */}

      <PhotoGallary />

      <ContactSection />
    </>
  );
}
