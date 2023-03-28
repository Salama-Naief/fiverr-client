import { Divider, Flex, Paper, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { footerData, footerIcons } from "../utils/data";

function Footer() {
  return (
    <Paper>
      <div className="container mx-auto">
        <Flex justify={"space-between"} className="capitalize">
          {footerData.map((data, index) => (
            <div key={index}>
              <Title order={4} mb="xl" color={"gray.8"}>
                {data.title}
              </Title>
              {data?.items?.map((item, index) => (
                <div
                  key={index}
                  className="text-gray-500 hover:text-gray-800 hover:underline transition duration-150 capitalize my-3 text-lg"
                >
                  <Link
                    href={`/${item.trim().replace(" ", "-").toLowerCase()}`}
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </Flex>
        <Divider />
        <Flex justify={"space-between"} align="center" py={"xl"}>
          <div className="flex items-baseline gap-x-4">
            <Title color={"gray.6"}>
              Fiverr<span className="text-sm">&reg;</span>
            </Title>
            <Text fz={"lg"} color={"gray.6"}>
              &copy; Fiverr International Ltd. 2023
            </Text>
          </div>
          <div className="flex items-center space-x-10">
            <div className="flex items-center gap-x-5">
              {footerIcons.social.map((icon, index) => (
                <div key={index} className="cursor-pointer">
                  <Image
                    src={icon.src}
                    width={icon.width * (3 / 4)}
                    height={icon.height * (3 / 4)}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-x-5 items-center">
              {footerIcons.icons.map(({ icon, name }, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <Image
                    src={icon.src}
                    width={icon.width * (3 / 4)}
                    height={icon.height * (3 / 4)}
                    alt={name}
                  />
                  <Text color={"gray.7"}>{name}</Text>
                </div>
              ))}
            </div>
          </div>
        </Flex>
      </div>
    </Paper>
  );
}

export default Footer;
