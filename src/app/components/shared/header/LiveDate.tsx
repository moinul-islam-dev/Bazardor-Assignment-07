"use client";

import { useEffect, useState } from "react";

const LiveDate = () => {
  const [banglaDate, setBanglaDate] = useState<string>("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const currentDate = new Date().toLocaleDateString("bn-BD", options);

    setBanglaDate(currentDate);
  }, []);

  return (
    <span className="text-sm text-slate-800 font-medium mt-0.5">
      {banglaDate || "লোড হচ্ছে..."}
    </span>
  );
};

export default LiveDate;
