import Image from "next/image";

export default function Principle({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="w-full lg:w-1/3 text-center px-4 space-y-6">
      <div className="flex justify-center">
        <Image src={image} alt="heart" width={60} height={60} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
