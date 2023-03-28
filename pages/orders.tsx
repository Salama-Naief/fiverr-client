import {
  ActionIcon,
  Flex,
  Loader,
  Paper,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedValue } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import sortBy from "lodash/sortBy";
import Layout from "../components/Layout";
import Image from "next/image";
import { Store } from "../utils/Store";
import { axiosUrl } from "../utils/connection";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { MdErrorOutline } from "react-icons/md";

const Customer = ({ id }) => {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["SellerUser"],
    queryFn: () =>
      axiosUrl.get(`/users/user/${id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      {!error && isLoading ? (
        <Skeleton />
      ) : (
        <Title order={6} tt={"capitalize"}>
          {user.username}
        </Title>
      )}
    </>
  );
};
const PAGE_SIZE = 10;

function Orders() {
  const {
    state: { user },
  } = useContext(Store);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "Name",
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<OrdersProps[]>([]);
  const [initialRecords, setInitialRecords] = useState([]);

  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    router.push("/login");
  }, []);
  useEffect(() => {
    axiosUrl
      .get(`/orders`)
      .then((res) => {
        setOrders(res.data);
        setRecords(res.data?.slice(0, PAGE_SIZE));
        setInitialRecords(res.data?.slice(0, 100));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showNotification({
          message: error.response
            ? error.response.data.msg
            : "error in creating your gig please try again",
          color: "red",
          icon: <MdErrorOutline />,
        });
      });
    if (!user) {
      router.push("/login");
    }
  }, []);
  //search useeffect hook
  useEffect(() => {
    setRecords(
      initialRecords.filter(({ price, title, buyer }) => {
        if (
          debouncedQuery !== "" &&
          !`${price} ${title} ${buyer}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery]);

  //pagination useeffect hook
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(orders?.slice(from, to));
  }, [page]);

  //sorting useeffect hook
  useEffect(() => {
    const data = sortBy(orders, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  //handle delete
  const handleConv = async (info) => {
    try {
      const dataInfo = {
        to: info?.buyerId === user?._id ? info?.sellerId : info?.buyerId,
      };
      const { data } = await axiosUrl.post("/conversations", dataInfo);

      router.push(`/message/${data._id}`);
    } catch (error) {
      showNotification({
        message: error.response
          ? error.response.data.msg
          : "error in creating your gig please try again",
        color: "red",
        icon: <MdErrorOutline />,
      });
    }
  };
  return (
    <Layout title="my orders" indexed={false} description="my orders page">
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader size={"xl"} color="green"></Loader>
        </div>
      ) : (
        <Paper my={"xl"} className="container mx-auto">
          <Title order={2} color="gray.8" my={"xl"}>
            Orders
          </Title>

          <DataTable
            withBorder
            highlightOnHover
            striped
            fontSize="md"
            records={records}
            onRowClick={(order, rowIndex) => {}}
            columns={[
              {
                accessor: "title",
                sortable: true,
                textAlignment: "left",
                title: <Text mr="xs">Image</Text>,
                render: (data: OrdersProps) => (
                  <Flex align={"center"}>
                    <div className="relative w-32 h-20 overflow-hidden rounded">
                      <Image src={data.img} fill alt={data.title} />
                    </div>
                    <Title ml={"xl"} order={6} tt={"capitalize"}>
                      {data.title}
                    </Title>
                  </Flex>
                ),
              },
              {
                accessor: "qty",

                sortable: true,
                title: <Text mr="xs">Qty</Text>,
                render: (data: OrdersProps) => (
                  <Text tt={"capitalize"}>${data.qty}</Text>
                ),
              },
              {
                accessor: "price",

                sortable: true,
                title: <Text mr="xs">Price</Text>,
                render: (data: OrdersProps) => (
                  <Text tt={"capitalize"}>${data.price}</Text>
                ),
              },
              {
                accessor: "TotalPrice",

                sortable: true,
                title: <Text mr="xs">TotalPrice</Text>,
                render: (data: OrdersProps) => (
                  <Text tt={"capitalize"}>${data.totalPrice}</Text>
                ),
              },
              {
                accessor: "Sales",
                textAlignment: "center",
                sortable: true,
                title: (
                  <Text mr="xs">
                    {user?._id === records[0]?.buyerId ? "Seller" : "Buyer"}
                  </Text>
                ),
                render: (data: OrdersProps) => (
                  <Customer
                    id={
                      data?.buyerId === user?._id
                        ? data?.sellerId
                        : data?.buyerId
                    }
                  />
                ),
              },

              {
                accessor: "actions",
                textAlignment: "center",
                title: <Text mr="xs"> Contact</Text>,

                render: (data: OrdersProps) => (
                  <div className="w-full  flex justify-center">
                    <ActionIcon color="red" onClick={() => handleConv(data)}>
                      <Image
                        src={"/img/message.png"}
                        width={28}
                        height={28}
                        alt="contanct"
                      />
                    </ActionIcon>
                  </div>
                ),
              },
            ]}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            totalRecords={orders.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
          />
        </Paper>
      )}
    </Layout>
  );
}

export default Orders;
