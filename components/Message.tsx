import { Avatar, Box, Flex, Skeleton, Text } from "@mantine/core";

import React, { useContext, useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { axiosUrl } from "../utils/connection";
import { Store } from "../utils/Store";

function Message({ userId, message, currentUser }) {
  const [err, setErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [client, setClient] = useState(null);

  useEffect(() => {
    axiosUrl
      .get(`/users/user/${userId}`)
      .then((res) => {
        setClient(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setErr(true);
        showNotification({
          message: e.response ? e.response.data.msg : "something went wrong",
        });
        setIsLoading(false);
      });
  }, [userId]);
  if (err) {
    return;
  }
  return (
    <Flex
      gap={"lg"}
      direction={userId === currentUser._id ? "row-reverse" : "row"}
      my="md"
    >
      {isLoading ? (
        <Skeleton radius={100} />
      ) : (
        <>
          <Avatar
            src={userId === currentUser._id ? currentUser.image : client?.image}
            size={"lg"}
            radius="xl"
          />

          <div
            className={`${
              userId === currentUser._id
                ? "bg-blue-600 text-white rounded-tl-2xl rounded-br-2xl rounded-tr rounded-bl"
                : "rounded-tr-2xl rounded-bl-2xl rounded-tl rounded-br bg-gray-100 text-gray-800"
            } max-w-xl p-3 text-lg`}
          >
            {message}
          </div>
        </>
      )}
    </Flex>
  );
}

export default Message;
