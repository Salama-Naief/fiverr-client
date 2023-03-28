import React, { useState } from "react";
import {
  CheckIcon,
  Flex,
  Loader,
  Rating,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { axiosUrl } from "../../utils/connection";
import { showNotification } from "@mantine/notifications";
import { MdErrorOutline } from "react-icons/md";
function ReviewForm({ gigId, refech }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const form = useForm({
    initialValues: { desc: "", rating: 5 },

    // functions will be used to validate values at corresponding key
    validate: {
      desc: (value) => (value.length > 0 ? null : "please enter your message"),
      rating: (value) => (value > 0 ? null : "please sellect your rating"),
    },
  });
  const handleSubmite = async (e) => {
    try {
      if (!gigId) return;

      const reviewData = {
        rating: e.rating,
        desc: e.desc,
        gigId,
      };
      setLoading(true);
      const { data } = await axiosUrl.post("/reviews", reviewData);
      showNotification({
        message: "your review is added",
        color: "green",
        icon: <CheckIcon />,
      });
      refech();
      setLoading(false);
    } catch (error) {
      setErrMsg(error?.response?.data?.msg);
      setLoading(false);
      showNotification({
        message: error.response
          ? error.response.data.msg
          : "error in creating your gig please try again",
        color: "red",
        icon: <MdErrorOutline />,
      });
    }
  };
  return (
    <form
      onSubmit={form.onSubmit((e) => handleSubmite(e))}
      className="w-3/4 mx-auto my-6 p-4 border rounded"
    >
      {errMsg && (
        <Text p={"xs"} color="red">
          {errMsg}
        </Text>
      )}
      <Flex align={"center"} gap="sm">
        <Text color={"gray.6"}>Rating :</Text>
        <Rating fractions={2} {...form.getInputProps("rating")} />
      </Flex>
      <Textarea
        {...form.getInputProps("desc")}
        placeholder="your feed back"
        label="Feedback"
        autosize
        withAsterisk
        w={"100%"}
        size="md"
        my="md"
      />
      <div className="text-right">
        <button
          type="submit"
          disabled={loading || !form.isValid()}
          className={`${
            loading || !form.isValid()
              ? "bg-green-300"
              : "bg-green-500 hover:bg-green-600"
          } customBtn`}
        >
          {loading ? <Loader color={"green"} /> : " Submit"}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
