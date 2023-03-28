import {
  Center,
  Flex,
  Grid,
  NumberInput,
  Paper,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import GigsCard from "../components/cards/GigsCard";
import Layout from "../components/Layout";
import { axiosUrl } from "../utils/connection";

function Gigs({ gigs, errMsg }) {
  const router = useRouter();
  const { cat } = router.query;
  const [sortValue, setSortValue] = useState<string>("Best Selling");
  // const [allGigs, setAllGigs] = useState(gigs);

  const form = useForm({
    initialValues: {
      min: 0,
      max: 0,
    },

    validate: {
      min: (value) => (value > 0 ? null : " "),
      max: (value) => (value > 0 ? null : " "),
    },
  });

  const handleSubmite = async (dataInfo: any) => {
    const min = dataInfo.min > 0 ? `min=${dataInfo.min}` : null;
    const max = dataInfo.max > 0 ? `max=${dataInfo.max}` : null;
    if (Object.keys(router.query).length > 0) {
      //convert object to array
      let q = Object.entries(router.query).map((qq) => {
        if (qq[0] !== "min" && qq[0] !== "max") {
          return `${qq[0]}=${qq[1]}`;
        } else {
          return null;
        }
      });
      let route = "";
      //check if the array not equal any null value
      q = q.filter((c) => c !== null);
      //check the arry length
      if (q.length > 0) {
        route = q.join("&");
        route = `${router.pathname}?${route}&${min}&${max}`;
      } else {
        route = `${router.pathname}?${min}&${max}`;
      }
      router.push(route);
    } else if (max && min) {
      router.push(`${router.pathname}?${min}&${max}`);
    }
  };

  //handle sort
  const handleSort = (e) => {
    let sort = "";
    if (e === "Popular") {
      sort = "sort=averageRating";
    } else if (e === "Newest") {
      sort = "sort=createdAt";
    } else if (e === "Best Selling") {
      sort = "sort=sales";
    }
    setSortValue(e);
    if (Object.keys(router.query).length > 0) {
      let q = Object.entries(router.query).map((qq) => {
        if (qq[0] !== "sort") {
          return `${qq[0]}=${qq[1]}`;
        } else {
          return null;
        }
      });

      let route = "";
      //check if the array not equal any null value
      q = q.filter((c) => c !== null);
      //check the arry length
      if (q.length > 0) {
        route = q.join("&");
        route = `${router.pathname}?${route}&${sort}`;
      } else {
        route = `${router.pathname}?${sort}`;
      }
      router.push(route);
    } else {
      router.push(`${router.pathname}?${sort}`);
    }
  };

  if (errMsg) {
    return (
      <Center>
        <Text color={"red"}>{errMsg} </Text>
      </Center>
    );
  }
  return (
    <Layout title="All Gigs" indexed={true} description="All gigs">
      <Paper py={"xl"} mb="xl">
        <div className="container mx-auto">
          <Flex gap="sm">
            <Link href={"/"}>
              <Text className="text-gray-700 hover:underline flex gap-x-1 items-center">
                Fiverr <BsChevronRight />
              </Text>
            </Link>
            <Text
              color={"gray.7"}
              className="capitalize gap-x-1 flex items-center"
            >
              {cat?.toLocaleString().replace("-", " ")} <BsChevronRight />
            </Text>
          </Flex>
          <Title my="xl">{cat?.toLocaleString().replace("-", " ")}</Title>
          <Text fz={"xl"} color={"gray.6"}>
            Explore the boundaries of art and technology with Liverr{" "}
            {cat?.toLocaleString().replace("-", " ")} {gigs.length}
          </Text>

          <Flex justify={"space-between"} align="center" my={"xl"}>
            <form onSubmit={form.onSubmit((e) => handleSubmite(e))}>
              <Flex gap={"lg"}>
                <Text fz={"xl"} color={"gray.8"}>
                  Budget
                </Text>
                <NumberInput
                  placeholder="min"
                  defaultValue={0}
                  {...form.getInputProps("min")}
                />
                <NumberInput
                  placeholder="max"
                  defaultValue={0}
                  {...form.getInputProps("max")}
                />
                <button
                  type="submit"
                  className="bg-green-500 transition duration-150 ease-in-out hover:bg-green-600 text-white px-3 rounded"
                >
                  apply
                </button>
              </Flex>
            </form>
            <Flex align={"center"} gap="sm">
              <Text color={"gray.6"}>Sort by</Text>
              <Select
                value={sortValue}
                onChange={(e) => handleSort(e)}
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
                  { value: "Newest", label: "Newest" },
                  { value: "Popular", label: "Popular" },
                  { value: "Best Selling", label: "Best Selling" },
                ]}
              />
            </Flex>
          </Flex>

          <Grid align={"stretch"}>
            {gigs.length > 0 ? (
              gigs.map((gig: any) => (
                <Grid.Col key={gig._id} span={3}>
                  <GigsCard card={gig} />
                </Grid.Col>
              ))
            ) : (
              <Grid.Col className="w-full h-64 flex items-center justify-center">
                <Text fz={"xl"} color={"green"}>
                  No Gig Found
                </Text>
              </Grid.Col>
            )}
          </Grid>
        </div>
      </Paper>
    </Layout>
  );
}

export const getServerSideProps: any = async (req, res) => {
  try {
    const { data } = await axiosUrl.get(req.resolvedUrl);

    return {
      props: {
        gigs: data,
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
export default Gigs;
