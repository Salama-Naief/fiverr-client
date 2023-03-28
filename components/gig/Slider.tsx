import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { Modal } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight, BsFullscreen } from "react-icons/bs";

const Slider = ({ images }) => {
  const TRANSITION_DURATION = 200;
  const [opened, setOpened] = useState(false);
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return (
    <div className="rounded overflow-hidden my-6">
      <Carousel
        withIndicators
        withControls
        height={450}
        slideGap="sm"
        loop
        align="start"
        slidesToScroll={1}
        styles={{
          root: {
            backgroundColor: "gray.2",
          },
          control: {
            color: "#990000",
          },
        }}
        controlSize={40}
        nextControlIcon={<BsArrowRight size={25} />}
        previousControlIcon={<BsArrowLeft size={25} />}
      >
        {images.map((img: string, index: number) => (
          <Carousel.Slide
            onClick={() => setOpened(true)}
            key={index}
            size="100%"
            className="group relative"
          >
            <Image
              src={img}
              width={256}
              height={256}
              layout="responsive"
              objectPosition="center"
              alt=""
              loading="lazy"
              className="group-hover:scale-105 transition duration-200 ease-in-out"
            />
            <div className="hidden z-10 group-hover:block absolute  top-0 lef-0 w-full h-full opacity-50 bg-black">
              <div className="w-full text-right px-10 text-white text-xl flex justify-end gap-4 items-center py-4">
                <BsFullscreen /> Full Screen
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Modal
        opened={opened}
        size={"fit"}
        withCloseButton={false}
        onClose={() => setOpened(false)}
      >
        <Carousel
          loop
          bg={"gray.3"}
          getEmblaApi={setEmbla}
          styles={{
            root: {
              backgroundColor: "gray.2",
            },
            control: {
              color: "#990000",
            },
          }}
          nextControlIcon={<BsArrowRight size={25} />}
          previousControlIcon={<BsArrowLeft size={25} />}
          maw={500}
        >
          {images.map((img: string, index: number) => (
            <Carousel.Slide key={index} bg="gray.6" size="100%" h={"100%"}>
              <Image
                src={img}
                width={256}
                height={256}
                layout="responsive"
                objectPosition="center"
                alt=""
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default Slider;
