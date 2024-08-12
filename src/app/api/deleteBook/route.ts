import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: any) {
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

        // Filter out the item with the specified ID
        data.items = data.items.filter(item => item.id !== parseInt(id));

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, message: 'Item deleted successfully!' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
