// BlocksSection.tsx
import Image from "next/image";
import Link from "next/link";
import ProgramSmallCard from "../atoms/program-small-card";

export function BlocksSection() {
  return (
    <div className="mt-5 p-16" id="blocks">
      {" "}
      {/* Adjusted padding-top using Tailwind's spacing scale */}
      <h2 className="my-5 text-gray-600">我们的五大板块</h2>{" "}
      {/* Example color class */}
      {/* Card 1 */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ProgramSmallCard
          name="寻向笔记"
          description="记录与讲述留学生梦想与选择的笔记本"
          image="/img/notebook.svg"
          link="/notes"
        />
        <ProgramSmallCard
          name="寻向练习生"
          description="帮助留学生成长与进阶的Mentorship"
          image="/img/LXS/maskedperson.svg"
          link="/lianxisheng"
        />
        <ProgramSmallCard
          name="寻向行业"
          description="围绕行业的职业发展交流社区"
          image="/img/layers.svg"
          link="/"
        />
      </div>
    </div>
  );
}

export default BlocksSection;
