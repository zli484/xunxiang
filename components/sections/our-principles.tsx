import Image from "next/image";
import Principle from "../atoms/principle";

import ny_meetup from "@/public/img/group-photos/ny-meetup.jpeg";

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

export default function OurPrinciples() {
  return (
    <div className="bg-white p-6">
      <div className="mt-5">
        <div className="flex m-6 justify-evenly mt-4">
          <Principle
            title="公益"
            description="公益是寻向的出发点。我们的目标并非商业利润，而是致力于打造一个把帮助留学生的未来发展作为核心使命的组织。我们的愿景是以公益的形式帮助留学生群体的求职和未来发展，让留学生群体能够获得更多优质的资源，信息与帮助。"
            image="/img/heart.png"
          />
          <Principle
            title="多元"
            description="寻向拒绝对成功的单一定义，努力想要为留学生展示关于未来的无数种可能性。在这里，不同人生阶段和方向领域的寻向人分享自己的知识见解，道路选择。他们的讲述帮助后来人找到方向，他们的故事给予后来人选择的勇气。"
            image="/img/diversity.png"
          />
          <Principle
            title="传承"
            description="寻向连接在校生和在职的前辈，让信息和经验能跨越校园和职场的界限，自由地流动。同时，在校生受到帮助，找到方向并且成功进入职场后，再将同样的帮助传递给自己的学弟学妹，让信息和经验在留学生中不断传承。"
            image="/img/passon.png"
          />
        </div>

        <div className="flex justify-evenly">
          <Principle
            title="分享"
            description="分享是寻向的DNA。无论是干货，资源，经验，还是想法，思考，心路历程，在这里都是最被期待的声音；无论你是刚拿到第一份实习的学弟学妹，还是驰骋职场江湖多年的留学前辈，寻向都期待着你的分享。"
            image="/img/solidarity.png"
          />

          <Principle
            title="团结"
            description="寻向根植于留学生这个群体，我们认为留学一路有不少的艰辛坎坷，唯有团结互助，才能让这个群体在拥有更好的未来。寻向想要做一股绳，将校园中,职场中的中国人团结在一起, 发挥更大的能量。"
            image="/img/share.png"
          />
        </div>
      </div>
    </div>
  );
}
