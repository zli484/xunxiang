import Image from "next/image";

import ny_meetup from "@/public/img/group-photos/ny-meetup.jpeg";

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

export default function OurStory() {
  return (
    <div className="bg-white">
      <div className="flex">
        <div className="w-1/2 p-12">
          <Image className="bg-gray-50" src={ny_meetup} alt="" />
        </div>
        <div className="w-1/2 p-12">
          <div>
            <p className="text-base font-semibold leading-7 text-indigo-600">
              我们的故事
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              为留学生们更好的未来
            </h1>
            <p className="mt-6 text-md leading-8 text-gray-700">
              我们是一群正在或者曾经在美国本科留学的学生，我们和万千留学生一样，感受过对于未来的迷茫和求职找工作的压力。既对未来充满期待，想在这个世界中做一名弄潮儿，却又不知道该从哪条路径从校园走向这个社会。
            </p>
            <p className="mt-6 text-md leading-8 text-gray-700">
              在2018年，在我们结束了自己的秋招之后，我们成立了【寻向】这个平台，希望成为一个始终和留学生们站在一起的公益性组织，用我们的力量，让之后的每一届留学生拥有更多有价值的信息和资源，了解到不同职业的精彩之处，更容易地找到能够给自己指引的前辈。让我们的学弟学妹们少一些迷茫，多一份坚定。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
