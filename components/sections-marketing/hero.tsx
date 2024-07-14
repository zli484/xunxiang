import Image from "next/image";
import mainBg from "@/public/img/mainbg.svg";
import { FlipWords } from "../ui/ace/flip-words";

const words = ["co-founder", "best friend", "travel buddy", "mentor"];

export function Hero() {
  return (
    <div className="flex p-16">
      <div className="w-2/3">
        <h1 className=" text-8xl">寻向，</h1>
        <h2 className="text-2xl font-black mt-4">
          Building the best community for Chinese young professionals, founders,
          and scholars
        </h2>
        <p className=" text-sm mt-8 text-lg">
          寻向旨在为留学毕业生建立一个以分享互助，共同成长为主旨的社群。
          在这里，成员可以轻松高效地了解信息，获取资源，结识朋友，拓展人脉。
        </p>
        <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          At here, find your next
          <FlipWords words={words} /> <br />
        </div>
      </div>
      <div className="w-1/3 m-12">
        <Image src={mainBg} className="main-bg" alt="main bg" />
      </div>
    </div>
  );
}
