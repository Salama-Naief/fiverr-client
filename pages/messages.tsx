import { ActionIcon, Flex, Loader, Paper, Text, Title } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedValue } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import sortBy from "lodash/sortBy";

import Layout from "../components/Layout";

import Link from "next/link";
import { axiosUrl } from "../utils/connection";
import { Store } from "../utils/Store";
import { useQuery } from "react-query";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

const PAGE_SIZE = 10;

const Customer = ({ id, convId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["use"],
    queryFn: () =>
      axiosUrl.get(`/users/user/${id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Title ml={"xl"} order={5} tt={"capitalize"}>
      <Link href={`/message/${convId}`}>{!error && data?.username}</Link>
    </Title>
  );
};
function Messages() {
  const router = useRouter();
  const {
    state: { user },
  } = useContext(Store);
  const [query, setQuery] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "Name",
    direction: "asc",
  });
  const [loading, setLoading] = useState<boolean>(true);
  // const [records, setRecords] = useState(sortBy(ordersData, "CustomerName"));
  const [conversation, setConversation] = useState([]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [initialRecords, setInitialRecords] = useState([]);

  useEffect(() => {
    axiosUrl
      .get("/conversations")
      .then((res) => {
        setConversation(res.data);
        setRecords(res.data);
        setInitialRecords(res.data.slice(0, 100));

        setLoading(false);
      })
      .catch((error) => {
        showNotification({
          message: error.rerrorsponse
            ? error.response.data.msg
            : "something went wrong",
          color: "red",
        });
        setLoading(false);
      });
  }, []);
  //search useeffect hook
  useEffect(() => {
    setRecords(
      initialRecords.filter(({ buyerId, lastMessage, createdAt }) => {
        if (
          debouncedQuery !== "" &&
          !`${lastMessage} ${createdAt} ${buyerId}`
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
    setRecords(conversation.slice(from, to));
  }, [page]);

  //sorting useeffect hook
  useEffect(() => {
    const data = sortBy(conversation, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  return (
    <Layout title="my messages" indexed={false} description="my messages">
      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Loader size={"md"} color="green" />
        </div>
      ) : (
        <Paper my={"xl"} className="container mx-auto">
          <Title order={2} color="gray.8" my={"xl"}>
            Messages
          </Title>

          <DataTable
            withBorder
            highlightOnHover
            striped
            fontSize="md"
            records={records}
            columns={[
              {
                accessor: "buyer",
                sortable: true,
                textAlignment: "left",
                title: <Text mr="xs">Customer</Text>,
                render: (data: ConvProps) => (
                  <Customer
                    id={
                      user._id === data.sellerId ? data.buyerId : data.sellerId
                    }
                    convId={data._id}
                  />
                ),
              },

              {
                accessor: "message",
                sortable: true,
                title: <Text mr="xs">Message</Text>,
                render: (data: ConvProps) => (
                  <Text color="gray.6" my="lg">
                    <Link href={`/message/${data._id}`}>
                      {data.lastMessage.substring(0, 100)}...
                    </Link>
                  </Text>
                ),
              },

              {
                accessor: "sendAt",
                textAlignment: "center",
                sortable: true,
                title: <Text mr="xs">Date</Text>,
                render: (data: ConvProps) => (
                  <Text color={"gray.7"}>
                    <Moment fromNow>{data.createdAt}</Moment>
                  </Text>
                ),
              },

              {
                accessor: "actions",
                textAlignment: "center",
                title: <Text mr="xs"> Action</Text>,

                render: (data: ConvProps) => (
                  <>
                    {user._id === data.buyerId && data.readByBuyer ? (
                      <button className=" bg-green-500 transition duration-150 ease-in-out hover:bg-green-600 text-white px-2 py-2 active:translate-y-[1px] text-xs rounded">
                        Make as Read
                      </button>
                    ) : data.readByBuyer ? (
                      <button className=" bg-green-500 transition duration-150 ease-in-out hover:bg-green-600 text-white px-2 py-2 active:translate-y-[1px] text-xs rounded">
                        Make as Read
                      </button>
                    ) : null}
                  </>
                ),
              },
            ]}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            totalRecords={conversation.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
          />
        </Paper>
      )}
    </Layout>
  );
}

export default Messages;
