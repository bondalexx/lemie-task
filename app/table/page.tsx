import { Suspense } from "react";
import TablePageClient from "@/components/MemeTable";

export default function TablePage() {
  return (
    <Suspense fallback={<div>Loading table...</div>}>
      <TablePageClient />
    </Suspense>
  );
}