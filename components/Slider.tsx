import React from "react";
import { Carousel } from "@mantine/carousel";
import { cards } from "../utils/data";
import CatCard from "./cards/CatCard";
import ProjCard from "./cards/ProjCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
function GigsSlider({ data, type }) {
  return (
    <div className="container mx-auto my-32">
      <Carousel
        withIndicators
        height={350}
        slideSize={
          type === "category" ? "20%" : type === "project" ? "25%" : "100%"
        }
        slideGap="sm"
        loop
        align="start"
        slidesToScroll={1}
        styles={{
          control: {
            color: "#990000",
          },
        }}
        controlSize={40}
        nextControlIcon={<BsArrowRight size={25} />}
        previousControlIcon={<BsArrowLeft size={25} />}
      >
        {data.map((card: any, index) => (
          <Carousel.Slide key={index}>
            {type === "category" ? (
              <CatCard card={card} />
            ) : type === "project" ? (
              <ProjCard
                cat={card?.cat}
                id={card?.id}
                img={card.img}
                username={card?.username}
                pp={card?.pp}
              />
            ) : null}
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default GigsSlider;
