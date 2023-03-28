import { Flex, Paper, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { exploreData } from "../../utils/data";

const Item = ({
  title,
  img,
  link,
}: {
  link: string;
  title: string;
  img: string;
}) => {
  return (
    <div className="">
      <Link
        href={`/gigs?cat=${link}`}
        className="w-fit group py-10 flex flex-col items-center justify-center"
      >
        <div className="relative w-16 h-16">
          <Image src={img} fill alt={title} />
        </div>
        <div
          className={`w-1/2 h-0.5 bg-gray-400 group-hover:scale-100 scale-x-50 group-hover:bg-green-600 mt-2 transition duration-300 ease-in-out`}
        ></div>
        <Title order={6} my="sm" color={"gray.7"}>
          {title}
        </Title>
      </Link>
    </div>
  );
};
function ExploreSecton() {
  return (
    <div className=" container mx-auto">
      <Paper my={120}>
        <Title color={"gray.7"} mb="xl">
          Explore the marketplace
        </Title>
        <div className="flex flex-wrap ">
          {exploreData.map((item) => (
            <div key={item.id} className="w-1/5 flex justify-center">
              <Item title={item.title} link={item.link} img={item.img} />
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default ExploreSecton;
