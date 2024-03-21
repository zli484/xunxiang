import Image from "next/image";
import Link from "next/link";

export default function ProgramSmallCard({
  name,
  description,
  image,
  link,
}: {
  name: string;
  description: string;
  image: string;
  link: string;
}) {
  return (
    <div>
      <Link href={link}>
        <div className="w-full p-16 shadow-lg rounded-lg max-h-56">
          <div className="card-body">
            <div className="flex">
              <div className="w-1/2">
                <h3>{name}</h3>
                <Image
                  src="/img/1line.png"
                  alt="line1"
                  className="relative top-[0px]"
                  width={100}
                  height={10}
                />
                <p>{description}</p>
                <p className="text-sm">了解更多</p>
              </div>
              <div className="w-1/2">
                <Image src={image} alt="notebook" width={100} height={100} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
