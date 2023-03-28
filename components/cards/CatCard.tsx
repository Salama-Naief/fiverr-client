import { Card, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CatCard({ card }: { card: CategoriesProps }) {
  return (
    <Link href={`/gigs?cat=${card.cat}`}>
      <div className="w-full h-full relative rounded overflow-hidden">
        <div className="w-full h-full relative">
          {card.image ? (
            <Image src={card.image} fill alt={card.title} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              looding..
            </div>
          )}
        </div>
        <div className="top-0 left-0 absolute z-10 p-2 text-white">
          <Text fw={470} fz={"lg"}>
            {card.title}
          </Text>
          <Title order={3}>{card.subTitle}</Title>
        </div>
      </div>
    </Link>
  );
}

export default CatCard;
