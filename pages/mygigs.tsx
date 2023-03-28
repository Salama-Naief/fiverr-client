import Layout from "../components/Layout";
import Mygigs from "../components/MyGigs";

function Mygig() {
  return (
    <Layout title="my gigs" indexed={false} description="my Gigs">
      <Mygigs profile={false} />
    </Layout>
  );
}

export default Mygig;
