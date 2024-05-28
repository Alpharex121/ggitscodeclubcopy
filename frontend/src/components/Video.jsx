import React from "react";
export default function Video() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 overflow-hidden bg-red-100">
      <h2 className="text-2xl font-bold mb-6">News Videos</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 ">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg cursor-pointer shrink-0 w-[300px]"
          >
            <iframe
              width="400"
              height="315"
              src="https://www.youtube.com/embed/oozXqbNDzBw?si=Xu0EQsgl_YENcblL"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayIcon className="w-12 h-12 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
