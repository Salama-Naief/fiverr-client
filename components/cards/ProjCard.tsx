import { Avatar, Badge, Card, Flex, Group, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProjCard({ cat, id, img, pp, username }: ProjCardProps) {
  return (
    <div className="rounded-lg overflow-hidden border pb-4 shadow-md">
      <Link href={"/"}>
        <div className="w-full h-64 relative ">
          <Image src={img} fill alt="Norway" />
        </div>

        <Flex gap={"md"} mt="xl" px="md" align={"center"}>
          <Avatar src={pp} size={"md"} radius={"xl"} />
          <div>
            <Title order={6}>{username}</Title>
            <Text fz={"sm"}>{cat}</Text>
          </div>
        </Flex>
      </Link>
    </div>
  );
}

export default ProjCard;
