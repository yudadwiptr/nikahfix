import React, { useState } from 'react';

const GiftCard = ({ bankName, accountNumber, accountHolder }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#181818] rounded-lg p-4 transform transition-all duration-300 hover:scale-[1.02] hover:bg-[#222222] group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-medium mb-1">{bankName}</h3>
          <p className="text-[#A3A1A1] text-sm mb-2">{accountNumber}</p>
          <p className="text-white text-sm">a.n {accountHolder}</p>
        </div>
        <button
          onClick={handleCopy}
          className="bg-[#333333] text-white px-3 py-1.5 rounded-lg hover:bg-[#E50913] transition-colors duration-300 text-sm flex items-center gap-2 group-hover:bg-[#E50913]"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default function GiftSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg leading-5 text-white font-bold">Wedding Gift</h2>
        <div className="text-xs bg-[#E50913] text-white px-2 py-1 rounded-full">Optional</div>
      </div>

      <div className="space-y-4 mb-6">
        <GiftCard
          bankName="Bank Mandiri"
          accountNumber="1550010888447"
          accountHolder="IRIANTO PETRUS"
        />
        <GiftCard
          bankName="BCA"
          accountNumber="1510457184"
          accountHolder="DEWI PUTRI SIAGIAN"
        />
      </div>

      <div className="bg-[#181818] rounded-lg p-4 text-center">
        <h3 className="text-white font-medium mb-4">Gift Wishlist</h3>
        <a
          href="https://giftlist.com/lists/BrZAClwJGu1CuTRhjHiK"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#E50913] text-white px-6 py-3 rounded-lg hover:bg-[#cc0812] transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zm2 7h4a2 2 0 002-2v-5h-6v7z" />
          </svg>
          View Wishlist
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
}