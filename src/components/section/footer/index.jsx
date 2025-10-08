import React from 'react';

export default function Footer() {
  return (
    <div>
      <div className="mt-8 flex flex-col  items-center">
        <p className="text-white text-base">
          We appreciate your time and wishes.
        </p>
        <p className="text-white text-base">Can't wait to see you again at our celebration! &lt;3</p>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <p className="text-[15px] text-[#A3A1A1] mb-6">
          E-Invitation made by{' '}
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/yudadwiptr/"
          >
            Yuma Studio
          </a>
           <p className="text-[#A3A1A1] text-base">© 2025 | ALL RIGHTS RESERVED</p>
        </p>
      </div>
    </div>
  );
}
