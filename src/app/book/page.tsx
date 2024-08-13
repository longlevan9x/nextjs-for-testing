'use client';

import Notification from '@/components/notification';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from 'react';
import { deleteBook, getBooks, initDefaultBook } from "@/app/actions/book";
import { Book } from "@/app/model/book";

const initialBooks: Book[] = [];

export default function BookList() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router: any = useRouter();

  useEffect(() => {
    initDefaultBook();
    const books = getBooks();
    setBooks(books)
  }, []);

  useEffect(() => {
    if (searchParams.get('success')) {
      let message = 'Sách đã được thêm thành công!';

      if (searchParams.get('success') == 'update') {
        message = 'Sách đã cập nhật thành công!';
      }

      setSuccessMessage(message);
      setNotification({
        type: 'success',
        message: {
          title: message,
          body: message,
        },
      });
      setTimeout(() => setSuccessMessage(null), 3000); // Remove message after 3 seconds
    }
  }, [searchParams.get('success')]);

  // State for managing notification message
  const [notification, setNotification] = useState(null as any);

  // State for managing the item to be deleted
  const [itemToDelete, setItemToDelete] = useState(null as Book | any);

  // Function to open confirmation modal
  const openConfirmationModal = (item: Book) => {
    setItemToDelete(item);
  };

  // Function to handle delete action with notification
  const handleDelete = () => {
    if (itemToDelete) {
      const id = itemToDelete.id;
      deleteBook(id);
      setBooks(books.filter(item => item.id !== id));
      setItemToDelete(null);

      setNotification({
        type: 'success',
        message: {
          title: 'Xóa thành công!',
          body: `'${itemToDelete.name}' đã xóa thành công!`,
        },
      });
    }
  };

  return (
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
                  <Link href={"/book/update/" + item.id} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                    Edit
                  </Link>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => openConfirmationModal(item)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Notification message={notification?.message} type={notification?.type} />

      {/* Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa!</h2>
            <p>Bạn chắc chắn xóa sách: &apos;{itemToDelete.name}&apos;?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setItemToDelete(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
