import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: any) {
  const body = await request.json();

  // Validate the incoming data
  if (!body.name || !body.author || !body.genre || !body.year || !body.level) {
    return NextResponse.json({ error: 'name, author, genre, year, level are required' }, { status: 400 });
  }

  // Path to the JSON file
  const filePath = path.join(process.cwd(), 'public', 'data/book.json');

  try {
    let data: { increment: number, items: any[] } = { items: [], increment: 1 };

    if (fs.existsSync(filePath)) {
      // If the file exists, read the existing data
      const jsonData: any = fs.readFileSync(filePath);
      data = JSON.parse(jsonData);
    } else {
      // If the file does not exist, create an empty file with the initial structure
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

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

    data.increment += 1;

    // Add the new item to the list
    data.items.push(newItem);

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ errorMessage: 'Failed to add item', error }, { status: 500 });
  }
}
