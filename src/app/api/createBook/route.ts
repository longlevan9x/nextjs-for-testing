import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: any) {
  const body = await request.json();

  // Validate the incoming data
  if (!body.name || !body.description) {
    return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
  }

  // Path to the JSON file
  const filePath = path.join(process.cwd(), 'public', 'data/book.json');

  try {
    // Read the existing JSON data
    const jsonData: any = fs.readFileSync(filePath);
    const data: { increment: number, items: any[] } = JSON.parse(jsonData);
    data.increment += 1;

    // Create a new item with a unique ID
    const newItem = {
      id: data.increment,
      name: body.name,
      author: body.author,
      genre: body.genre,
      year: body.year,
      description: body.description,
      level: body.level
    };

    // Add the new item to the list
    data.items.push(newItem);

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
