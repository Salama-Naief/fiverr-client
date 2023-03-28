import React from "react";
import Slider from "../components/Slider";
import BusinessSection from "../components/home/BusinessSection";
import DetailsSection from "../components/home/DetailsSection";
import ExploreSecton from "../components/home/ExploreSecton";
import HeroSection from "../components/home/HeroSection";

import TrustedComSection from "../components/home/TrustedComSection";
import Layout from "../components/Layout";
import ProjCard from "../components/cards/ProjCard";
import { cards, projects } from "../utils/data";
import { axiosUrl } from "../utils/connection";

function Home({
  categories,
  errMsg,
}: {
  categories: CategoriesProps;
  errMsg: string;
}) {
  if (errMsg) {
    return (
      <div className="w-full text-center text-xl text-red-600">{errMsg}</div>
    );
  }
  return (
    <Layout title="Fiverr" indexed={true} description="home page">
      <HeroSection />
      <TrustedComSection />
      <Slider type={"category"} data={categories} />
      <DetailsSection />
      <ExploreSecton />
      <BusinessSection />
      <Slider type={"project"} data={projects} />
    </Layout>
  );
}

export const getServerSideProps: any = async (req, res) => {
  try {
    const { data } = await axiosUrl.get("/categories");

    return {
      props: {
        categories: data,
        errMsg: "",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        errMsg: error.response
          ? error.response.data.msg
          : "something went wrong",
      },
    };
  }
};
export default Home;
