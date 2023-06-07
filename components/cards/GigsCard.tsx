import {
  Avatar,
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsHeartFill } from "react-icons/bs";
import { useQuery } from "react-query";
import Star from "../../public/img/star.png";
import { axiosUrl } from "../../utils/connection";
function GigsCard({ card }: { card: GigsProps }) {
  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden border shadow-md">
      <div className="flex-1">
        <Link href={`/gig/${card._id}`}>
          <div className="w-full h-56 relative ">
            <Image src={card.coverImage} fill alt="Norway" />
          </div>
        </Link>

        <Flex gap={"sm"} mt="xl" px="md" align={"center"}>
          {card.user?.image && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={card.user?.image} fill loading="lazy" alt="" />
            </div>
          )}
          <Title tt={"capitalize"} order={6}>
            {card.user?.username}
          </Title>
        </Flex>

        <Link href={`/gig/${card._id}`}>
          <Text
            my={"sm"}
            px="md"
            className="transition duration-150 hover:text-green-500"
          >
            {card.title}
          </Text>
        </Link>
      </div>
      <div>
        <div className="px-4">
          <div className="flex items-center gap-2 pb-2">
            <Image
              src={Star.src}
              width={Star.width * 0.5}
              height={Star.height * 0.5}
              alt={card.title}
            />
            <span className="font-bold text-yellow-500 ">
              {card.averageRating}
            </span>
            <span className="text-gray-500">({card.numOfReviews})</span>
          </div>
        </div>
        <Divider />
        <Flex p={"xs"} justify="space-between" align={"center"}>
          <BsHeartFill className="text-gray-500" size={18} />
          <div className="flex gap-x-2 items-center">
            <Text fz={"xs"} color={"gray.6"}>
              STARTING AT
            </Text>
            <Text color={"gray.6"} fz="md" className="text-center font-bold">
              $ {card.Basic.price}
            </Text>
          </div>
        </Flex>
      </div>
    </div>
  );
}

export default GigsCard;
