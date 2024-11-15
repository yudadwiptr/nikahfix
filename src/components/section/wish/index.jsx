import React from 'react';

const WishItem = () => (
  <div className="flex gap-2">
    <div>
      <img
        width={24}
        height={24}
        src="images/face.png"
        className="bg-[#48cae4] rounded-sm"
      />
    </div>
    <div>
      <p className="text-white text-md -mt-1">Mark Zuckerberg</p>
      <p className="text-xs text-[#A3A1A1]">
        Happy wedding, semoga bersama sampai menua mas dan mbanyaa🥰🤍
      </p>
    </div>
  </div>
);

export default function WishSection() {
  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-5">
        Wish for the couple
      </h2>
      <div className="h-[20rem] overflow-auto space-y-4">
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('submit');
        }}
        className="mt-4 space-y-4"
      >
        <div className="space-y-1">
          <label>Name</label>
          <input className="w-full focus:outline-none px-2 py-1 text-black" />
        </div>
        <div className="space-y-1">
          <label>Message</label>
          <textarea
            className="w-full focus:outline-none px-2 py-1 text-black"
            rows={4}
          ></textarea>
        </div>
        <button className="w-full py-2 bg-white text-black rounded-sm">
          Send
        </button>
      </form>
    </div>
  );
}
