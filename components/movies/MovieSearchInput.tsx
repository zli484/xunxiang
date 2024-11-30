"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X, Loader2, Search } from "lucide-react";
import { Movie } from "@prisma/client";

interface MovieSearchInputProps {
  onSelect: (movie: Movie) => void;
  isDisabled?: boolean;
}

export default function MovieSearchInput({
  onSelect,
  isDisabled,
}: MovieSearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchMovies = async (query: string) => {
    if (!query || query.length < 2) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(query)}&language=en-US`
      );

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();

      if (data.results) {
        const formattedMovies: Movie[] = data.results
          .filter((item: any) => item.title && item.release_date)
          .map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            directors: [], // We'll need an additional API call to get directors
            coverUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            releaseYear: item.release_date.split("-")[0],
          }));
        setMovies(formattedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(true);

    if (query.length >= 2) {
      await searchMovies(query);
    } else {
      setMovies([]);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    onSelect(movie);
    setSearchQuery(movie.title);
    setShowResults(false);
    setMovies([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a movie..."
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
              setMovies([]);
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-[#FF5A5F]" />
          </button>
        ) : null}
      </div>

      {showResults && movies.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-[#F2F2F2] max-h-[300px] overflow-y-auto">
          {movies.map((movie) => (
            <button
              key={movie.id}
              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-[#F7F7F7] transition-colors"
              onClick={() => handleSelectMovie(movie)}
            >
              <img
                src={movie.coverUrl}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-[#484848]">
                  {movie.title}
                </span>
                <span className="text-sm text-[#767676]">
                  {movie.releaseYear}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
