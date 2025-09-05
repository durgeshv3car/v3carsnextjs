import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaShare,
} from "react-icons/fa6";
import Image from "next/image";

export default function AuthorMobileCard() {
  return (
    <div className="md:hidden px-4 my-8 space-y-5 ">
      {/* Social Icons Row */}
      <div className="flex justify-between items-center bg-[#f5f5f5] dark:bg-[#171717] px-4 py-2 rounded-xl mb-28">
        <div className="flex gap-3">
          {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp].map((Icon, i) => (
            <span
              key={i}
              className="w-9 h-9 flex items-center justify-center bg-white dark:bg-black rounded-full text-[14px] shadow-sm"
            >
              <Icon />
            </span>
          ))}
        </div>
        <span className="w-9 h-9 flex items-center justify-center bg-white dark:bg-black rounded-full text-[14px] shadow-sm">
          <FaShare />
        </span>
      </div>

      {/* Author Card */}
      <div className="relative bg-[#2b2b2b] text-white rounded-2xl pt-16 pb-5 px-5 space-y-4 text-center">
        {/* Floating Image */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 ">
          <Image
            src="/car-news/author.png"
            alt="Author"
            width={150}
            height={150}
            className="border-4 border-white shadow-md  rounded-2xl"
          />
        </div>

        {/* Author Info */}
        <div>
          <p className="text-[13px] text-gray-400 mb-1">Author</p>
          <h3 className="text-[18px] font-bold">Amit Saraswat</h3>
        </div>

        {/* Bio */}
        <p className="text-[14px] text-gray-200 leading-[1.7]">
          Nikil&apos;s A Huge Fan Of Classic Cars, Especially Italian Beauties Such
          As The Alfa Romeo Giulia Sprint And The Iso Grifo. His Love For Cars
          And Bikes Originated When He First Laid His Eyes On A Poster Of The
          Ferrari F40 And The MV Agusta F4 When He Was Just A Child. He Also
          Loves All Things Analogue, Especially Vintage Cameras And Turntables.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium">
            View Amit Saraswat Profile
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium">
            All Blog Post
          </button>
        </div>

      </div>
    </div>
  );
}
   