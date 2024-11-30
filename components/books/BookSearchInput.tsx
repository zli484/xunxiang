"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Loader2, Search } from "lucide-react";
import { Book } from "@prisma/client";

interface BookSearchInputProps {
  onSelect: (book: Book) => void;
  isDisabled?: boolean;
}

// Define a type for the Google Books API response
interface GoogleBookResult {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    publishedDate?: string;
  };
}

export default function BookSearchInput({
  onSelect,
  isDisabled,
}: BookSearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchBooks = async (query: string) => {
    if (!query || query.length < 2) {
      setBooks([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=5&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
      );

      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();

      if (data.items && Array.isArray(data.items)) {
        const formattedBooks: Book[] = data.items
          .filter((item: GoogleBookResult) => item?.volumeInfo)
          .map((item: GoogleBookResult) => ({
            id: item.id,
            title: item.volumeInfo.title || "Unknown Title",
            authors: Array.isArray(item.volumeInfo.authors)
              ? item.volumeInfo.authors
              : ["Unknown Author"],
            coverUrl:
              item.volumeInfo.imageLinks?.thumbnail || "/placeholder-book.png",
            publishedYear: item.volumeInfo.publishedDate
              ? item.volumeInfo.publishedDate.split("-")[0]
              : null,
            // Add required Prisma fields with default values
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
        setBooks(formattedBooks);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(true);

    if (query.length >= 2) {
      await searchBooks(query);
    } else {
      setBooks([]);
    }
  };

  const handleSelectBook = (book: Book) => {
    onSelect(book);
    setSearchQuery(book.title);
    setShowResults(false);
    setBooks([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a book..."
          className="w-full h-10 pl-10 pr-10 border-[#F2F2F2] focus:border-[#FF5A5F]"
          disabled={isDisabled}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
        ) : searchQuery ? (
          <button
            onClick={() => {
              setSearchQuery("");
              setBooks([]);
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-[#FF5A5F]" />
          </button>
        ) : null}
      </div>

      {showResults && books.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-[#F2F2F2] max-h-[300px] overflow-y-auto">
          {books.map((book) => (
            <button
              key={book.id}
              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-[#F7F7F7] transition-colors"
              onClick={() => handleSelectBook(book)}
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-[#484848]">{book.title}</span>
                <span className="text-sm text-[#767676]">
                  {book.authors.join(", ")}
                  {book.publishedYear && ` (${book.publishedYear})`}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
