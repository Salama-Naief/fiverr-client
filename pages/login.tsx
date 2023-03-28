import {
  Center,
  Divider,
  Loader,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Layout from "../components/Layout";
import { axiosUrl } from "../utils/connection";
import { backendUri } from "../utils/backendUri";

interface FormProp {
  email: string;
  password: string;
}
function Login() {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: { email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) =>
        value.length < 8
          ? "Name must have at least 8 letters"
          : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value)
          ? null
          : "Password must ontain at least one numeric digit, one uppercase and one lowercase letter one special character",
      email: (value) => (/^\S+@\S+.\S$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleSubmite = async (dataInfo: FormProp) => {
    try {
      setLoading(true);
      const { data } = await axiosUrl.post("/auth/local/login", {
        email: dataInfo.email,
        password: dataInfo.password,
      });
      setLoading(false);
      showNotification({
        message: "you loging successfully",
        color: "green",
      });
      router.push("/");
    } catch (error) {
      const mess = error.response
        ? error.response.data?.msg
        : "something went wrong";
      setLoading(false);
      setErrMsg(mess);
      showNotification({
        message: mess,
        color: "red",
      });
    }
  };

  return (
    <Layout title="Login" indexed={false} description="Login page">
      <Center>
        <div className=" py-4 w-1/2 my-10 border rounded px-14">
          <Center>
            <Title order={2} my="xl">
              Sign In to Fiverr
            </Title>
          </Center>
          <a
            href={`${backendUri}/auth/facebook`}
            className="justify-center items-center w-full py-3 rounded active:scale-95 bg-[#4267b2] hover:bg-[#618be1] transition duration-150 ease-in-out text-white font-bold flex gap-x-4 my-5"
          >
            <BsFacebook size={25} />
            <span>Continue with Facebook</span>
          </a>
          <a
            href={`${backendUri}/auth/google`}
            className="justify-center items-center w-full py-3 bg-gray-50 rounded active:scale-95  hover:bg-gray-100 transition duration-150 ease-in-out text-gray-800 border  font-bold flex gap-x-4 my-5"
          >
            <FcGoogle size={25} />
            <span>Continue with Google</span>
          </a>
          <button className="justify-center items-center w-full py-3 bg-gray-50 rounded active:scale-95 hover:bg-gray-100 transition duration-150 ease-in-out text-gray-800 border  font-bold flex gap-x-4 my-5">
            <BsApple size={25} />
            <span>Continue with Apple</span>
          </button>
          <Divider
            my="md"
            size={"sm"}
            fz="lg"
            fw={"bold"}
            label="OR"
            labelPosition="center"
          />
          {errMsg && (
            <Text color={"red.6"} my="md">
              {errMsg}
            </Text>
          )}
          <form onSubmit={form.onSubmit((e) => handleSubmite(e))}>
            <TextInput
              {...form.getInputProps("email")}
              id="email"
              placeholder="Your email"
              size="lg"
            />

            <PasswordInput
              {...form.getInputProps("password")}
              placeholder="Password"
              withAsterisk
              my={"lg"}
              size="lg"
            />
            <button
              disabled={loading}
              className="transition duration-150 ease-in-out text-white bg-green-500 hover:bg-green-600 py-4 active:scale-95 rounded w-full my-4"
            >
              {loading ? (
                <Center>
                  <Loader color="green" size={"xs"} />
                </Center>
              ) : (
                "Continue"
              )}
            </button>
          </form>
          <Text color={"green.6"} className="text-right">
            Forgot Password?
          </Text>
          <Divider my={"lg"} />
          <Text color={"gray.7"} className="text-center">
            Not a member yet?
            <Link href={"/register"} className="text-green-600">
              Join now
            </Link>
          </Text>
        </div>
      </Center>
    </Layout>
  );
}

export default Login;
