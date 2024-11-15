import React from 'react';

export default function BreakingNews() {
  return (
    <div>
      <h2 className="font-bold mb-4">Breaking News</h2>
      <img className="w-full rounded-md" height={300} src="images/dummy.png" />
      <div className="text-[#A3A1A1] text-sm italic leading-[1.15rem] mt-2">
        <p className="">
          Halo! Karena kalian adalah orang penting yang mengisi hari-hari kami,
          kami ingin informasikan bahwa kami akan segera menikah! &lt;3
        </p>
        <p className="mt-4">
          Tapi sebelumnya, kami mohon maaf kepada teman dan kerabat semua karena
          tidak bisa mengundang kalian hadir di hari bahagia kami, dikarenakan
          pernikahan kami bersifat intimate wedding yang dilaksanakan di Bekasi
          dan hanya dihadiri oleh keluarga dan orang terdekat.
        </p>
        <p className="mt-4">
          Walaupun begitu, kami harapkan sebaik-baiknya doa untuk kelancaran
          pernikahan dan hari-hari bahagia setelahnya.
        </p>
        <p className="mt-4">Dengan penuh cinta,</p>
        <p className="">The bride and groom &lt;3</p>
      </div>
    </div>
  );
}
