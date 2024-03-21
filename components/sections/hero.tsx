import Image from "next/image";
import mainBg from "@/public/img/mainbg.svg";

export function Hero() {
  return (
    <div className="p-32">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-5/12">
          <h1 className=" text-8xl text-purple-800">寻向，</h1>
          <h2 className="text-2xl font-black mt-4">
            陪伴留学生找到未来的方向。
          </h2>
          <p className="mt-8 text-lg">
            寻向是由北美留学生于2018年发起的
            <b className="font-bold text-purple-600">非营利组织</b>
            ；其目的是通过采访过来人，导师项目，互助社群等形式，帮助留学生了解更多的职业方向和未来发展的可能性，连接在校生和职场人，使知识、经验、资源在留学生中不断传承。
          </p>
        </div>
        <div className="w-1/12"></div>
        <div className="w-full lg:w-6/12">
          <Image src={mainBg} className="main-bg" alt="main bg" />
        </div>
      </div>
    </div>
  );
}
