import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request: any) {
  const body = await request.json();

  // Validate the incoming data
  if (!body.id || !body.name || !body.description) {
    return NextResponse.json({ error: 'ID, name, and description are required' }, { status: 400 });
  }

  // Path to the JSON file
  const filePath = path.join(process.cwd(), 'public', 'data/book.json');

  try {
    // Read the existing JSON data
    const jsonData: any = fs.readFileSync(filePath);
    const data: { increment: number, items: any[] } = JSON.parse(jsonData);

    // Find the index of the item to be updated
    const itemIndex = data.items.findIndex(item => item.id === body.id);
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Update the item
    data.items[itemIndex] = { ...data.items[itemIndex], ...body};

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, item: data.items[itemIndex] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}
