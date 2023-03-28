import {
  Badge,
  Button,
  CheckIcon,
  Flex,
  Grid,
  Indicator,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCheck, BsCheckCircle } from "react-icons/bs";

function BusinessSection() {
  return (
    <Paper bg={"#0d084d"} py={120}>
      <div className="container mx-auto text-white">
        <Grid>
          <Grid.Col span={5}>
            <Flex align={"center"} gap="sm">
              <Title order={1} color="white">
                Fiverr business.
              </Title>
              <Badge color="indigo" variant="filled">
                New
              </Badge>
            </Flex>
            <Text fz={35} fw={600} my={"xl"}>
              A business solution designed for teams
            </Text>
            <Title order={3}>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </Title>
            <Flex gap={"md"} my="xl">
              <BsCheckCircle size={25} className="text-gray-400" />
              <Text fz={"lg"}>
                Connect to freelancers with proven business experience
              </Text>
            </Flex>
            <Flex gap={"md"} my="xl">
              <BsCheckCircle size={25} className="text-gray-400" />
              <Text fz={"lg"}>
                Get matched with the perfect talent by a customer success
                manager
              </Text>
            </Flex>
            <Flex gap={"md"} my="xl">
              <BsCheckCircle size={25} className="text-gray-400" />
              <Text fz={"lg"}>
                Manage teamwork and boost productivity with one powerful
                workspace
              </Text>
            </Flex>
            <Link href={"/business"}>
              <button className="transition duration-200 ease-in-out hover:bg-green-600 mt-10 px-6 py-3 bg-green-400 text-white rounded-lg">
                Explore Fiverr Business
              </button>
            </Link>
          </Grid.Col>
          <Grid.Col span={1}></Grid.Col>
          <Grid.Col span={6}>
            <div className="relative w-full h-full">
              <Image src={"/img/business.webp"} fill alt="" />
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </Paper>
  );
}

export default BusinessSection;
