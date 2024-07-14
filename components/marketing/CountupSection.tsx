import React from "react";
import { FadeIn } from "./FadeIn";
import CountupComponent from "./Countup";

export default function CountupSection() {
  return (
    <div>
      <FadeIn className="flex w-full justify-around p-32">
        <div className="my-3">
          <span className="text-7xl font-extrabold text-sky-400">
            <CountupComponent endNumber={155} />
          </span>
          <span className=" font-bold">Members</span>
        </div>
        <div className="my-3">
          <span className="text-7xl font-extrabold text-sky-400">
            <CountupComponent endNumber={61} />
          </span>
          <span className=" font-bold">Colleges</span>
        </div>
        <div className="my-3">
          <span className="text-7xl font-extrabold text-sky-400">
            <CountupComponent endNumber={36} />
          </span>
          <span className=" font-bold">Companies</span>
        </div>
      </FadeIn>
    </div>
  );
}
