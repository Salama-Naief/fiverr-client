import {
  Avatar,
  Button,
  Divider,
  Flex,
  Menu,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { axiosUrl } from "../utils/connection";
import { categories, userSittings } from "../utils/data";
import { Store } from "../utils/Store";

function Navbar() {
  const {
    state: { user },
    dispatch,
  } = useContext(Store);
  const router = useRouter();
  const [lang, setLang] = useState<string>("English");

  const [active, setActive] = useState<boolean>(false);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosUrl.get("/users/me");

        dispatch({ type: "ADD_USER", payload: data });
      } catch (error) {
        dispatch({ type: "USER_LOGOUT" });
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (router.asPath === "/") {
      window.addEventListener("scroll", isActive);
      return () => {
        window.removeEventListener("scroll", isActive);
      };
    } else {
      setActive(true);
    }
  }, []);

  const handlelogout = async () => {
    try {
      const { data } = await axiosUrl.post("/auth/logout");
      showNotification({
        message: data.msg,
        color: "green",
      });
      dispatch({ type: "USER_LOGOUT" });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <nav
      className={`${
        active
          ? "bg-white border-b text-black sticky"
          : "fixed bg-transparent text-white"
      } py-4  z-10 top-0 left-0 w-full transition duration-300 text-lg font-sans `}
    >
      <div className=" sm:px-4 md:px-0">
        <Flex
          justify={"space-between"}
          align="center"
          className="container mx-auto"
        >
          <Link href={"/"}>
            <Flex align={"baseline"}>
              <Title order={1}>fivrr</Title>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            </Flex>
          </Link>
          <div>
            <Flex gap={"md"} align="center">
              <Link href={"/"} className="font-bold">
                fiverr Business
              </Link>

              <Link href={"/"} className=" font-bold">
                Explore
              </Link>

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <button className=" font-semibold">{lang}</button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => setLang("English")}
                    className="text-gray-500 text-md"
                  >
                    English
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => setLang("Arabic")}
                    className="text-gray-500 text-md"
                  >
                    Arabic
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              {user ? (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Tooltip label={user?.username}>
                      <button className=" font-semibold flex items-center">
                        {user?.image && (
                          <div className="relative w-10 h-10 rounded-full overflow-clip">
                            <Image
                              src={user?.image}
                              fill
                              loading="lazy"
                              alt=""
                            />
                          </div>
                        )}
                      </button>
                    </Tooltip>
                  </Menu.Target>

                  <Menu.Dropdown>
                    {userSittings.map((item, index) => (
                      <div key={index}>
                        {user?.isSeller ? (
                          <Link
                            href={item.link}
                            className="text-gray-500 text-md"
                          >
                            <Menu.Item>{item.title}</Menu.Item>
                          </Link>
                        ) : (
                          item.title !== "Add New Gigs" &&
                          item.title !== "Gigs" && (
                            <Link
                              href={item.link}
                              className="text-gray-500 text-md"
                            >
                              <Menu.Item key={index}>{item.title}</Menu.Item>
                            </Link>
                          )
                        )}
                      </div>
                    ))}
                    <Menu.Item>
                      <button
                        className="text-gray-500 text-md"
                        onClick={handlelogout}
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <>
                  <Link href={"/login"} className="font-semibold">
                    Login
                  </Link>
                  <Link href={"/register"} className="font-semibold">
                    <Button
                      variant="outline"
                      color={!active ? "yellow.0" : "green"}
                    >
                      Join
                    </Button>
                  </Link>
                </>
              )}
            </Flex>
          </div>
        </Flex>
        <div
          className={`${
            active ? "opacity-100 block" : "opacity-0 hidden"
          } transition duration-150`}
        >
          <Divider my={"md"} />
          <div className="container mx-auto flex items-center gap-x-8 font-medium text-gray-600">
            {categories.map((cat, index) => (
              <Link
                href={`/gigs?cat=${cat.value}`}
                key={index}
                className="group"
              >
                <Text fz={"md"}>{cat.label}</Text>
                <div className="w-full h-1 bg-green-500 scale-0 group-hover:scale-100 transition duration-150"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
