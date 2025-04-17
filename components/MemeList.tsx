'use client';

import { useEffect, useState } from "react";
import { loadMemes } from "@/lib/data";
import { Card, Button, Modal } from "@heroui/react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import styles from './styles.module.css';
import { useSearchParams } from "next/navigation";
import { useMemes } from "@/lib/MemeContext";
import { IoCloseOutline } from "react-icons/io5";
import { Meme } from "@/types/meme";



export default function MemeList() {
  const { memes, updateMeme } = useMemes();

  const [imageSizes, setImageSizes] = useState<Record<string, { width: number; height: number }>>({});
  const searchParams = useSearchParams();
  const [filtered, setFiltered] = useState(memes);
  const [open,setOpen] = useState(false);
  const [selectedMeme , setSelectedMeme] = useState<Meme | null>(null);
  useEffect(() => {
    memes.forEach((meme:Meme) => {
      const img = new window.Image();
      img.src = meme.imageUrl;
      img.onload = () => {
        setImageSizes((prev) => ({
          ...prev,
          [meme.id]: { width: img.width, height: img.height },
        }));
      };
    });
  }, [memes]);
  useEffect(() => {
    const search = searchParams.get('search')?.toLowerCase() || '';
    const filteredMemes = memes.filter((meme:Meme) =>
      meme.title.toLowerCase().includes(search)
    );
    console.log(search)
    console.log(filteredMemes)
    setFiltered(filteredMemes);
    if(selectedMeme) {
      const foundMeme = filteredMemes.find((meme:Meme) => meme.id === selectedMeme.id);
      setSelectedMeme(foundMeme || null);
    }
  }, [searchParams, memes]);

  return (
    <div
      style={{ columnGap: "40px", rowGap: "20px" }}
      className="flex flex-wrap w-full sm:px-[200px] px-0 justify-center"
    >
      {filtered.length > 0 ? filtered.map((meme:Meme) => 
      {
        const size = imageSizes[meme.id];
        return(
          <div key={meme.id} onClick={() => {
            setSelectedMeme(meme);
            setOpen(true);
          }}>

        <Card   className="p-4 w-[300px] shadow-xs hover:scale-105 transform transition-all delay-100 ease-in">
          <h1 className="text-[25px] font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">{meme.title}</h1>
         <div className="flex flex-col justify-between">
         {size ? (
              <Image
                src={meme.imageUrl}
                alt={meme.title}
                width={Math.min(size.width, 250)}
                height={(Math.min(size.width, 250) / size.width) * size.height}
                className="object-cover rounded hover:cursor-pointer"
                unoptimized
              />
            ) : (
              <div className="w-[250px] h-[150px] bg-gray-200 animate-pulse" />
            )}
            <div onClick={() => {
            if (meme.liked) {
              updateMeme({ ...meme, liked: false, likes: meme.likes - 1 })
            }else{
              updateMeme({ ...meme, liked: true, likes: meme.likes + 1 })
            }
          }} className={`${styles.liked}  mt-3 flex gap-[6px] items-center hover:cursor-pointer hover:text-[#DB0000] ${meme.liked ? "text-[#DB0000]" : ""} active:text-red-500`}>
          <span
            className={`p-2 rounded-full transition-all ${styles.like}`}
          >
              {meme.liked ? <FaHeart fontSize={20} onClick={() => {}} /> : <FaRegHeart onClick={() => {}} fontSize={20}  />}
           </span>
            <span className="h-[20px] text-[16px] font-semibold">{meme.likes}</span>
          </div>
          </div> 

          
        </Card>
          </div>
      )}) : (
        <h1 className="text-[25px] w-full text-center font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">No memes found</h1>
      )}
      <Modal isOpen={open} onClose={() => setOpen(false)} >
  <div className="fixed inset-0 z-[9998] backdrop-blur-md flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl z-[9999] relative">
      {selectedMeme && (
        <>       
        <div className="flex justify-between">
        <h2 className={` text-xl font-semibold mb-4`}>{selectedMeme.title}</h2>
        <IoCloseOutline className="hover:cursor-pointer" size={20} onClick={() => {setOpen(false); setSelectedMeme(null);}} />
        </div>
        <Image src={selectedMeme.imageUrl}
        alt={selectedMeme.title}
        width={Math.min(imageSizes[selectedMeme.id].width, 250)}
        height={(Math.min(imageSizes[selectedMeme.id].width, 250) / imageSizes[selectedMeme.id].width) * imageSizes[selectedMeme.id].height}
        className="object-cover rounded hover:cursor-pointer mx-auto"
        unoptimized />
        <div onClick={() => {
            if (selectedMeme.liked) {
              updateMeme({ ...selectedMeme, liked: false, likes: selectedMeme.likes - 1 })
            }else{
              updateMeme({ ...selectedMeme, liked: true, likes: selectedMeme.likes + 1 })
            }
          }} className={`${styles.liked}  mt-3 flex gap-[6px] items-center hover:cursor-pointer hover:text-[#DB0000] ${selectedMeme.liked ? "text-[#DB0000]" : ""} active:text-red-500`}>
          <span
            className={`p-2 rounded-full transition-all ${styles.like}`}
          >
              {selectedMeme.liked ? <FaHeart fontSize={20} onClick={() => {}} /> : <FaRegHeart onClick={() => {}} fontSize={20}  />}
           </span>
            <span className="h-[20px] text-[16px] font-semibold">{selectedMeme.likes}</span>
          </div>
        </>
      )}
    </div>
  </div>
</Modal>
    </div>
  );
}