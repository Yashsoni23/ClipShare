import React from "react";

export default function Button({
  onClick,
  title,
}: {
  onClick?: () => void;
  title: string;
}) {
  return (
    <button
      className="text-white w-full p-[.2rem]  sm:p-[1vw] rounded-[.5vw] max-sm:text-md max-sm:rounded-md sm:text-[1.3vw] duration-300 transition-all hover:bg-[#2759CE]/80  bg-[#2759CE]"
      type="button"
      onClick={() => onClick && onClick()}
    >
      {title}
    </button>
  );
}
