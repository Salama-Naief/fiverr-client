import { AspectRatio, Flex, Grid, Paper, Title } from "@mantine/core";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { moreDetails } from "../../utils/data";

const MoreDetails = ({ title, desc }: MoreDetailsProps) => {
  return (
    <div className="my-4">
      <Flex gap="md">
        <BsCheckCircle size={25} className="text-gray-400" />
        <Title order={3} color="gray.7">
          {title}
        </Title>
      </Flex>
      <p className="py-2 text-gray-500 text-xl">{desc}</p>
    </div>
  );
};
function DetailsSection() {
  return (
    <Paper bg={"blue.0"} py={120}>
      <div className="container mx-auto">
        <Grid align={"stretch"}>
          <Grid.Col span={5}>
            <Title order={1} mb={50} color={"gray.8"}>
              A whole world of freelance talent at your fingertips
            </Title>
            {moreDetails.map((item) => (
              <div key={item.id}>
                <MoreDetails id={item.id} title={item.title} desc={item.desc} />
              </div>
            ))}
          </Grid.Col>
          <Grid.Col span={1}></Grid.Col>
          <Grid.Col span={6} className="flex  items-end">
            <iframe
              src="/video/video.mp4"
              title="YouTube video player"
              allowFullScreen={true}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              aria-controls="ss"
              width={"100%"}
              height={400}
            />
          </Grid.Col>
        </Grid>
      </div>
    </Paper>
  );
}

export default DetailsSection;
