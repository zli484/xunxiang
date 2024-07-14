"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../ui/ace/layout-grid";

export function PhotoGallary() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">视觉形象更新</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        视觉形象更新
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">成员Meetup - 旧金山</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        成员Meetup - 旧金山
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">成员Meetup - 纽约</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        成员Meetup - 纽约
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">2021新年poster</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        2021新年poster
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://glmmjhfzmzyxpvzgrtzk.supabase.co/storage/v1/object/public/xunxiang-pics/logo_update.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://glmmjhfzmzyxpvzgrtzk.supabase.co/storage/v1/object/public/xunxiang-pics/sf_meetup.JPG",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://glmmjhfzmzyxpvzgrtzk.supabase.co/storage/v1/object/public/xunxiang-pics/xunxiang_ny_meetup.jpeg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://glmmjhfzmzyxpvzgrtzk.supabase.co/storage/v1/object/public/xunxiang-pics/2021_new_year.png",
  },
];
