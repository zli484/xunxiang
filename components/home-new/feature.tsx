import { InboxIcon, TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import connectIllustration from "@/public/img/landing/others/party-time.png";
import exploreIllustration from "@/public/img/landing/others/keeping-touh.png";
import growIllustration from "@/public/img/landing/others/sitting-in-park.png";
import Image from "next/image";
import { AspectRatio } from "@chakra-ui/react";

const features = [
  {
    name: "Connect",
    description:
      "Coffee chats with young professonals, befriend people with similar interests, and grow your network.",
    href: "#",
    icon: InboxIcon,
    illustration: connectIllustration,
  },
  {
    name: "Explore",
    description:
      "Local city events, travel to new places, with like-minded people from the network who you can trust.",
    href: "#",
    icon: UsersIcon,
    illustration: exploreIllustration,
  },
  {
    name: "Grow",
    description:
      "Find a mentor, learn from a workshop, get resources and guides. Make adulting right with the best network",
    href: "#",
    icon: TrashIcon,
    illustration: growIllustration,
  },
];

export default function Feature() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All you need to have an amazing 20s experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <AspectRatio ratio={16 / 9} width={100}>
                  <Image
                    width={100}
                    alt="illustration"
                    src={feature.illustration}
                  />
                </AspectRatio>
                <dt className=" mt-12 text-3xl font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-600"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
