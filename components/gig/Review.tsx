import {
  Avatar,
  Divider,
  Flex,
  Group,
  Paper,
  Rating,
  Skeleton,
  Text,
} from "@mantine/core";
import Flag from "react-world-flags";

import Image from "next/image";
import React, { use } from "react";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import Moment from "react-moment";
import { useQuery } from "react-query";
import { axiosUrl } from "../../utils/connection";

function Review({ data }: { data: ReviewProps }) {
  return (
    <Paper p={"xl"}>
      <Flex gap="sm">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image src={data.user?.image} fill loading="lazy" alt="" />
        </div>
        <div>
          <Text fz={"lg"} fw="bold" tt={"capitalize"}>
            {data.user.username}
          </Text>
          <Flex align={"center"} gap="sm">
            <div className="relative w-10 h-fit ">
              <Flag code={"Eg"} />
            </div>
            <Text fw={"bold"} color="gray.6" tt={"capitalize"}>
              {data.user.country}
            </Text>
          </Flex>

          <Group position="left" my={"xl"}>
            <Rating value={data.rating} fractions={2} readOnly />
            <span className="text-yellow-500">{data.rating}</span>
            <Divider orientation="vertical" />
            <span className="text-gray-500">
              <Moment fromNow>{data.createdAt}</Moment>
            </span>
          </Group>

          <Text fz={"lg"} color="gray.6">
            {data.desc}
          </Text>
          <Flex align={"center"} gap="lg" my={"md"} className="text-gray-600">
            Helpful?
            <span className="flex gap-x-2 items-center cursor-pointer">
              <BsFillHandThumbsDownFill /> No
            </span>{" "}
            <span className="flex gap-x-2 items-center cursor-pointer">
              <BsFillHandThumbsUpFill />
              Yes
            </span>
          </Flex>
        </div>
      </Flex>
    </Paper>
  );
}

export default Review;
