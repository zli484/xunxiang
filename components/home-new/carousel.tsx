import Image from "next/image";
import usecase_friends from "@/public/img/landing/usecaseIllustrations/Friends.png";
import usecase_networks from "@/public/img/landing/usecaseIllustrations/Networks.png";
import usecase_mentors from "@/public/img/landing/usecaseIllustrations/Mentors.png";
import usecase_hobbies from "@/public/img/landing/usecaseIllustrations/Hobbies.png";
import usecase_questions from "@/public/img/landing/usecaseIllustrations/Questions.png";

export default function Carousel() {
  return (
    <div>
      <p className="font-outfit my-4 text-4xl font-bold tracking-tight text-gray-900 ">
        Finding the right people can be hard...
      </p>
      <div className="carousel carousel-end rounded-box space-x-10">
        <div className="carousel-item">
          <div className="card w-72 bg-amber-200">
            <div className="card-body">
              <div className="flex justify-center">
                <Image
                  src={usecase_friends}
                  width={200}
                  height={200}
                  alt="usecase_friends"
                />
              </div>
              <p className="font-outfit mt-2 text-xl font-bold tracking-tight text-gray-900">
                ✈️ Finding new friends after moving
              </p>
              <p className="font-outfit mt-2 text-md tracking-tight text-gray-900">
                &#34;Hi Lara, I just moved to Chicago and hope to find people
                working in finance who love visiting museums&#34;{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-72 bg-rose-100 ">
            <div className="card-body">
              <div className="flex justify-center">
                <Image
                  src={usecase_networks}
                  width={200}
                  height={200}
                  alt="usecase_networks"
                />
              </div>
              <p className="font-outfit mt-2 text-xl font-bold tracking-tight text-gray-900">
                ️️️💼 ️️️ Expanding your professional network
              </p>
              <p className="font-outfit mt-2 text-md tracking-tight text-gray-900">
                &#34;Hi Lara, I am a product manager at Google and I am looking
                for people who are interested in the future of work&#34;{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-72 bg-emerald-100">
            <div className="card-body">
              <div className="flex justify-center">
                <Image
                  src={usecase_mentors}
                  width={50}
                  layout="responsive"
                  alt="usecase_mentors"
                />
              </div>
              <p className="font-outfit mt-2 text-xl font-bold tracking-tight text-gray-900">
                ✨ Finding a mentor or coach
              </p>
              <p className="font-outfit mt-2 text-md tracking-tight text-gray-900">
                &#34;Hi Lara, I am a software engineer at a self-driving car
                company focusing on perception. Can you connect me with seniors
                in the same industry who are 3-5 years ahead of me&#34;
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-72 bg-sky-100">
            <div className="card-body">
              <div className="flex justify-center">
                <Image
                  src={usecase_hobbies}
                  width={200}
                  height={200}
                  layout="responsive"
                  alt="usecase_hobbies"
                />
              </div>
              <p className="font-outfit mt-2 text-xl font-bold tracking-tight text-gray-900">
                ♟ Looking for hobby buddies
              </p>
              <p className="font-outfit mt-2 text-md tracking-tight text-gray-900">
                &#34; Hi Lara, I am a super fan of Marvel movies and I hope to
                find other fans to watch the latest movie together&#34;
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card w-72 bg-sky-100">
            <div className="card-body">
              <div className="flex justify-center max-h-32">
                <Image
                  src={usecase_questions}
                  width={173}
                  height={156}
                  layout="responsive"
                  alt="usecase_questions"
                />
              </div>
              <p className="font-outfit mt-2 text-xl font-bold tracking-tight text-gray-900">
                🌎️ And more... You name it
              </p>
              <p className="font-outfit mt-2 text-md tracking-tight text-gray-900">
                You can find anyone you want to connect with. Start exploring
                new possibility by chatting with Lara!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
