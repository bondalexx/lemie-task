import { NextRequest, NextResponse } from 'next/server';
import { defaultMemes } from '@/lib/data';

export async function GET() {
  return NextResponse.json(defaultMemes);
}

export async function PUT(req: NextRequest) {
  const updated = await req.json();
  const index = defaultMemes.findIndex(m => m.id === updated.id);
  if (index !== -1) {
    defaultMemes[index] = updated;
    return NextResponse.json(defaultMemes[index]);
  } else {
    return new NextResponse("Not found", { status: 404 });
  }
}

