import { Flex, Text, Title } from "@mantine/core";
import { BsCheckLg, BsRecycle } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";

interface TabsDataProps {
  title: string;
  price: number;
  days: number;
  revisions: number;
  desc: string;
  featurs: string[];
}
// function that return data for basic/standard/premium tab
const TapsData = ({
  price,
  days,
  revisions,
  title,
  desc,
  featurs,
}: TabsDataProps) => {
  const data = [
    "Prompt writing",
    "Artwork delivery",
    "Image upscaling",
    "Additional design",
  ];
  return (
    <div className="p-5">
      <Flex justify={"space-between"} align="center">
        <Title order={3}>{title}</Title>
        <Text fw={""} fz={28}>
          ${price}
        </Text>
      </Flex>
      <Text fw={"bold"} my="md" color={"gray.6"}>
        {desc}
      </Text>
      <Flex align={"center"} justify="space-between">
        <Flex align={"center"} gap="xs">
          <MdAccessTime size={22} />
          <Text fw={500}>{days} Days Delivery</Text>
        </Flex>
        <Flex align={"center"} gap="xs">
          <BsRecycle size={20} />
          <Text fw={500}>{revisions} Revisions</Text>
        </Flex>
      </Flex>
      <div className="my-4">
        {featurs.map((feature, index) => (
          <Flex key={index} my="md" gap={"xs"} align="center">
            <BsCheckLg className="text-green-500" />
            <Text color={"gray.5"}>{feature}</Text>
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default TapsData;
