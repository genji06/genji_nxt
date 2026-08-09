import {  motion } from "motion/react";
import { useState, useEffect } from "react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";

type GalleryImage = {
  src: string;
  description: string;
};


type GalleryProps = {
  images: GalleryImage[];
};



function Gallery({
  images,
}: GalleryProps): React.ReactElement {


  const [open, setOpen] = useState<boolean>(false);

  const [current, setCurrent] = useState<number>(0);



  function nextImage(): void {

    setCurrent((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );

  }



  function prevImage(): void {

    setCurrent((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );

  }

    useEffect(() => {

      function handleKeyDown(event: KeyboardEvent) {

        if (!open) return;

        if (event.key === "ArrowRight") {
          nextImage();
        }

        if (event.key === "ArrowLeft") {
          prevImage();
        }

        if (event.key === "Escape") {
          setOpen(false);
        }

      }

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };

    }, [open]);



      return (
        <>

    <motion.div

      whileTap={{
        scale: 0.95,
      }}

      transition={{
        duration: 0.2,
      }}

      className="w-full max-w-sm sm:max-w-md lg:max-w-lg border border-sky-500/20 bg-white/[0.03] rounded-2xl p-3 cursor-pointer hover:border-sky-400/50 transition">

    <div className="flex justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-sky-500/10 border border-sky-400/20">
          <PhotoIcon className="w-4 h-4 text-sky-300" />
        </div>


        <p className="text-sky-300 font-semibold">
          HIGHLIGHTS
        </p>
      </div>

      <span className="text-xs text-sky-400">
        {images.length} photos
      </span>
    </div>



        <div className="flex gap-2 overflow-hidden">
          {
            images
              .slice(0, 6)
              .map((img, index) => (

              <motion.img
                key={index}
                src={img.src}
                alt={img.description}
                onClick={() => {
                  setCurrent(index);
                  setOpen(true);
                }}

                whileHover={{ scale: 1.04, }}
                transition={{ duration: 0.2, }}
                className="w-32 h-20 object-cover rounded-xl border border-sky-500/20 cursor-pointer "/>
              ))
          }
        </div>

              <motion.button
                type="button"onClick={() => setOpen(true)}
                whileHover={{scale: 1.05,}}

                whileTap={{scale: 0.95,}}

                transition={{duration: 0.2,}}

                className="mt-3 text-xs text-blue-300 px-3 py-1.5 rounded-lg border border-sky-500/20 hover:text-sky-300 hover:border-sky-400/50 transition">
                Click to view all →
              </motion.button>
      </motion.div>

      {
        open && (

          <div className=" fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-white">
              <XMarkIcon className="w-8" />
            </button>


            <button
              onClick={prevImage}
              className="absolute left-5 text-white">
              <ChevronLeftIcon className="w-10" />
            </button>
            <div className="flex flex-col items-center">


            <motion.img
              key={current}
              src={images[current].src}
              alt={images[current].description}

              drag="x"

              dragConstraints={{
                left: 0,
                right: 0,
              }}

              dragElastic={0.3}

              onDragEnd={(event, info) => {

                if (info.offset.x < -100) {
                  nextImage();
                }

                if (info.offset.x > 100) {
                  prevImage();
                }

              }}

              initial={{
                opacity: 0,
                x: 100,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              exit={{
                opacity: 0,
                x: -100,
              }}

              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}

              className="
                max-h-[80vh]
                max-w-[90vw]
                rounded-xl
                touch-pan-y
                cursor-grab
                active:cursor-grabbing
              "
            />

              <p className="text-blue-200 text-sm sm:text-sm md:text-base lg:text-sm text-center mt-4 max-w-xl px-1">
                {images[current].description}
              </p>
            </div>


            <button
              onClick={nextImage}
              className="absolute right-5 text-white">
              <ChevronRightIcon className="w-10" />
            </button>

          </div>
        )
      }
    </>
  );
}

export default Gallery;