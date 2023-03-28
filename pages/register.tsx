import {
  Center,
  Divider,
  Input,
  Loader,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Layout from "../components/Layout";
import { axiosUrl } from "../utils/connection";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

interface FormProp {
  email: string;
  password: string;
  confirmPass: string;
  username: string;
}
function Register() {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: { email: "", password: "", confirmPass: "", username: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) =>
        value.length < 8
          ? "Name must have at least 8 letters"
          : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value)
          ? null
          : "Password must ontain at least one numeric digit, one uppercase and one lowercase letter one special character",
      confirmPass: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      email: (value) => (/^\S+@\S+.\S$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        value.length
          ? value.length > 3
            ? null
            : "username must be greater than 3"
          : "please enter username",
    },
  });
  const handleSubmite = async (dataInfo: FormProp) => {
    if (dataInfo.password === dataInfo.confirmPass) {
      try {
        setLoading(true);
        const { data } = await axiosUrl.post("/auth/local/register", {
          username: dataInfo.username,
          email: dataInfo.email,
          password: dataInfo.password,
        });
        setLoading(false);
        showNotification({
          message: "you register successfully",
          color: "green",
        });
        router.push("/");
      } catch (error) {
        const mess = error.response
          ? error.response.data.msg
          : "something went wrong";
        setLoading(false);
        setErrMsg(mess);
        showNotification({
          message: mess,
          color: "red",
        });
      }
    }
  };
  return (
    <Layout title="Register" indexed={false} description="Register page">
      <Center>
        <div className=" py-4 w-1/2 my-10 border rounded px-14">
          <Center>
            <Title order={2} my="xl">
              Join Fiverr
            </Title>
          </Center>
          <button className="justify-center items-center w-full py-3 rounded active:scale-95 bg-[#4267b2] hover:bg-[#618be1] transition duration-150 ease-in-out text-white font-bold flex gap-x-4 my-5">
            <BsFacebook size={25} />
            <span>Continue with Facebook</span>
          </button>
          <button className="justify-center items-center w-full py-3 bg-gray-50 rounded active:scale-95  hover:bg-gray-100 transition duration-150 ease-in-out text-gray-800 border  font-bold flex gap-x-4 my-5">
            <FcGoogle size={25} />
            <span>Continue with Google</span>
          </button>
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
              {...form.getInputProps("username")}
              id="username"
              placeholder="Enter Your username"
              size="lg"
            />
            <TextInput
              {...form.getInputProps("email")}
              id="email"
              placeholder="Enter Your email"
              size="lg"
            />

            <PasswordInput
              {...form.getInputProps("password")}
              placeholder="Password"
              withAsterisk
              my={"lg"}
              size="lg"
              min={8}
            />

            <PasswordInput
              {...form.getInputProps("confirmPass")}
              placeholder="Confirm Password"
              withAsterisk
              min={8}
              my={"lg"}
              size="lg"
            />

            <button
              disabled={loading}
              className="transition duration-150 ease-in-out text-white bg-green-500 hover:bg-green-600 py-4 active:scale-95 rounded w-full my-4"
            >
              {loading ? (
                <Center>
                  <Loader color="green" />
                </Center>
              ) : (
                "Continue"
              )}
            </button>
          </form>
          <Text color={"gray.6"} className="text-center">
            By joining I agree to receive emails from Fiverr.
          </Text>
          <Divider my={"lg"} />
          <Text color={"gray.7"} className="text-center">
            Already a member?
            <Link href={"/login"} className="text-green-600">
              Sign In
            </Link>
          </Text>
        </div>
      </Center>
    </Layout>
  );
}

export default Register;
