import { Box, Button, Title } from "@mantine/core";
import { redirect } from "next/navigation";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { axiosUrl } from "../utils/connection";
import confettiIcon from "../public/img/confetti.png";
import Confetti from "../components/Confetti";
import Image from "next/image";
import Link from "next/link";
import { Store } from "../utils/Store";
import { showNotification } from "@mantine/notifications";
import { MdErrorOutline } from "react-icons/md";
function Success() {
  const {
    state: { user },
  } = useContext(Store);
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (router.query.payment_intent) {
      dataFetchedRef.current = true;

      axiosUrl
        .patch("/orders/confirm", {
          payment_intent: router.query.payment_intent,
        })
        .then((res) => res.data)
        .then((data) => setOrder(data))
        .catch((error) => {
          showNotification({
            message: error.response
              ? error.response.data.msg
              : "error in creating your gig please try again",
            color: "red",
            icon: <MdErrorOutline />,
          });
        });
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Box bg={"gray.1"} className="rounded-md w-1/2  text-center" p="xl">
        <Confetti />
        <Image
          src={confettiIcon.src}
          width={confettiIcon.width}
          height={confettiIcon.height}
          alt=""
          className="mx-auto"
        />

        <Title my={"xl"} order={2}>
          Thank you for your order
        </Title>
        <div className="flex justify-around">
          {order && (
            <Link href={`/gig/${order.gigId}`}>
              <Button variant="outline" color={"green.6"}>
                Your feedBack
              </Button>
            </Link>
          )}
          <Link href={`/orders`}>
            <Button variant="outline" color={"green.6"}>
              Your orders
            </Button>
          </Link>
        </div>
      </Box>
    </div>
  );
}

export const getServerSideProps: any = async (req: Request, res) => {
  return {
    props: {},
  };
};
export default Success;
