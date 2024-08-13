import { Book } from "@/app/model/book";
import { defaultBook } from "@/app/actions/defaultData";

interface BookDB {
    increment: number,
    items: Book[]
}

function getBookDB(): BookDB {
    const defaultData = {
        increment: 1,
        items: []
    };

    return JSON.parse(localStorage.getItem('BookDB') || JSON.stringify(defaultData)) as BookDB;
}

function setBookDB(bookDB: BookDB) {
    localStorage.setItem('BookDB', JSON.stringify(bookDB));
}

export function getBooks(): Book[] {
    const bookDB = getBookDB();
    return bookDB.items;
}

export function getDetailBook(id: number): Book | null {
    const bookDB = getBookDB();
    return bookDB.items.find(b => b.id === id) || null;
}

export function createBook(bookData: Book): Book {
    const bookDB = getBookDB();
    bookDB.increment += 1;
    bookData.id = bookDB.increment;
    bookDB.items.push(bookData);
    setBookDB(bookDB);

    return bookData;
}

export function updateBook(id: number, bookData: Book): Book | null {
    const bookDB = getBookDB();
    const updateIndex = bookDB.items.findIndex(b => b.id === id);

    if (updateIndex === -1) {
        return null;
    }

    bookData.id = id;
    bookDB.items[updateIndex] = bookData;
    setBookDB(bookDB);
    return bookData;
}

export function deleteBook(id: number): boolean {
    const bookDB = getBookDB();
    bookDB.items = bookDB.items.filter(b => b.id !== id);
    setBookDB(bookDB);
    return true;
}

export function initDefaultBook() {
    let bookDB = getBookDB();
    const _defaultBook: BookDB = defaultBook();
    if (bookDB.items.length === 0) {
        bookDB = _defaultBook;
        setBookDB(bookDB);
    }
}

