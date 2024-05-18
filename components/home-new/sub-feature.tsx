import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Invite-only Network",
    description:
      "We review each applicatiion to ensure you get to experience the best network.",
  },
  {
    name: "Networking Concierge",
    description:
      "We have a dedicated concierge service to help you connect with the right people.",
  },
  {
    name: "AI-powered Recommendations",
    description:
      "Based on your profile, we recommend the best people to connect with.",
  },
  {
    name: "Local Events",
    description:
      "We introduce you to local events where you can connect with other members.",
  },
  {
    name: "Travel Plans",
    description:
      "We build travel plans for you to meet other members in different cities.",
  },
  {
    name: "Resources & Guides",
    description:
      "We put together resources and guides to help you navigate your 20s better.",
  },
];

export default function SubFeature() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              All-in-one platform
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </p>
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900">
                  <CheckIcon
                    className="absolute left-0 top-1 h-5 w-5 text-indigo-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
