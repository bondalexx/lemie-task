"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { loadMemes, saveMemes } from "@/lib/data";
import { Meme } from "@/types/meme";

interface MemeContextType {
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
  addMeme: (meme: Meme) => void;
  deleteMeme: (id: number) => void;
  updateMeme: (updatedMeme: Meme) => void;
}

const MemeContext = createContext<MemeContextType | null>(null);

export function MemeProvider({ children }: { children: React.ReactNode }){
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    setMemes(loadMemes());
  }, []);

  const addMeme = (meme: Meme): void => {
    const id = memes.length ? Math.max(...memes.map((m: Meme) => m.id)) + 1 : 1;
    const newMeme = { ...meme, id };
    const updated = [...memes, newMeme];
    setMemes(updated);
    saveMemes(updated);
  };

  const deleteMeme = (id: number): void => {
    const updated = memes.filter((m) => m.id !== id);
    setMemes(updated);
    saveMemes(updated);
  };

  const updateMeme = (updatedMeme: Meme): void => {
    const updatedMemes = memes.map((m: Meme) => (m.id === updatedMeme.id ? updatedMeme : m));
    setMemes(updatedMemes);
    saveMemes(updatedMemes);
  };

  return (
    <MemeContext.Provider
      value={{
        memes,
        setMemes,
        addMeme,
        deleteMeme,
        updateMeme,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
}

/**
 * Returns the MemeContext object with the following properties:
 * - `memes`: An array of Meme objects.
 * - `setMemes`: A function to update the `memes` state.
 * - `addMeme`: A function to add a new Meme to the state.
 * - `deleteMeme`: A function to remove a Meme from the state.
 * - `updateMeme`: A function to update a Meme in the state.
 */
export function useMemes(): MemeContextType {
  const context = useContext(MemeContext);
  if (!context) {
    throw new Error("useMemes must be used within a MemeProvider");
  }
  return context;
}
