import {
  ActionIcon,
  Button,
  Center,
  Divider,
  FileButton,
  Flex,
  Grid,
  Group,
  List,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsCloudUpload, BsPlusLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQuery } from "react-query";
import Layout from "../../../components/Layout";
import { axiosUrl } from "../../../utils/connection";
import { categories, otherCategories } from "../../../utils/data";

function GigUpdate({ gig }) {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[] | Blob[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Basic");
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //validte form
  const form = useForm({
    initialValues: {
      title: gig ? gig.title : "",
      description: gig ? gig.description : "",
      category: gig ? gig.category : [],
      Basic: {
        title: gig ? gig.Basic.title : "",
        description: gig ? gig.Basic.description : "",
        price: gig ? gig.Basic.price : 0,
        deliveryTime: gig ? gig.Basic.deliveryTime : 0,
        revisionNumber: gig ? gig.Basic.revisionNumber : 0,
        features: gig ? gig.Basic.features : [],
      },
      Standrad: {
        title: gig ? gig.Standrad.title : "",
        description: gig ? gig.Standrad.description : "",
        price: gig ? gig.Standrad.price : 0,
        deliveryTime: gig ? gig.Standrad.deliveryTime : 0,
        revisionNumber: gig ? gig.Standrad.revisionNumber : 0,
        features: gig ? gig.Standrad.features : [],
      },
      Premium: {
        title: gig ? gig.Premium.title : "",
        description: gig ? gig.Premium.description : "",
        price: gig ? gig.Premium.price : 0,
        deliveryTime: gig ? gig.Premium.deliveryTime : 0,
        revisionNumber: gig ? gig.Premium.revisionNumber : 0,
        features: gig ? gig.Premium.features : [],
      },
    },

    validate: {
      title: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,

      description: (value) =>
        value.length ? null : "please enter description",
      category: (value) => (value.length ? null : "please choose category"),
      Basic: {
        title: (value) =>
          value.length < 3 ? "Name must have at least 3 letters" : null,

        description: (value) =>
          value.length ? null : "please enter description",
        price: (value) => (value > 0 ? null : "choose the price"),
        deliveryTime: (value) =>
          value > 0 ? null : "choose the delivery time",
        revisionNumber: (value) =>
          value > 0 ? null : "choose the revision number",
        features: (value) =>
          value.length ? null : "at least choose one feature",
      },
      Premium: {
        title: (value) =>
          value.length < 3 ? "Name must have at least 3 letters" : null,

        description: (value) =>
          value.length ? null : "please enter description",
        price: (value) => (value > 0 ? null : "choose the price"),
        deliveryTime: (value) =>
          value > 0 ? null : "choose the delivery time",
        revisionNumber: (value) =>
          value > 0 ? null : "choose the revision number",
        /* features: (value) =>
            value.length > 0 ? null : "at least choose one feature",*/
      },
      Standrad: {
        title: (value) =>
          value.length < 3 ? "Name must have at least 3 letters" : null,

        description: (value) =>
          value.length ? null : "please enter description",
        price: (value) => (value > 0 ? null : "choose the price"),
        deliveryTime: (value) =>
          value > 0 ? null : "choose the delivery time",
        revisionNumber: (value) =>
          value > 0 ? null : "choose the revision number",
        /* features: (value) =>
            value.length > 0 ? null : "at least choose one feature",*/
      },
    },
  });

  //add gig to server
  const handleSubmite = async (dataInfo) => {
    const formData = new FormData();
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    if (images) {
      images?.map((img) => {
        formData.append("images", img);
      });
    }

    formData.append("data", JSON.stringify(dataInfo));

    try {
      setLoading(true);
      const { data } = await axiosUrl.patch(
        `/gigs/${router.query.id}`,
        formData
      );
      showNotification({
        message: "gig is updated succesfully",
        color: "green",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showNotification({
        message: error.response
          ? error.response.data.msg
          : "error in update gig",
        color: "red",
      });
    }
  };

  return (
    <Layout title="update gig" indexed={false} description="update gig page">
      <Paper my={60} className="container mx-auto">
        <Title order={2} color="gray.8" my="xl">
          Add Gig
        </Title>

        <form onSubmit={form.onSubmit((e) => handleSubmite(e))}>
          <Grid align={"stretch"}>
            <Grid.Col span={6}>
              <TextInput
                {...form.getInputProps("title")}
                placeholder="e.g i will do something Iam ready good at"
                label="Title"
                withAsterisk
                size="md"
                my="md"
              />

              <Textarea
                {...form.getInputProps("description")}
                placeholder="Description"
                label="Description"
                autosize
                withAsterisk
                w={"100%"}
                size="md"
                my="md"
              />
              <MultiSelect
                data={[...categories, ...otherCategories]}
                {...form.getInputProps("category")}
                label="Category"
                placeholder="web developer"
                defaultValue={["fff", "lll"]}
              />

              <Flex gap={"lg"} align="center">
                <Group position="center" my="md">
                  <FileButton
                    onChange={setCoverImage}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                  >
                    {(props) => (
                      <Button
                        variant="outline"
                        color={"green.6"}
                        {...props}
                        rightIcon={<BsCloudUpload size={20} />}
                      >
                        Cover image
                      </Button>
                    )}
                  </FileButton>
                </Group>

                {coverImage && (
                  <Text size="sm" align="center" mt="sm">
                    Picked file: {coverImage.name}
                  </Text>
                )}
              </Flex>
              <Flex gap={"lg"}>
                <Group my="md">
                  <FileButton
                    onChange={setImages}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                  >
                    {(props) => (
                      <Button
                        variant="outline"
                        color={"green.6"}
                        rightIcon={<BsCloudUpload size={20} />}
                        {...props}
                      >
                        images
                      </Button>
                    )}
                  </FileButton>
                </Group>

                {images.length > 0 && (
                  <Center>
                    <List size="sm" mt={5} withPadding>
                      {images.map((img, index) => (
                        <List.Item key={index}>{img.name}</List.Item>
                      ))}
                    </List>
                  </Center>
                )}
              </Flex>
              {errMsg && <Text color={"red"}>{errMsg}</Text>}
              <button
                disabled={!form.isValid() || loading}
                className={`${
                  !form.isValid() || loading
                    ? "bg-green-200"
                    : " bg-green-500 hover:bg-green-600"
                } customBtn w-full my-16`}
              >
                {loading ? "please wiat until upload imges.." : "Create Gig"}
              </button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Tabs
                value={activeTab}
                onTabChange={setActiveTab}
                color="green"
                defaultValue="Basic"
                className="border"
              >
                <Tabs.List grow fz={"xl"}>
                  <Tabs.Tab
                    fw={"bold"}
                    fz={"md"}
                    value="Basic"
                    color={"green.6"}
                  >
                    <Text color={activeTab === "Basic" ? "green.6" : "gray.8"}>
                      Basic
                    </Text>
                  </Tabs.Tab>
                  <Divider orientation="vertical" />
                  <Tabs.Tab
                    fw={"bold"}
                    fz={"md"}
                    value="Standrad"
                    color={"green.6"}
                  >
                    <Text
                      color={activeTab === "Standrad" ? "green.6" : "gray.8"}
                    >
                      Standrad
                    </Text>
                  </Tabs.Tab>
                  <Divider orientation="vertical" />
                  <Tabs.Tab
                    fw={"bold"}
                    fz={"md"}
                    value="Premium"
                    color={"green.6"}
                  >
                    <Text
                      color={activeTab === "Premium" ? "green.6" : "gray.8"}
                    >
                      Premium
                    </Text>
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Basic" p="sm">
                  <FeatureForm
                    featuresData={form.values.Basic.features}
                    form={form}
                    type={"Basic"}
                  />
                </Tabs.Panel>

                <Tabs.Panel value="Standrad" p="sm">
                  <FeatureForm
                    featuresData={form.values.Standrad.features}
                    form={form}
                    type={"Standrad"}
                  />
                </Tabs.Panel>

                <Tabs.Panel value="Premium" p="sm">
                  <FeatureForm
                    featuresData={form.values.Premium.features}
                    form={form}
                    type={"Premium"}
                  />
                </Tabs.Panel>
              </Tabs>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
    </Layout>
  );
}

const FeatureForm = ({ form, type, featuresData }) => {
  const [features, setFeatures] = useState<string[]>(
    featuresData ? featuresData : ["feature-0"]
  );

  const handelAddFeatues = () => {
    setFeatures((prev) => [...prev, `feature-${features.length}`]);
  };

  const handelRemoveFeatues = (feature: string) => {
    const remainFreatures: string[] = features.filter((f) => f !== feature);

    setFeatures(remainFreatures);
  };
  return (
    <>
      <TextInput
        {...form.getInputProps(`${type}.title`)}
        placeholder="e.g one-page web design"
        label="Service Title"
        withAsterisk
        my="md"
      />
      <Textarea
        {...form.getInputProps(`${type}.description`)}
        placeholder="Service description"
        label="Service Description"
        autosize
        withAsterisk
        w={"100%"}
        my="md"
      />
      <NumberInput
        {...form.getInputProps(`${type}.deliveryTime`)}
        defaultValue={0}
        placeholder="e.g. 3 days"
        label="Delivery Time (e.g. 3 days)"
        withAsterisk
        hideControls
        my="md"
      />
      <NumberInput
        {...form.getInputProps(`${type}.revisionNumber`)}
        defaultValue={0}
        placeholder="e.g. 3 days"
        label="Revision Number"
        withAsterisk
        hideControls
        my="md"
      />
      <NumberInput
        {...form.getInputProps(`${type}.price`)}
        defaultValue={0}
        placeholder="e.g. 3 days"
        label="price"
        withAsterisk
        hideControls
        my="md"
      />
      <Text fz={"lg"} fw="bold" color={"gray.6"}>
        Add Features
      </Text>
      {features.map((feature, index) => (
        <Flex key={index} align={"center"} gap="md" my={"sm"}>
          <TextInput
            {...form.getInputProps(`${type}.features.${index}`)}
            className="flex-1"
            placeholder="e.g page design"
          />
          <ActionIcon onClick={() => handelRemoveFeatues(feature)}>
            <RxCross2 className="text-red-500" size={20} />
          </ActionIcon>
        </Flex>
      ))}

      <Center>
        <Button onClick={handelAddFeatues} variant="outline" color="green.6">
          <BsPlusLg />
        </Button>
      </Center>
    </>
  );
};

export const getServerSideProps: any = async (req, res) => {
  try {
    const id = req.params?.id;
    const { data } = await axiosUrl.get(`/gigs/gig/${id}`);

    return {
      props: {
        gig: data,
        errMsg: "",
      },
    };
  } catch (error) {
    return {
      props: {
        errMsg: error.response
          ? error.response.data.msg
          : "something went wrong",
      },
    };
  }
};
export default GigUpdate;
