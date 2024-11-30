"use client";

import { type User } from "@prisma/client";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import FormContainer from "@/components/form/FormContainer";
import TextAreaInput from "@/components/form/TextAreaInput";
import FormInput from "@/components/form/FormInput";
import ImageInputContainerLegacy from "@/components/form/ImageInputContainerLegacy";
import { updateProfileAction, updateProfileImageAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";
import { MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import BookSearchInput from "@/components/books/BookSearchInput";
import { UserExtended } from "@/lib/types";
import MovieSearchInput from "@/components/movies/MovieSearchInput";

const LINKEDIN_URL_PLACEHOLDER = "https://www.linkedin.com/in/your-handle-here";

import { Book } from "@prisma/client";

import { Movie } from "@prisma/client";

export default function EditProfileScreen({ user }: { user: UserExtended }) {
  const [mounted, setMounted] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMounted(true);
    if (user.favoriteBooks && user.favoriteBooks.length > 0) {
      setSelectedBooks(user.favoriteBooks as Book[]);
    }
    if (user.favoriteMovies && user.favoriteMovies.length > 0) {
      setSelectedMovies(user.favoriteMovies as Movie[]);
    }
  }, [user.favoriteBooks, user.favoriteMovies]);

  const handleAddBook = (book: Book) => {
    if (selectedBooks.length < 5) {
      if (!selectedBooks.some((selectedBook) => selectedBook.id === book.id)) {
        setSelectedBooks([...selectedBooks, book]);
      } else {
        toast.error("Book already added");
      }
    } else {
      toast.error("Maximum books reached");
    }
  };

  const handleRemoveBook = (indexToRemove: number) => {
    setSelectedBooks(
      selectedBooks.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddMovie = (movie: Movie) => {
    if (selectedMovies.length < 5) {
      if (
        !selectedMovies.some((selectedMovie) => selectedMovie.id === movie.id)
      ) {
        setSelectedMovies([...selectedMovies, movie]);
      } else {
        toast.error("Movie already added");
      }
    } else {
      toast.error("Maximum movies reached");
    }
  };

  const handleRemoveMovie = (indexToRemove: number) => {
    setSelectedMovies(
      selectedMovies.filter((_, index) => index !== indexToRemove)
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="min-h-[calc(100vh-57px)] bg-background/50 py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <Link
          href="/profile"
          className="inline-block mb-6 text-sm font-medium hover:underline"
        >
          ← Back to Profile
        </Link>

        <Card className="border-none shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text text-transparent">
              Edit Your Profile
            </CardTitle>
            <CardDescription className="text-lg">
              Update your information and profile picture
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-10 flex justify-center">
              <ImageInputContainerLegacy
                image={user.profilePictureURL || ""}
                name={user.firstName || ""}
                action={updateProfileImageAction}
                text="Update Profile Image"
              />
            </div>

            <FormContainer action={updateProfileAction}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="firstName"
                    label="First Name"
                    defaultValue={user.firstName || ""}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="lastName"
                    label="Last Name"
                    defaultValue={user.lastName || ""}
                  />
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <FormInput
                      type="text"
                      name="currentCity"
                      label="Current City"
                      defaultValue={user.currentCity || ""}
                      placeholder="Where are you based?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="linkedInLink"
                    label="LinkedIn URL"
                    defaultValue={user.linkedInLink || ""}
                    placeholder={LINKEDIN_URL_PLACEHOLDER}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="number"
                    name="graduationYear"
                    label="Graduation Year"
                    defaultValue={user.graduationYear || ""}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="school"
                    label="School"
                    defaultValue={user.school || ""}
                  />
                </div>

                <div className="space-y-2">
                  <FormInput
                    type="text"
                    name="currentRole"
                    label="Current Role"
                    defaultValue={user.currentRole || ""}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <FormInput
                    type="text"
                    name="currentCompany"
                    label="Current Company"
                    defaultValue={user.currentCompany || ""}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <TextAreaInput
                    name="bio"
                    labelText="Bio"
                    defaultValue={user.bio || ""}
                  />
                </div>

                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-[18px] font-semibold text-[#484848]">
                    Favorite Books
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedBooks.map((book, index) => (
                        <div
                          key={book.id}
                          className="group flex items-center gap-3 bg-[#F7F7F7] p-2 rounded-lg"
                        >
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-8 h-12 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <span className="text-[#484848] text-sm font-medium">
                              {book.title}
                            </span>
                            <span className="text-[#767676] text-xs">
                              {book.authors.join(", ")}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBook(index)}
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4 text-[#767676] hover:text-[#FF5A5F]" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {selectedBooks.length < 5 && (
                      <BookSearchInput
                        onSelect={handleAddBook}
                        isDisabled={selectedBooks.length >= 5}
                      />
                    )}

                    <input
                      type="hidden"
                      name="favoriteBooks"
                      value={JSON.stringify(selectedBooks)}
                    />

                    <p className="text-[#767676] text-sm">
                      Add up to 5 of your favorite books
                    </p>
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-[18px] font-semibold text-[#484848]">
                    Favorite Movies
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedMovies.map((movie, index) => (
                        <div
                          key={movie.id}
                          className="group flex items-center gap-3 bg-[#F7F7F7] p-2 rounded-lg"
                        >
                          <img
                            src={movie.coverUrl}
                            alt={movie.title}
                            className="w-8 h-12 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <span className="text-[#484848] text-sm font-medium">
                              {movie.title}
                            </span>
                            <span className="text-[#767676] text-xs">
                              {movie.releaseYear}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMovie(index)}
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4 text-[#767676] hover:text-[#FF5A5F]" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {selectedMovies.length < 5 && (
                      <MovieSearchInput
                        onSelect={handleAddMovie}
                        isDisabled={selectedMovies.length >= 5}
                      />
                    )}

                    <input
                      type="hidden"
                      name="favoriteMovies"
                      value={JSON.stringify(selectedMovies)}
                    />

                    <p className="text-[#767676] text-sm">
                      Add up to 5 of your favorite movies
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <SubmitButton
                  text="Update Profile"
                  className="w-full max-w-md mx-auto block text-lg font-medium 
                           bg-gradient-to-r from-neutral-950 to-neutral-800 hover:from-neutral-900 hover:to-neutral-700
                           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                />
              </div>
            </FormContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
