import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  // Path to the JSON file
  const filePath = path.join(process.cwd(), 'public', 'data/book.json');

  try {
    // Read the JSON file
    const jsonData: any = fs.readFileSync(filePath);
    const data: { increment: number, items: any[] } = JSON.parse(jsonData);

    // Find the item with the specified ID
    const item = data.items.find(item => item.id === parseInt(id));

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}
