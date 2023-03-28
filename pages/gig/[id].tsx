import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Rating,
  Skeleton,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import Moment from "react-moment";
import { useQuery } from "react-query";
import FAQ from "../../components/gig/FAQ";
import FromDataItem from "../../components/gig/FormDataItem";
import Review from "../../components/gig/Review";
import ReviewForm from "../../components/gig/ReviewForm";
import Slider from "../../components/gig/Slider";
import TapsData from "../../components/gig/TapsData";
import Layout from "../../components/Layout";
import { axiosUrl } from "../../utils/connection";
import { Store } from "../../utils/Store";

//main Gig function
function Gig(props: { gig: GigsProps; errMsg: string }) {
  const { state } = useContext(Store);
  const { gig, errMsg } = props;
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const [activeTab, setActiveTab] = useState<string>("Basic");
  const [allowToReview, setAllowToReview] = useState<boolean>(false);

  //get bib seller
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["SellerUser"],
    queryFn: () =>
      axiosUrl.get(`/users/user/${gig.userId}`).then((res) => {
        return res.data;
      }),
  });
  //get gig reviews
  const {
    isLoading: reviewsLoading,
    error: reviewsErr,
    data: reviews,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      axiosUrl.get(`/reviews/${gig._id}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (!gig) return;
    const g = gig.buyers.find((g) => g === state.user?._id.toString());

    if (g) {
      setAllowToReview(true);
    }
  }, [gig, state.user]);

  //handle order
  const handleOrder = () => {
    if (!gig) {
      return;
    }
    const payload = {
      coverImage: gig.coverImage,
      id: gig._id,
      title: gig.title,
      price:
        activeTab === "Premium"
          ? gig.Premium.price
          : activeTab === "Standrad"
          ? gig.Standrad.price
          : gig.Basic.price,
      typeContent:
        activeTab === "Premium"
          ? gig.Premium
          : activeTab === "Standrad"
          ? gig.Standrad
          : gig.Basic,
      gigType: activeTab,
      qty: 1,
    };
    dispatch({ type: "ADD_ORDER", payload });
    router.push("/pay");
  };
  if (errMsg) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Text fz={"xl"} tt="capitalize" color={"red"}>
          {errMsg}
        </Text>
      </div>
    );
  }

  //handle delete
  const handleConv = async (info) => {
    try {
      const dataInfo = {
        to: gig.userId,
      };
      const { data } = await axiosUrl.post("/conversations", dataInfo);

      router.push(`/message/${data._id}`);
    } catch (error) {
      showNotification({
        message: error.response
          ? error.response.data?.msg
          : "something went wrong",
        color: "red",
      });
    }
  };
  return (
    <Layout
      title={`gig-${gig.title}`}
      indexed={true}
      description={gig.description}
    >
      <div className="container mx-auto">
        <Grid mb={"xl"}>
          <Grid.Col span={8} p="xl">
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
                <Link
                  href={`/gigs?cat=${
                    gig.category?.length > 0 ? gig.category[0] : "/gigs"
                  }`}
                >
                  {gig.category?.length > 0 ? gig.category[0] : ""}{" "}
                </Link>
                <BsChevronRight />
              </Text>
            </Flex>
            <Title my="md" order={1}>
              {gig.title}
            </Title>
            {!error && isLoading ? (
              <Flex mt={"xl"} align="center" gap={"sm"} px="md">
                <Skeleton height={40} circle />
                <Skeleton height={12} radius="lg" />
              </Flex>
            ) : (
              <Flex align={"center"} gap="sm">
                {user?.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-clip">
                    <Image src={user?.image} fill loading="lazy" alt="" />
                  </div>
                )}

                <Text fw="bold" tt={"capitalize"}>
                  {user?.username}
                </Text>
                <Group position="center">
                  <Rating value={gig.averageRating} fractions={2} readOnly />
                  <span className="text-yellow-500">{gig.averageRating}</span>
                  <span className="text-gray-500">({gig.numOfReviews})</span>
                  <span className="text-gray-500">selles({gig.sales})</span>
                </Group>
              </Flex>
            )}

            {/**Slider */}
            <Slider images={gig.images.concat(gig.coverImage)} />

            <Title order={3}>About This Gig</Title>
            <Text my={"lg"} fz="lg" fw={500} color="gray.7">
              {gig.description}
            </Text>

            <Title order={3} my="xl">
              About the Seller
            </Title>
            {!error && isLoading ? (
              <Flex mt={"xl"} align="center" gap={"sm"} px="md">
                <Skeleton height={100} circle />
                <div className="w-full">
                  <Skeleton height={15} radius="lg" my={"md"} />
                  <Skeleton height={15} radius="lg" />
                </div>
              </Flex>
            ) : (
              <Flex align={"center"} gap="xl" my={"xl"}>
                <div className="relative w-32 h-32 rounded-full overflow-clip">
                  <Image src={user?.image} fill loading="lazy" alt="" />
                </div>

                <div>
                  <Text tt={"capitalize"} fw="bold" fz={"lg"}>
                    {user?.username}
                  </Text>
                  <Text tt={"capitalize"} color="gray.6">
                    {user?.story}
                  </Text>
                  <Group position="center" my="sm">
                    <Rating value={3.5} fractions={2} readOnly />
                    <span className="text-yellow-500">3.5</span>
                    <span className="bg-white text-gray-500">(120)</span>
                  </Group>
                  <button
                    onClick={handleConv}
                    className="border border-gray-500 text-gray-500 px-4 py-2 font-bold rounded hover:bg-gray-500 hover:text-white transition duration-150 ease-in-out "
                  >
                    Contact Me
                  </button>
                </div>
              </Flex>
            )}
            <Paper className="border" p={"xl"}>
              <Grid>
                <Grid.Col span={6}>
                  <div className="my-3 px-6">
                    <Text fw={600} color="gray.6">
                      from
                    </Text>
                    <Text fw={600} color="gray.8">
                      {user?.country}
                    </Text>
                  </div>
                  <div className="my-3 px-6">
                    <Text fw={600} color="gray.6">
                      Avg. response time
                    </Text>
                    <Text fw={600} color="gray.8">
                      4 hours
                    </Text>
                  </div>
                  <Text fw={600} color="gray.6" px={"md"}>
                    Languages
                  </Text>
                  {user?.languages.map((lang) => (
                    <div
                      key={lang._id}
                      className="my-1 flex items-center gap-x-2 px-6"
                    >
                      <Text fw={600} color="gray.8">
                        {lang?.languge}
                      </Text>
                      <Text color="gray.6">({lang?.level})</Text>
                    </div>
                  ))}
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className="my-3 px-6">
                    <Text fw={600} color="gray.6">
                      Member since
                    </Text>
                    <Moment format="YYYY/MM">{user?.createdAt}</Moment>
                  </div>

                  <FromDataItem frist={"Last delivery"} second="1 day" />
                </Grid.Col>
              </Grid>
              <Divider size={"sm"} my="md" />
              <Text tt={"capitalize"} fz={"lg"} color="gray.6">
                {user?.desc}
              </Text>
            </Paper>

            {/**FAQ */}
            <FAQ />
            {/**Reviews */}
            <Title order={3} my="xl">
              Reviews
            </Title>
            {reviews && reviews.length > 0 ? (
              reviews.map((review: ReviewProps) => (
                <div key={review._id}>
                  <Review data={review} />
                  <Divider />
                </div>
              ))
            ) : (
              <Text my={"xl"} color="gray.5">
                No reviews
              </Text>
            )}

            {reviews && reviews.length > 3 && (
              <Button variant="outline" color={"green.5"} my="lg">
                See More ..
              </Button>
            )}
            {allowToReview && <ReviewForm gigId={gig._id} refech={refetch} />}
          </Grid.Col>
          {/**right box for price details */}
          <Grid.Col span={4} p="xl" className="">
            <div className="sticky top-28">
              <Tabs
                value={activeTab}
                onTabChange={setActiveTab}
                color="green"
                defaultValue="Basic"
                className="border"
              >
                <Tabs.List grow fz={"xl"}>
                  <Tabs.Tab
                    fw={"bold"}
                    fz={"lg"}
                    value="Basic"
                    color={"green.6"}
                  >
                    <Text color={activeTab === "Basic" ? "green.6" : "gray.8"}>
                      Basic
                    </Text>
                  </Tabs.Tab>
                  <Divider orientation="vertical" />
                  <Tabs.Tab
                    fw={"bold"}
                    fz={"lg"}
                    value="Standrad"
                    color={"green.6"}
                  >
                    <Text
                      color={activeTab === "Standrad" ? "green.6" : "gray.8"}
                    >
                      Standrad
                    </Text>
                  </Tabs.Tab>
                  <Divider orientation="vertical" />
                  <Tabs.Tab
                    fw={"bold"}
                    fz={"lg"}
                    value="Premium"
                    color={"green.6"}
                  >
                    <Text
                      color={activeTab === "Premium" ? "green.6" : "gray.8"}
                    >
                      Premium
                    </Text>
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Basic" pt="xs">
                  <TapsData
                    days={gig.Basic.deliveryTime}
                    price={gig.Basic.price}
                    revisions={gig.Basic.revisionNumber}
                    title={gig.Basic.title}
                    desc={gig.Basic.description}
                    featurs={gig.Basic.features}
                  />
                </Tabs.Panel>

                <Tabs.Panel value="Standrad" pt="xs">
                  <TapsData
                    days={gig.Standrad.deliveryTime}
                    price={gig.Standrad.price}
                    revisions={gig.Standrad.revisionNumber}
                    title={gig.Standrad.title}
                    desc={gig.Standrad.description}
                    featurs={gig.Standrad.features}
                  />
                </Tabs.Panel>

                <Tabs.Panel value="Premium" pt="xs">
                  <TapsData
                    days={gig.Premium.deliveryTime}
                    price={gig.Premium.price}
                    revisions={gig.Premium.revisionNumber}
                    title={gig.Premium.title}
                    desc={gig.Premium.description}
                    featurs={gig.Premium.features}
                  />
                </Tabs.Panel>
                <div className="p-4">
                  <button
                    onClick={handleOrder}
                    className=" bg-green-500 hover:bg-green-600 customBtn w-full active:scale-95"
                  >
                    Continue
                  </button>
                </div>
              </Tabs>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </Layout>
  );
}

export const getServerSideProps: any = async (req, res) => {
  try {
    const id = req.params?.id;
    const { data } = await axiosUrl.get(`/gigs/gig/${id}`);

    return {
      props: {
        gig: data,
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
export default Gig;
