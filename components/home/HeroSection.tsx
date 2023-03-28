import {
  Autocomplete,
  Button,
  Chip,
  Flex,
  Grid,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { popularItems } from "../../utils/data";
function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    if (search) {
      router.push(`/gigs?search=${search}`);
    }
  };
  return (
    <section className="h-[720px] w-full bg-[#013914] text-white">
      <Grid grow align={"stretch"} className="h-full container mx-auto">
        <Grid.Col span={6} className="my-auto ">
          <Text fz={50} fw={650}>
            Find the perfect{" "}
            <span className="italic font-mono text-[2.8rem]">freelance</span>{" "}
            services for your business
          </Text>
          <Flex align={"center"} my="lg">
            <Autocomplete
              placeholder="Pick one"
              icon={<BsSearch />}
              withAsterisk
              data={["design", "wordPress", "logo"]}
              className="flex-1"
              size="lg"
              sx={{ borderRadius: "0" }}
              radius="xs"
              value={search}
              onChange={setSearch}
            />
            <button
              onClick={handleSearch}
              className="hover:bg-green-600 px-6 py-4 bg-green-500 rounded-tr-md rounded-br-lg"
            >
              Search
            </button>
          </Flex>
          <Flex gap={"md"}>
            <Text fz={"md"} className="font-medium">
              Popular:
            </Text>
            {popularItems.map((item, index) => (
              <Link href={`/gigs?cat=${item.link}`} key={index}>
                <Text
                  fz={"md"}
                  className="rounded-xl border border-white px-3 hover:bg-white hover:text-black font-medium transition duration-200"
                >
                  {item.title}
                </Text>
              </Link>
            ))}
          </Flex>
        </Grid.Col>
        <Grid.Col span={6} p={0} className="relative">
          <div className="absolute bottom-0 right-0 w-full h-[85%]">
            <Image src={"/img/man.png"} fill alt="" />
          </div>
        </Grid.Col>
      </Grid>
    </section>
  );
}

export default HeroSection;
