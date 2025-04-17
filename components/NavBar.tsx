'use client';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FaTable } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { Roboto_Mono } from 'next/font/google';
import { FaPlus } from "react-icons/fa";
import { Button, getKeyValue, Input, Modal, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useEffect, useState } from "react";
import { loadMemes, saveMemes } from "@/lib/data";
import { useMemes } from "@/lib/MemeContext";
import { Meme } from "@/types/meme";


const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
  variable: '--font-roboto-mono',
});


export function Navbar() {
  const pathname = usePathname();const { addMeme } = useMemes();
  const router = useRouter();
  const isTableActive = pathname === "/table";
  const [memes, setMemes] = useState<Meme[]>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [newMeme, setNewMeme] = useState({
    id: 0,
    title: "",
    imageUrl: "",
    likes: 0,
    liked:false
  });

  useEffect(() => {
    const loaded = loadMemes();
    setMemes(loaded);
  }, []);

  const handleAdd = () => {
    if (!newMeme.title || newMeme.title.length < 3) {
      alert("Назва має бути не менше 3 символів");
      return;
    }

    if (!newMeme.imageUrl.startsWith("https://") ) {
      alert("URL має закінчуватись на .jpg");
      return;
    }

    const id = memes.length ? Math.max(...memes.map(m => m.id)) + 1 : 1;
    const updated = [...memes, { ...newMeme, id }];
    addMeme(newMeme);
    setNewMeme({ id: 0, title: "", imageUrl: "", likes: 0,liked:false });
    setOpen(false);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() ) {
     if(query.trim().length > 0){
      router.push(`${pathname}?search=${encodeURIComponent(query.trim())}`);
     }
    }else{
      router.push(`${pathname}`);
     }
  };


  return (
    <nav className={`bg-white shadow-md px-4 py-4  sticky top-0 z-50 flex justify-center sm:justify-between ${robotoMono.className}`}>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
    <div className="flex gap-4 justify-center sm:justify-start">
    <Link onClick={() => {setQuery("")}} href="/table" className="h-[50px] flex items-center sm:w-[100px] w-[40px]">
        <div
          className={`flex items-center px-2 py-[6px] rounded-full transition-all duration-300 ease-in-out ${
            isTableActive ? "bg-black text-white" : "bg-transparent text-black"
          }`}
        >
          <FaTable
            fontSize={23}
            className={`transition-colors duration-300 ${
              isTableActive ? "text-white" : "text-black"
            }`}
          />

          <span
            className={`md:block hidden overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out text-[18px] font-semibold ${
              isTableActive
                ? "max-w-0 opacity-0 translate-x-2 ml-0"
                : "max-w-[100px] opacity-100 translate-x-0 ml-2"
            }`}
          >
            Table
          </span>
        </div>
      </Link>
      <Link onClick={() => {setQuery("")}} href="/list" className="h-[50px] flex items-center">
        <div
          className={` flex items-center px-2  py-[6px] rounded-full transition-all duration-300 ease-in-out ${
            !isTableActive ? "bg-black text-white" : "bg-transparent text-black"
          }`}
        >
          <FaList 
            fontSize={23}
            className={`transition-colors duration-300 ${
              !isTableActive ? "text-white" : "text-black"
            }`}
          />

          <span
            className={`sm:block hidden overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out text-[18px] font-semibold ${
              !isTableActive
                ? "max-w-0 opacity-0 translate-x-2 ml-0"
                : "max-w-[100px] opacity-100 translate-x-0 ml-2"
            }`}
          >
            List
          </span>
        </div>
      </Link>
      <div className="flex sm:hidden justify-center items-center rounded-full hover:bg-black text-black transition-all duration-300 ease-in-out hover:text-white w-[40px] h-full sm:h-[40px] cursor-pointer" onClick={() => setOpen(true)}><FaPlus size={25} /></div>
    </div>
      
      <form onSubmit={handleSearch} className="flex sm:gap-2 gap-1">
          <input
            type="search"
            placeholder="Seacrh a meme"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded px-3 py-1"
          />
          <Button type="submit" className="px-0 sm:px-4" >Seacrh</Button>

        </form>
      </div>
      <div className="h-[50px] flex items-center">
      <div className="hidden sm:flex justify-center items-center rounded-full hover:bg-black text-black transition-all duration-300 ease-in-out hover:text-white w-[40px] h-[40px] cursor-pointer" onClick={() => setOpen(true)}><FaPlus size={25} /></div>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 z-[9999] backdrop-blur-md flex items-center justify-center">

        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl z-[9999] relative ">
          <h2 className="text-lg font-semibold mb-4">Новий мем</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
<span>Name: </span>
            <input
              className="border rounded overflow-hidden whitespace-nowrap text-ellipsis p-2 w-[478px]"
              value={newMeme.title}
              onChange={(e) => setNewMeme({ ...newMeme, title: e.target.value })}
              placeholder="Meme name"

            />
            </div>
            <div className="flex items-center gap-2">
            <span>URL Img: </span>

            <input
              className="border rounded overflow-hidden whitespace-nowrap text-ellipsis p-2 w-[453px]"
              value={newMeme.imageUrl}
              onChange={(e) => setNewMeme({ ...newMeme, imageUrl: e.target.value })}
              placeholder="URL link"
            />
            </div>
            <div className="flex items-center gap-2">
            <span>Likes: </span>
              <input
            type="number"
            placeholder="Likes"
            value={newMeme.likes}
            onChange={(e) => setNewMeme({ ...newMeme, likes: parseInt(e.target.value) })}
            className="border rounded overflow-hidden whitespace-nowrap text-ellipsis px-3 py-1 w-[483px]"
          />
            </div>
            <div className="flex justify-between gap-2 mt-4">
            <Button className={`${robotoMono.className} w-[calc(50%-12px)] h-[60px] bg-[black] text-white`} onClick={() => setOpen(false)}>
              Undo
            </Button>
            <Button className={`${robotoMono.className} w-[calc(50%-12px)] h-[60px] border `} onClick={handleAdd}>Save</Button>
          </div>
          </div>
        </div>
        </div>
      </Modal>
    </nav>
  );
}