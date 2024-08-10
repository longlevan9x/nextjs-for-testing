"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

interface Book {
  name: string;
  author: string;
  genre: string;
  level: string;
  year: number;
  description?: string;
}

const genres: string[] = ["Chữ hán", "Từ vựng", "Ngữ pháp"];
const levels: string[] = ["N5", "N4", "N3", "N2", "N1"];

// Define the Zod schema for validation
const bookSchema = z.object({
  name: z.string().min(1, "Tên sách là bắt buộc"),
  author: z.string().min(1, "Tác giả là bắt buộc"),
  year: z.number().min(0, "Năm xuất bản phải là một số dương").or(z.string().regex(/^\d+$/, "Năm xuất bản phải là một số").transform(Number)),
  description: z.string().optional(),
  level: z.enum(["N5", "N4", "N3", "N2", "N1"], { message: "Cấp độ là bắt buộc" }),
  genre: z.enum(["Chữ hán", "Từ vựng", "Ngữ pháp"], { message: "Thể loại là bắt buộc" }),
});


export default function NewBook() {
  const [bookDetails, setBookDetails] = useState<Book>({
    name: '',
    author: '',
    year: new Date().getFullYear(),
    description: '',
    level: '',
    genre: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      bookSchema.parse(bookDetails);

      // Save the book to localStorage or send to the server
      const existingBooks = JSON.parse(localStorage.getItem('books') || '[]') as Book[];
      localStorage.setItem('books', JSON.stringify([...existingBooks, bookDetails]));

      router.push('/book?success=true');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages);
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Thêm Sách Mới</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Tên Sách</label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookDetails.name}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Nhập tên sách"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Tác Giả</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookDetails.author}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Nhập tên tác giả"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">Năm Xuất Bản</label>
          <input
            type="number"
            id="year"
            name="year"
            value={bookDetails.year}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Nhập năm xuất bản"
          />
          {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="level" className="block text-gray-700 font-semibold mb-2">Cấp Độ</label>
          <select
            id="level"
            name="level"
            value={bookDetails.level}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.level ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="" disabled>Chọn cấp độ</option>
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 font-semibold mb-2">Thể Loại</label>
          <select
            id="genre"
            name="genre"
            value={bookDetails.genre}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.genre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="" disabled>Chọn thể loại</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Mô Tả</label>
          <textarea
            id="description"
            name="description"
            value={bookDetails.description}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Nhập mô tả ngắn gọn về sách"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Thêm Sách
        </button>
      </form>
    </div>
  );
}
