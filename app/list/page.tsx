import { Suspense } from "react";
import MemeList from "@/components/MemeList";

export default function ListPage() {
  return (
    <Suspense fallback={<div>Loading memes...</div>}>
      <MemeList />
    </Suspense>
  );
}