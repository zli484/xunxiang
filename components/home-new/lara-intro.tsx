import Image from "next/image";

import landing_step_1 from "@/public/img/landing/howDoesItWork/step1-min.gif";
import landing_step_2 from "@/public/img/landing/howDoesItWork/step2.png";
import landing_step_3 from "@/public/img/landing/howDoesItWork/step3-min.gif";
import landing_step_4 from "@/public/img/landing/howDoesItWork/step4.png";

export default function LaraIntro() {
  return (
    <div>
      <p className="font-outfit my-4 text-4xl font-bold tracking-tight text-gray-900 ">
        How does it work?
      </p>
      <div className="flex flex-col mt-16 space-y-16 lg:space-y-32">
        <div className="flex-col lg:flex-row lg:flex justify-start lg:items-center space-y-6">
          <div className="flex flex-col w-full lg:w-1/3">
            <p className="font-outfit mt-2 lg:text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Chat with Lara
            </p>
            <p className="font-outfit mt-2 lg:text-lg tracking-tight text-gray-900 sm:text-4xl">
              Just like a friend chatting, she gets to know you better and
              understands who you may want to meet
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <Image src={landing_step_1} width={1000} height={1000} alt="lara" />
          </div>
        </div>
        <div className="flex-col lg:flex-row-reverse lg:flex justify-start lg:items-center space-y-6">
          <div className="flex flex-col w-full lg:w-1/3">
            <p className="font-outfit mt-2 lg:text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See who she finds
            </p>
            {/* Introductions that is warm and humane */}
            <p className="font-outfit mt-2 lg:text-lg tracking-tight text-gray-900 sm:text-4xl">
              Based on what she knows about you, she seaches through entire user
              base and finds the people who she believes you should meet
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <Image src={landing_step_2} width={1000} height={1000} alt="lara" />
          </div>
        </div>
        <div className="flex-col lg:flex-row lg:flex justify-start space-y-6">
          <div className="flex flex-col w-full lg:w-1/3">
            <p className="font-outfit mt-2 lg:text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get introduced
            </p>
            <p className="font-outfit mt-2 lg:text-lg tracking-tight text-gray-900 sm:text-4xl">
              Lara helps you to draft the outreach message, makes the mutual
              introducions and recommend places to meet in-person or set up a
              video call if virtually
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <Image src={landing_step_3} width={1000} height={1000} alt="lara" />
          </div>
        </div>
        <div className="flex-col lg:flex-row-reverse lg:flex justify-start lg:items-center space-y-6">
          <div className="flex flex-col w-full lg:w-1/3">
            <p className="font-outfit mt-2 lg:text-lg font-bold tracking-tight text-rose-300 sm:text-4xl">
              Coming soon
            </p>
            <p className="font-outfit mt-2 lg:text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet people by doing things in-person
            </p>
            <p className="font-outfit mt-2 lg:text-lg tracking-tight text-gray-900 sm:text-4xl">
              Lara helps you find the best venue or events to go to so that you
              can meet new people by doing things you already loved
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <Image src={landing_step_4} width={1000} height={1000} alt="lara" />
          </div>
        </div>
      </div>
      <div className="m-20"></div>
    </div>
  );
}
