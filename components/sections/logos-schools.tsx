export default function SchoolLogos() {
  const schoolURLs = [
    "img/LXS/school/Barnard.png",
    "img/LXS/school/Bentley.png",
    "img/LXS/school/BC.png",
    "img/LXS/school/BU.png",
    "img/LXS/school/CMU.png",
    "img/LXS/school/CMC.jpg",
    "img/LXS/school/Cornell.png",
    "img/LXS/school/Emerson.png",
    "img/LXS/school/Emory.png",
    "img/LXS/school/HMC.png",
    "img/LXS/school/mainpage/mountHcollege.png",
    "img/LXS/school/NYU.png",
    "img/LXS/school/Northwestern.png",
    "img/LXS/school/Pomona.png",
    "img/LXS/school/TuftsU.jpg",
    "img/LXS/school/Tulane.png",
    "img/LXS/school/UCB.png",
    "img/LXS/school/mainpage/ucsb.jpg",
    "img/LXS/school/UNC.png",
    "img/LXS/school/UChicago.png",
    "img/LXS/school/UGeorgia.png",
    "img/LXS/school/mainpage/iowa.png",
    "img/LXS/school/UMichigan.png",
    "img/LXS/school/UPenn.png",
    "img/LXS/school/USC.png",
    "img/LXS/school/UW-Madison.png",
    "img/LXS/school/Villanova.jpg",
    "img/LXS/school/Wesleyan.png",
  ];

  // Function to extract company names from URLs for alt text
  const getAltText = (url: string) => {
    const namePart = url.split("/").pop(); // Get the last part of the URL
    return namePart?.split(".")[0]; // Remove the file extension and return
  };

  return (
    <div className="bg-white py-3 sm:py-6 mx-12">
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="mx-auto grid max-w-xl grid-cols-2 lg:grid-cols-6 items-center gap-y-12 sm:gap-y-6 lg:mx-0 lg:max-w-none ">
            {schoolURLs.map((url, index) => (
              <img
                key={index}
                className="max-h-full max-w-full object-contain"
                src={url}
                alt={getAltText(url)} // Dynamically generate alt text
                width={50} // You may want to adjust these statically set values
                height={24} // depending on your layout needs or image aspect ratios
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
