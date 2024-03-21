// export default function Logos() {
//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
//           <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
//             <img
//               className="max-h-12 w-full object-contain object-left"
//               src="https://tailwindui.com/img/logos/tuple-logo-gray-900.svg"
//               alt="Tuple"
//               width={105}
//               height={48}
//             />
//             <img
//               className="max-h-12 w-full object-contain object-left"
//               src="https://tailwindui.com/img/logos/reform-logo-gray-900.svg"
//               alt="Reform"
//               width={104}
//               height={48}
//             />
//             <img
//               className="max-h-12 w-full object-contain object-left"
//               src="https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg"
//               alt="SavvyCal"
//               width={140}
//               height={48}
//             />
//             <img
//               className="max-h-12 w-full object-contain object-left"
//               src="https://tailwindui.com/img/logos/laravel-logo-gray-900.svg"
//               alt="Laravel"
//               width={136}
//               height={48}
//             />
//             <img
//               className="max-h-12 w-full object-contain object-left"
//               src="https://tailwindui.com/img/logos/transistor-logo-gray-900.svg"
//               alt="Transistor"
//               width={158}
//               height={48}
//             />
//             <img
//               className="max-h-12 w-full object-contain object-left"
//               src="https://tailwindui.com/img/logos/statamic-logo-gray-900.svg"
//               alt="Statamic"
//               width={147}
//               height={48}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function CompanyLogos() {
  const companyURLs = [
    "img/LXS/company/Alibaba.png",
    "img/LXS/company/mainpage/BCG.png",
    "img/LXS/company/ByteDance.png",
    "img/LXS/company/Deloitte.png",
    "img/LXS/company/mainpage/godaddy.png",
    "img/LXS/company/Goldman Sachs.png",
    "img/LXS/company/Google.png",
    "img/LXS/company/Hana.png",
    "img/LXS/company/InterMF.jpg",
    "img/LXS/company/Info.jpg",
    "img/LXS/company/Lyft.png",
    "img/LXS/company/McKinseyCompany.png",
    "img/LXS/company/mainpage/Microsoft.png",
    "img/LXS/company/Milliman.png",
    "img/LXS/company/mainpage/PwC.png",
    "img/LXS/company/Snap.png",
    "img/LXS/company/mainpage/tripadvisor.png",
    "img/LXS/company/Truist.png",
    "img/LXS/company/mainpage/Tuixiang.png",
    "img/LXS/company/mainpage/WIstateInvestmentBoard.png",
    "img/LXS/company/mainpage/Zhenfund.png",
  ];

  // Function to extract company names from URLs for alt text
  const getAltText = (url: string) => {
    const namePart = url.split("/").pop(); // Get the last part of the URL
    return namePart?.split(".")[0]; // Remove the file extension and return
  };

  return (
    <div className="bg-white py-3 sm:py-6">
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex">
          <div className="w-1/6">
            <p className="text-xl font-bold">所在公司</p>
          </div>
          <div className="w-5/6 mx-auto grid max-w-xl grid-cols-2 lg:grid-cols-6 items-center gap-y-12 sm:gap-y-6 lg:mx-0 lg:max-w-none lg:pl-8 border-l-8">
            {companyURLs.map((url, index) => (
              <img
                key={index}
                className="max-h-full max-w-full object-contain"
                src={url}
                alt={getAltText(url)} // Dynamically generate alt text
                width={100} // You may want to adjust these statically set values
                height={48} // depending on your layout needs or image aspect ratios
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
