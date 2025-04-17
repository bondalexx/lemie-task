'use client';

import { useEffect, useState } from "react";
import { loadMemes, saveMemes } from "@/lib/data";
import { Button, getKeyValue, Input, Modal, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Roboto_Mono } from 'next/font/google';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useMemes } from "@/lib/MemeContext";
import { Meme } from "@/types/meme";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
  variable: '--font-roboto-mono',
});

const validateUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol.startsWith("http");
  } catch {
    return false;
  }
};


export default function TablePage() {
  const { memes,deleteMeme,updateMeme } = useMemes();
  const [editing, setEditing] = useState<Meme | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; imageUrl?: string; likes?: string }>({});
  const [memeToDelete, setMemeToDelete] = useState<Meme | null>(null);
  const searchParams = useSearchParams();
  const [filtered, setFiltered] = useState(memes);



  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!editing) return false;

    if (!editing.title || editing.title.length < 3 || editing.title.length > 100) {
      newErrors.title = "Name shoud have length of 3 to 100 symbols.";
    }

    if (!editing.imageUrl || !validateUrl(editing.imageUrl)) {
      newErrors.imageUrl = "Введіть коректне посилання на JPG картинку.";
    }

    if (!Number.isInteger(editing.likes) || editing.likes < 0) {
      newErrors.likes = "Likes number should be greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!editing || !validate()) return;

    const updated = memes.map((meme:Meme) => (meme.id === editing.id ? editing : meme));
    updateMeme(editing);
    setOpen(false);
  };
  const handleLike = () => {
  
  };

  console.log(editing)

  useEffect(() => {
    const search = searchParams.get('search')?.toLowerCase() || '';
    const filteredMemes = memes?.filter((meme:Meme) =>
      meme.title.toLowerCase().includes(search)
    );
    setFiltered(filteredMemes);
  }, [searchParams, memes]);

  return (
    <div className="bg-white sm:p-6 p-0 rounded-2xl shadow-lg">
      <Table className="border " removeWrapper   aria-label="Example table with dynamic content">
      <TableHeader className="bg-gray-100 h-[50px]">
          <TableColumn className="bg-gray-100 text-start h-[50px] sm:pl-[20px] pl-0 text-[11px] sm:text-[16px]" key={0}>ID</TableColumn>
          <TableColumn className="bg-gray-100 text-start h-[50px] text-[11px] sm:text-[16px]" key={1}>Name</TableColumn>
          <TableColumn className="bg-gray-100 text-start h-[50px] text-[11px] sm:text-[16px]" key={2}>Likes</TableColumn>
          <TableColumn className="bg-gray-100 text-start h-[50px] w-[164px] text-[11px] sm:text-[16px]" key={3}>Actions</TableColumn>
       
      </TableHeader>
      <TableBody className="">
        {filtered.map((meme:Meme) =>
          <TableRow key={meme.id} className="bg-white border-b text-[11px] sm:text-[16px] border-[#E1E1E1] hover:bg-gray-50 transition ease-in-out delay-75 h-[60px]">
             <TableCell className="sm:pl-[20px] pl-0">{meme.id}</TableCell>
             <TableCell>{meme.title}</TableCell>
             <TableCell>{meme.likes}</TableCell>
             <TableCell className="sm:w-[164px] h-full sm:text-[20px] text-[12px]">
              <Button 
                className="cursor-pointer pl-[0] sm:px-4 px-1"
                onClick={() => {
                  setEditing(meme);
                  setErrors({});
                  setOpen(true);
                }}
              >
                <MdModeEdit  />
              </Button>
              <Button 
                className="cursor-pointer sm:px-4 px-1"
                onClick={() => {
                  setDeleteOpen(true);
                  setMemeToDelete(meme);
                }}
              >
                <MdDelete  />
              </Button>
              <div  className="cursor-pointer inline-flex sm:pl-[16px] pl-1">
              {meme.liked ? (
                <FaHeart color="#DB0000" onClick={() => { updateMeme({ ...meme, liked:false, likes:meme.likes-1 });}}  />
              ) : (
                <FaRegHeart onClick={() => { updateMeme({ ...meme, liked: true, likes:meme.likes+1 });}}  />
              )}
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>

      <Modal isOpen={open} onClose={() => setOpen(false)} className={robotoMono.className}>
  <div className="fixed inset-0 z-[9998] backdrop-blur-md flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl z-[9999] relative">
      <h2 className={`${robotoMono.className} text-xl font-semibold mb-4`}>Edit</h2>
      {editing && (
        <div className="flex flex-col gap-4">
          <div className={robotoMono.className}>ID: {editing.id}</div>
<div>

          <div className="flex items-center gap-2">
            <p className={robotoMono.className}>Name: </p>
            <Input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Enter meme name"
              className={`${robotoMono.className} h-full text-center  outline-none border rounded-[0px] pl-[10px] overflow-hidden whitespace-nowrap text-ellipsis`}
            />
          </div>
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
</div>
<div>

          <div className="flex items-center gap-2">
            <p className={robotoMono.className}>Img Link: </p>
            <Input
              value={editing.imageUrl}
              onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
              placeholder="URL image"
              className="max-w-[433px] outline-none border rounded-[0px] pl-[10px] overflow-hidden whitespace-nowrap text-ellipsis"
            />
          </div>
            {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl}</p>}
</div>
<div>

          <div className="flex items-center gap-2">
          <p className={robotoMono.className}>Likes: </p>
            <Input
              type="number"
              value={editing.likes.toString()}
              onChange={(e) => setEditing({ ...editing, likes: parseInt(e.target.value) || 0 })}
              placeholder="Likes"
              className=" outline-none border rounded-[0px] pl-[10px] overflow-hidden whitespace-nowrap text-ellipsis"
            />
            {errors.likes && <p className="text-sm text-red-500">{errors.likes}</p>}
          </div>
</div>

          <div className="flex justify-between gap-2 mt-4">
            <Button className={`${robotoMono.className} w-[calc(50%-12px)] h-[60px] bg-[black] text-white`} onClick={() => setOpen(false)}>
              Undo
            </Button>
            <Button className={`${robotoMono.className} w-[calc(50%-12px)] h-[60px] border `} onClick={handleSave}>Save</Button>
          </div>
        </div>
      )}
    </div>
  </div>
</Modal>
<Modal isOpen={deleteOpen} onClose={() => setOpen(false)} className={robotoMono.className}>
  <div className="fixed inset-0 z-[9998] backdrop-blur-md flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl z-[9999] relative">
      <h2 className={`${robotoMono.className} text-xl font-semibold mb-4 text-center`}>Are You Sure You Want To Delete This meme</h2>
      <h5 className={`${robotoMono.className} font-semibold mb-4 text-center`}>This Action Cannot Be Undone</h5>
          <div className="flex justify-between gap-2 mt-4">
            <Button className={`${robotoMono.className} w-[calc(50%-12px)] h-[60px] bg-[black] text-white`} onClick={() => setDeleteOpen(false)}>
              Undo
            </Button>
            <Button onClick={() => {
  if (memeToDelete) {
    deleteMeme(memeToDelete.id);
  }
  setDeleteOpen(false);
}} className={`${robotoMono.className} w-[calc(50%-12px)] h-[60px] bg-[#c23c3c] text-white `}>Delete</Button>
          </div>
        </div>
  </div>
</Modal>
    </div>
  );
}