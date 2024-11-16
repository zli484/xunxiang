"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  location: z.string().optional(),
  cost: z.string().optional(),
  currency: z.string().default("USD"),
  maxParticipants: z.string().optional(),
  genderPreference: z.enum(["ANY", "MALE_ONLY", "FEMALE_ONLY"]),
  skillLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT", "ANY"]),
  additionalRequirements: z.string().optional(),
});

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { id: string; name: string }[];
}

export default function CreateActivityModal({
  isOpen,
  onClose,
  categories,
}: CreateActivityModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genderPreference: "ANY",
      skillLevel: "ANY",
      currency: "USD",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      // Append all form fields
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Append images
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch("/api/activities/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create activity");
      }

      const data = await response.json();

      // Reset form and close modal
      form.reset();
      setImages([]);
      onClose();

      // Optional: Show success message
      toast({
        title: "Success",
        description: "Activity created successfully!",
      });
    } catch (error) {
      console.error("Error creating activity:", error);
      // Show error message
      toast({
        title: "Error",
        description: "Failed to create activity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (files: FileList | File[]) => {
    const newFiles = Array.from(files).filter((file) => {
      // Only accept images
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload only image files",
          variant: "destructive",
        });
        return false;
      }
      // Check file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload images smaller than 5MB",
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files);
  }, []);

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return newImages;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#F2F2F2] p-6">
          <DialogHeader>
            <DialogTitle className="text-[32px] font-bold text-[#484848]">
              Host an Activity
            </DialogTitle>
            <p className="text-[#767676] text-[16px] mt-2">
              Share your activity with the community and connect with
              like-minded people
            </p>
          </DialogHeader>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h2 className="text-[24px] font-semibold text-[#484848]">
                  Basic Information
                </h2>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-medium text-[#484848]">
                        Activity Title*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Give your activity a catchy title"
                          className="h-12 border-[#F2F2F2] focus:border-[#FF5A5F] text-[16px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF5A5F]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-medium text-[#484848]">
                        Description*
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what participants can expect"
                          className="min-h-[120px] border-[#F2F2F2] focus:border-[#FF5A5F] text-[16px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#FF5A5F]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] font-medium text-[#484848]">
                          Category*
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-[#F2F2F2] focus:border-[#FF5A5F]">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                                className="h-10"
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[#FF5A5F]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] font-medium text-[#484848]">
                          Maximum Participants
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Leave empty for unlimited"
                            className="h-12 border-[#F2F2F2] focus:border-[#FF5A5F]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF5A5F]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Date and Location Section */}
              <div className="space-y-6 pt-6 border-t border-[#F2F2F2]">
                <h2 className="text-[24px] font-semibold text-[#484848]">
                  Date & Location
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-[14px] font-medium text-[#484848]">
                          Start Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-12 border-[#F2F2F2] focus:border-[#FF5A5F] font-normal",
                                  !field.value && "text-[#767676]"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-[#FF5A5F]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] font-medium text-[#484848]">
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Where will this activity take place?"
                            className="h-12 border-[#F2F2F2] focus:border-[#FF5A5F]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF5A5F]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-6 pt-6 border-t border-[#F2F2F2]">
                <h2 className="text-[24px] font-semibold text-[#484848]">
                  Activity Photos
                </h2>

                <div className="space-y-4">
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg transition-colors",
                      isDragging
                        ? "border-[#FF5A5F] bg-[#FF5A5F]/5"
                        : "border-[#F2F2F2] hover:border-[#FF5A5F]",
                      images.length > 0 ? "p-4" : "p-8"
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files!)}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload
                        className={cn(
                          "transition-transform",
                          isDragging ? "scale-110" : "",
                          images.length > 0 ? "h-8 w-8" : "h-12 w-12"
                        )}
                      />
                      <span
                        className={cn(
                          "mt-4 font-medium transition-colors",
                          isDragging ? "text-[#FF5A5F]" : "text-[#484848]",
                          images.length > 0 ? "text-sm" : "text-[16px]"
                        )}
                      >
                        {isDragging ? "Drop your photos here" : "Upload Photos"}
                      </span>
                      <span className="mt-2 text-[14px] text-[#767676]">
                        {images.length > 0
                          ? "Drag to reorder • First photo will be the cover"
                          : "Drag and drop or click to upload"}
                      </span>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="group relative aspect-[4/3] rounded-lg overflow-hidden"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "text/plain",
                              index.toString()
                            );
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add("opacity-50");
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.classList.remove("opacity-50");
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove("opacity-50");
                            const fromIndex = parseInt(
                              e.dataTransfer.getData("text/plain")
                            );
                            reorderImages(fromIndex, index);
                          }}
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
                              Cover Photo
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-white/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4 text-[#484848]" />
                          </button>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer with Actions */}
              <div className="sticky bottom-0 bg-white border-t border-[#F2F2F2] pt-6 pb-2 flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="h-12 px-6 text-[#484848] border-[#767676]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-6 bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-white"
                >
                  {isLoading ? "Creating..." : "Create Activity"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
