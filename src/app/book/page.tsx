'use client';

import Nav from "@/components/nav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';

interface Book {
  id: number;
  name: string;
  author: string;
  genre: string;
  year: number;
  description?: string;
  level: string;
}

export default function BookList() {
  const initialBooks: Book[] = [
    {
      id: 1,
      name: 'Sách Tiếng Việt 1',
      author: 'Nguyễn Văn A',
      genre: 'Chữ hán',
      year: 2021,
      description: 'Cuốn sách tiếng Việt cho người mới bắt đầu.',
      level: 'N5',
    },
    {
      id: 2,
      name: 'Sách Tiếng Việt 2',
      author: 'Trần Văn B',
      genre: 'Từ vựng',
      year: 2022,
      description: 'Cuốn sách từ vựng nâng cao.',
      level: 'N3',
    },
  ];

  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router: any = useRouter();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books') || '[]') as Book[];
    if (storedBooks.length > 0) {
      setBooks([...initialBooks, ...storedBooks]);
    }
  }, []);


  useEffect(() => {
    if (router?.query?.success) {
      setSuccessMessage('Sách đã được thêm thành công!');
      setTimeout(() => setSuccessMessage(null), 3000); // Remove message after 3 seconds
    }
  }, [router?.query?.success]);

  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto p-4">
        {successMessage && (
          <div className="mb-4 p-4 bg-green-200 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách sách</h1>
          <Link
            href="/book/create"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            New
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Tên</th>
                <th className="py-3 px-6 text-left">Trình độ</th>
                <th className="py-3 px-6 text-center">Tác giả</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {/* Map over data array to create rows dynamically */}
              {books.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{item.name}</td>
                  <td className="py-3 px-6 text-left">{item.level}</td>
                  <td className="py-3 px-6 text-center">{item.author}</td>
                  <td className="py-3 px-6 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
