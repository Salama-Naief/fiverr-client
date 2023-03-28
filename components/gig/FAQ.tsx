import { Accordion, Title } from "@mantine/core";
import React from "react";

function FAQ() {
  return (
    <div className="my-20">
      <Title my="sm" order={2}>
        FAQ
      </Title>
      <Accordion
        defaultValue=""
        styles={{
          control: {
            color: "#3a3c3",
          },
          item: {
            color: "#868e96",
          },
        }}
      >
        <Accordion.Item value="customization">
          <Accordion.Control fz={"xl"}>
            What if your requirements does not meet any of my package?
          </Accordion.Control>
          <Accordion.Panel fz={"lg"}>
            Dont worry, just contact me and we will discuss your requirements
            and will come up with a customized package or cost.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flexibility">
          <Accordion.Control fz={"xl"}>
            What I need from you before starting the work?
          </Accordion.Control>
          <Accordion.Panel fz={"lg"}>
            I will content from you that I will put on the site. You also need
            to have domain and hosting and I may need access to both accounts.
            If you can provide me the pictures that will be great otherwise, I
            can arrange pictures too.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus-ring">
          <Accordion.Control fz={"xl"}>
            What if you dont have any content ready to put on the site?
          </Accordion.Control>
          <Accordion.Panel fz={"lg"}>
            I will then create the site using dummy content and once the website
            design is completed, then you can update the content later when you
            have it ready. I will build the site using a drag and drop visual
            builder so it will be really easy for you to manage and do the
            update on your site.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FAQ;
