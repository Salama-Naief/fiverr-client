import { Divider, Flex, Loader, Paper, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomBtn from "../../components/CustomBtn";
import Layout from "../../components/Layout";
import Message from "../../components/Message";
import { axiosUrl } from "../../utils/connection";
import { Store } from "../../utils/Store";

function SingleMessage() {
  const {
    state: { user },
  } = useContext(Store);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    isLoading,
    error,
    data: massages,
    refetch,
  } = useQuery({
    queryKey: ["messaes"],
    queryFn: () =>
      axiosUrl.get(`/messages/${router.query.id}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    router.push("/login");
    refetch();
  }, [user]);
  const form = useForm({
    initialValues: { message: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      message: (value) => (value.length ? null : "please enter message frist"),
    },
  });

  const handleSubmite = async (info) => {
    try {
      const msg = {
        conversationId: router.query.id,
        desc: info.message,
      };
      setLoading(true);

      await axiosUrl.post("/messages", msg);
      setLoading(false);
      refetch();
    } catch (error) {
      setLoading(false);
      showNotification({
        message: error.rerrorsponse
          ? error.response.data.msg
          : "something went wrong",
        color: "red",
      });
    }
  };

  return (
    <Layout
      title="user messages"
      indexed={false}
      description="user message page"
    >
      <Paper my={60} className="container mx-auto px-32">
        {!error && isLoading ? (
          <div className="w-full h-96 flex items-center justify-center">
            <Loader size={"md"} color="green" />
          </div>
        ) : massages.length < 0 ? (
          <div className="w-full h-64 flex justify-center items-center text-green-500">
            Say hi to the customer
          </div>
        ) : (
          massages.map((msg) => {
            return (
              <div key={msg._id}>
                <Message
                  message={msg.desc}
                  currentUser={user}
                  userId={msg.userId}
                />
              </div>
            );
          })
        )}

        <Divider my={50} />
        <form
          onSubmit={form.onSubmit((e) => handleSubmite(e))}
          className="my-4"
        >
          <Flex justify={"space-between"} gap="xl">
            <Textarea
              placeholder="enter your message"
              className="flex-1"
              minRows={2}
              radius="md"
              size="lg"
              {...form.getInputProps("message")}
            />
            <button
              disabled={loading}
              className={`customBtn h-fit ${
                loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? <Loader /> : " Send"}
            </button>
          </Flex>
        </form>
      </Paper>
    </Layout>
  );
}

export default SingleMessage;
