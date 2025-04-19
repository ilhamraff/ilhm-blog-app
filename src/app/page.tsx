/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type S3File = {
  key: string;
  url: string;
  lastModified?: string;
  size: number;
};

export default function Home() {
  const [fileList, setFileList] = useState<S3File[]>([]);

  const fetchFileList = async () => {
    try {
      const response = await fetch("/api/files");
      const data = await response.json();
      setFileList(data.files as S3File[]);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-800 px-6 py-12 sm:px-16 font-sans">
      <main className="max-w-3xl mx-auto">
        {/* Header / Hero Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2">Ilham Rafi Blog App</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Selamat datang di halaman Blog Saya!
          </p>
        </header>

        {/* File List Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Daftar File Tersimpan
          </h2>
          {fileList.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fileList.map((file: any, index: number) => (
                <li
                  key={index}
                  className="border rounded-md p-4 shadow-sm bg-gray-50"
                >
                  {file.key.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <div>
                      <Image
                        src={file.url}
                        alt={file.key}
                        width={500}
                        height={300}
                        className="w-full h-auto rounded-md border"
                      />
                      <p className="mt-2 text-sm text-gray-600 text-center">
                        {file.key} • {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 text-center">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {file.key}
                      </a>
                      <span className="text-sm text-gray-500 italic">
                        {(file.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Belum ada file yang diunggah.
            </p>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Ilham Rafi Blog App. Dibuat dengan
          Next.js & S3.
        </footer>
      </main>
    </div>
  );
}
