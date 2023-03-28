import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FileButton,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import Moment from "react-moment";
import { useForm } from "@mantine/form";
import React, { useContext, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdErrorOutline, MdLocationPin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";
import Image from "next/image";
import Mygigs from "../../components/MyGigs";
import { useRouter } from "next/router";
import { axiosUrl } from "../../utils/connection";
import { showNotification } from "@mantine/notifications";

function ProfileMe() {
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const [storyBtn, setStoryBtn] = useState<boolean>(false);
  const [descBtn, setDescBtn] = useState<boolean>(false);
  const [langBtn, setLangBtn] = useState<boolean>(false);

  const [storyLoading, setStoryLoading] = useState<boolean>(false);
  const [descLoading, setDescLoading] = useState<boolean>(false);
  const [langLoading, setLangLoading] = useState<boolean>(false);
  const [becomeSeller, setBecomeSeller] = useState<boolean>(false);
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const {
    state: { user },
  } = useContext(Store);
  const [file, setFile] = useState<File | null>(null);

  //story and country form
  const storyForm = useForm({
    initialValues: { story: "", country: "" },
    validate: {
      story: (value) =>
        value.length < 3 ? "story must have at least 3 letters" : null,
      country: (value) =>
        value.length < 3 ? "country must have at least 3 letters" : null,
    },
  });
  //description form
  const DescForm = useForm({
    initialValues: { desc: "" },
    validate: {
      desc: (value) =>
        value.length < 16 ? "description must have at least 16 letters" : null,
    },
  });
  //story and country form
  const addLangForm = useForm({
    initialValues: { languge: "", level: "" },
    validate: {
      languge: (value) => (value.length < 3 ? "add language" : null),
      level: (value) => (value.length < 3 ? "sellect language level " : null),
    },
  });
  //handle story form
  const handleStory = async (story) => {
    try {
      setStoryLoading(true);
      const { data } = await axiosUrl.patch(`/users/${user._id}`, story);
      dispatch({ type: "ADD_USER", payload: data?.user });
      setStoryLoading(false);
      setStoryBtn(false);
    } catch (error) {
      setStoryLoading(false);
      showNotification({
        message: error.response
          ? error.response.data.msg
          : "something went wrong",
        color: "red",
        icon: <MdErrorOutline />,
      });
    }
  };

  //handle desc form
  const handleDesc = async (desc) => {
    try {
      setDescLoading(true);
      const { data } = await axiosUrl.patch(`/users/${user._id}`, desc);
      dispatch({ type: "ADD_USER", payload: data?.user });
      setDescLoading(false);
      setDescBtn(false);
    } catch (error) {
      setDescLoading(false);
      showNotification({
        message: error.response
          ? error.response.data.msg
          : "something went wrong",
        color: "red",
        icon: <MdErrorOutline />,
      });
    }
  };

  //handle desc form
  const handleAddLang = async (lang) => {
    try {
      setLangLoading(true);
      const languages = { languages: [...user?.languages, lang] };
      const { data } = await axiosUrl.patch(`/users/${user._id}`, languages);
      dispatch({ type: "ADD_USER", payload: data?.user });
      setLangLoading(false);
      setLangBtn(false);
    } catch (error) {
      setLangLoading(false);
      showNotification({
        message: error.response
          ? error.response.data.msg
          : "something went wrong",
        color: "red",
        icon: <MdErrorOutline />,
      });
    }
  };

  //handle become seller
  const handleBecomeSeller = async () => {
    try {
      setBecomeSeller(true);

      const { data } = await axiosUrl.patch(`/users/${user._id}`, {
        isSeller: true,
      });
      dispatch({ type: "ADD_USER", payload: data?.user });
      setBecomeSeller(false);
    } catch (error) {
      setBecomeSeller(false);
      showNotification({
        message: error.response
          ? error.response.data.msg
          : "something went wrong",
        color: "red",
        icon: <MdErrorOutline />,
      });
    }
  };

  //handle uplaod image
  const handlimage = async () => {
    if (file) {
      const from = new FormData();
      from.append("image", file);
      try {
        setUploadImage(true);

        const { data } = await axiosUrl.patch(`/users/${user._id}`, from);
        dispatch({ type: "ADD_USER", payload: data?.user });
        setUploadImage(false);
        setFile(null);
      } catch (error) {
        setUploadImage(false);
        showNotification({
          message: error.response
            ? error.response.data.msg
            : "something went wrong",
          color: "red",
          icon: <MdErrorOutline />,
        });
      }
    }
  };

  /* if (!user) {
    router.push("/");
  }*/
  return (
    <Layout title="Profile" indexed={false} description="my profile">
      <Paper py={"xl"} mb="xl" bg={"gray.1"}>
        <div className="container mx-auto">
          <Grid>
            <Grid.Col span={4} p="xl">
              {/**avatar ,story,username and country box */}
              <Box py={"xl"} className="border rounded " bg={"white"}>
                <Center my={"xl"}>
                  <Group position="center">
                    <FileButton
                      onChange={setFile}
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                    >
                      {(props) => (
                        <div className="group relative rounded-full overflow-hidden">
                          <Avatar src={user?.image} radius={100} size={120} />
                          <div
                            {...props}
                            className="cursor-pointer scale-0 group-hover:scale-100 transition duration-200 absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-70 bg-black"
                          >
                            <BsCamera size={45} className="text-white" />
                          </div>
                        </div>
                      )}
                    </FileButton>
                  </Group>
                </Center>
                <Center mt={"sm"}>
                  {file && (
                    <button
                      onClick={handlimage}
                      type="submit"
                      disabled={uploadImage}
                      className={`customBtn ${
                        uploadImage
                          ? "bg-green-200"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {uploadImage ? (
                        <Loader color={"green"} size="sm" />
                      ) : (
                        "Update"
                      )}
                    </button>
                  )}
                </Center>
                <Center>
                  <Text tt={"capitalize"} fz={"xl"} fw="bold">
                    {user?.username}
                  </Text>
                </Center>
                {!storyBtn ? (
                  <Center onClick={() => setStoryBtn(true)} my="md">
                    <HiOutlinePencilSquare
                      size={25}
                      className="text-gray-400 cursor-pointer"
                    />
                  </Center>
                ) : (
                  <form
                    onSubmit={storyForm.onSubmit((e) => handleStory(e))}
                    className="px-6 my-2"
                  >
                    <TextInput
                      {...storyForm.getInputProps("story")}
                      placeholder="whateis your story"
                      defaultValue={user?.story}
                    />
                    <TextInput
                      {...storyForm.getInputProps("country")}
                      placeholder="country"
                      defaultValue={user?.country}
                      my="sm"
                    />
                    <Flex justify={"space-between"} my="md">
                      <Button
                        onClick={() => setStoryBtn(false)}
                        variant="outline"
                        color={"green"}
                      >
                        Cancel
                      </Button>
                      <button
                        type="submit"
                        disabled={storyLoading}
                        className={`customBtn ${
                          !storyForm.isValid() || storyLoading
                            ? "bg-green-200"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {storyLoading ? (
                          <Loader color={"green"} size="sm" />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </Flex>
                  </form>
                )}
                <Center pb="sm">
                  <Text color={"gray.6"}>{user?.story}</Text>
                </Center>
                <Divider />
                <Flex justify={"space-between"} py="sm" px="lg">
                  <Flex gap={"xs"} align={"center"}>
                    <MdLocationPin className="text-gray-600" />
                    <Text color="gray.6">From</Text>
                  </Flex>
                  <Text tt={"capitalize"} fw={"bold"} color="gray.6">
                    {user?.country}
                  </Text>
                </Flex>
                <Flex justify={"space-between"} py="sm" px="lg">
                  <Flex gap={"xs"} align={"center"}>
                    <FaUser className="text-gray-600" />
                    <Text color="gray.6">Member since</Text>
                  </Flex>
                  <Text tt={"capitalize"} fw={"bold"} color="gray.6">
                    <Moment format="YYYY/MM">{user?.createdAt}</Moment>
                  </Text>
                </Flex>
              </Box>
              {/**discription and language box */}
              <Box py={"xl"} my="xl" className="border rounded " bg={"white"}>
                {!descBtn ? (
                  <Flex
                    my="md"
                    px={"md"}
                    align={"center"}
                    justify="space-between"
                  >
                    <Text tt={"capitalize"} fz={"md"} fw="bold">
                      Description
                    </Text>
                    <HiOutlinePencilSquare
                      onClick={() => setDescBtn(true)}
                      size={20}
                      className="text-gray-400 cursor-pointer"
                    />
                  </Flex>
                ) : (
                  <form
                    onSubmit={DescForm.onSubmit((e) => handleDesc(e))}
                    className="px-6 my-2"
                  >
                    <Textarea
                      {...DescForm.getInputProps("desc")}
                      placeholder="Description"
                      label="Description"
                      autosize
                      withAsterisk
                      w={"100%"}
                      size="md"
                      my="md"
                    />

                    <Flex justify={"space-between"} my="md">
                      <Button
                        onClick={() => setDescBtn(false)}
                        variant="outline"
                        color={"green"}
                      >
                        Cancel
                      </Button>
                      <button
                        type="submit"
                        disabled={descLoading}
                        className={`customBtn ${
                          !DescForm.isValid() || descLoading
                            ? "bg-green-200"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {descLoading ? (
                          <Loader color={"green"} size="sm" />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </Flex>
                  </form>
                )}
                <Text p={"md"} color={"gray.6"}>
                  {user?.desc}
                </Text>
                <Divider />
                {!langBtn ? (
                  <Flex
                    my="md"
                    px={"md"}
                    align={"center"}
                    justify="space-between"
                  >
                    <Text tt={"capitalize"} fz={"md"} fw="bold">
                      Languages
                    </Text>
                    <HiOutlinePencilSquare
                      onClick={() => setLangBtn(true)}
                      size={20}
                      className="text-gray-400 cursor-pointer"
                    />
                  </Flex>
                ) : (
                  <form
                    onSubmit={addLangForm.onSubmit((e) => handleAddLang(e))}
                    className="px-6 my-2"
                  >
                    <TextInput
                      {...addLangForm.getInputProps("languge")}
                      placeholder="Add Languge"
                      my="sm"
                    />

                    <Select
                      {...addLangForm.getInputProps("level")}
                      my={"md"}
                      placeholder="Languge Level"
                      styles={(theme) => ({
                        item: {
                          // applies styles to selected item
                          "&[data-selected]": {
                            "&, &:hover": {
                              backgroundColor: theme.colors.green[6],
                              color: theme.colors.white,
                            },
                          },
                        },
                      })}
                      data={[
                        { value: "basic", label: "Basic" },
                        { value: "conversational", label: "Conversational" },
                        { value: "fluent", label: "Fluent" },
                        { value: "native", label: "Native" },
                      ]}
                    />

                    <Flex justify={"space-between"} my="md">
                      <Button
                        onClick={() => setLangBtn(false)}
                        variant="outline"
                        color={"green"}
                      >
                        Cancel
                      </Button>
                      <button
                        disabled={!addLangForm.isValid() || langLoading}
                        type="submit"
                        className={`customBtn ${
                          !addLangForm.isValid() || langLoading
                            ? "bg-green-200"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {langLoading ? (
                          <Loader color={"green"} size="sm" />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </Flex>
                  </form>
                )}
                {user?.languages.map((lang) => (
                  <Flex key={lang._id} align={"center"} gap="md" pb={0} p="md">
                    <Text tt={"capitalize"} fz={"md"} fw="bold">
                      {lang?.languge}
                    </Text>
                    <Text tt={"capitalize"} fz={"md"} color="gray.6">
                      {lang.level}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Grid.Col>

            <Grid.Col span={8}>
              {!user?.isSeller ? (
                <Box p={"xl"} mt="md" className="border rounded " bg={"white"}>
                  <Center>
                    <Image
                      src={"/img/freelancer.svg"}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </Center>
                  <Center>
                    <Text fw={"bold"} color={"gray.6"} fz="xl" my="xl">
                      Ready to earn on your own terms?
                    </Text>
                  </Center>
                  <Center>
                    <button
                      disabled={becomeSeller}
                      onClick={handleBecomeSeller}
                      className="customBtn bg-green-500 hover:bg-green-600"
                    >
                      {becomeSeller ? (
                        <Loader color={"green"} size="sm" />
                      ) : (
                        " Become Seller"
                      )}
                    </button>
                  </Center>
                </Box>
              ) : (
                <Mygigs profile={true} />
              )}
            </Grid.Col>
          </Grid>
        </div>
      </Paper>
    </Layout>
  );
}

export default ProfileMe;
