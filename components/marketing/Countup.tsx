"use client";

import CountUp from "react-countup";
import React from "react";

export default function CountupComponent({ endNumber }: { endNumber: number }) {
  return (
    <div>
      <CountUp end={endNumber} />
    </div>
  );
}
