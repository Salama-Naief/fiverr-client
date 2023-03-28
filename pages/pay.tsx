import React, { useState, useEffect, useContext, useRef } from "react";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import "../styles/pay.module.css";
import { axiosUrl } from "../utils/connection";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import { Center, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_stripe_public_key}`
);

export default function App() {
  const {
    state: { order, user },
  } = useContext(Store);
  const [clientSecret, setClientSecret] = useState<string>("");
  const router = useRouter();
  const [errMsg, setErrMsg] = useState<string>("");
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (order && stripePromise && user) {
      dataFetchedRef.current = true;
      axiosUrl
        .post("/orders/intent", {
          gigId: order.id,
          qty: order.qty,
          gigType: order.gigType,
        })
        .then((res) => res.data)
        .then((data) => setClientSecret(data.clientSecret))
        .catch((e) => {
          if (e.response && e.response.data && e.response.data.msg) {
            setErrMsg(e.response.data.msg);
          } else {
            setErrMsg("something went wrong");
          }
        });
    }
  }, []);

  const appearance: Appearance = {
    theme: "flat",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center mt-8">
      {errMsg && (
        <Center>
          <Text fw={"bold"} fz="lg" color={"red"}>
            {errMsg}
          </Text>
        </Center>
      )}
      <Flex gap={"lg"}>
        {order && (
          <div className="p-4 border rounded-lg">
            <div className="relative w-full h-52 rounded overflow-hidden">
              <Image src={order.coverImage} fill alt={order.title} />
            </div>

            <Title order={5} mt="lg">
              {order.title}
            </Title>
            <Text my="xl" color={"gray"}>
              price :{" "}
              <span className="text-gray-800 font-bold">{order.price}</span>
            </Text>
            <Text color={"gray"}>
              qty : <span className="text-gray-800 font-bold">{order.qty}</span>
            </Text>
            <Text my="xl" color={"gray"}>
              Gig Service :{" "}
              <span className="text-gray-800 font-bold">{order.gigType}</span>
            </Text>
            <Text my="xl" color={"gray"}>
              TotalPrice :{" "}
              <span className="text-gray-800 font-bold">
                {order.price * order.qty}
              </span>
            </Text>
          </div>
        )}
        {clientSecret && stripePromise && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </Flex>
    </div>
  );
}
