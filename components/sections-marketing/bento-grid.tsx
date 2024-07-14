import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/ace/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { FadeIn } from "../marketing/FadeIn";
import { Container } from "../marketing/Container";
import { SectionIntro } from "../marketing/SectionIntro";

import chatSvg from "@/images/illustrations/chat.svg";
import coffeeChatSvg from "@/images/illustrations/coffee_chat.svg";
import resourceSvg from "@/images/illustrations/resource.svg";
import referralSvg from "@/images/illustrations/referral.svg";
import directorySvg from "@/images/illustrations/directory.svg";
import travelSvg from "@/images/illustrations/travel.svg";
import mentorshipSvg from "@/images/illustrations/mentorship.svg";

import Image from "next/image";

export function BentoGridDemo() {
  return (
    <div className=" space-y-12">
      <SectionIntro title="社群" className="mt-24 sm:mt-32 lg:mt-40">
        <p>
          我们为社群成员提供了一系列的社交和资源分享服务，帮助成员们更好地认识彼此，建立联系，分享资源，找到合适的合作伙伴，提升职业发展。
        </p>
      </SectionIntro>

      {/* <Container className="">
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider sm:text-left">
            以成员社交和资源分享为核心的社群服务
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
      </Container> */}
      <FadeIn>
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </FadeIn>
    </div>
  );
}
const Skeleton = ({ svg }: { svg: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <Image src={svg} alt="Chat" />
  </div>
);
const items = [
  {
    title: "社交助手",
    description: "根据成员的背景和需求，帮助成员们认识彼此，建立联系",
    header: <Skeleton svg={chatSvg} />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "内推平台",
    description:
      "帮助成员们发布和找到合适的内推机会，根据AI进行机会和成员之间的匹配推荐",
    header: <Skeleton svg={referralSvg} />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "活动与旅行搭子",
    description: "根据成员的偏好和计划，帮助成员找到合适的线下活动及旅行的同伴",
    header: <Skeleton svg={travelSvg} />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "资源整合",
    description: "聚焦年轻人工作生活中最关注的话题领域，提供独家的资源和分享",
    header: <Skeleton svg={resourceSvg} />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "成员资料库",
    description: "基于AI的辅助搜索，快速找到你想要认识的人",
    header: <Skeleton svg={directorySvg} />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "项目聚焦",
    description: "宣传和推广成员的项目，帮助成员找到合适的合作伙伴",
    header: <Skeleton svg={coffeeChatSvg} />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Mentorship项目",
    description: "为成员提供专业的导师服务，帮助成员职业发展",
    header: <Skeleton svg={mentorshipSvg} />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
];
