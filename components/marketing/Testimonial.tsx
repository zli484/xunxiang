import Image, { type ImageProps } from "next/image";
import clsx from "clsx";

import { Container } from "@/components/marketing/Container";
import { FadeIn } from "@/components/marketing/FadeIn";
import { GridPattern } from "@/components/marketing/GridPattern";

export function Testimonial({
  children,
  client,
  className,
}: {
  children: React.ReactNode;
  client: { avatarUrl: ImageProps["src"]; name: string; title: string };
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32",
        className
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-2xl">
              <p className="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-x-6">
              <Image
                className="h-14 w-14 rounded-full bg-gray-50"
                src={client.avatarUrl}
                alt=""
              />
              <div className="text-base">
                <div className="font-semibold text-gray-900">{client.name}</div>
                <div className="mt-1 text-gray-500">{client.title}</div>
              </div>
            </figcaption>
            {/* <figcaption className="mt-10">
              <Image src={client.logo} alt={client.name} unoptimized />
            </figcaption> */}
          </figure>
        </FadeIn>
      </Container>
    </div>
  );
}
