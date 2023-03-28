import {
  ActionIcon,
  Avatar,
  Flex,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";

import CustomBtn from "../components/CustomBtn";
import Layout from "../components/Layout";
import { myGigs } from "../utils/data";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { axiosUrl } from "../utils/connection";
import { useQuery } from "react-query";
import { showNotification } from "@mantine/notifications";

const PAGE_SIZE = 10;

function Mygigs({ profile }) {
  const [query, setQuery] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "Name",
    direction: "asc",
  });
  // const [records, setRecords] = useState(sortBy(ordersData, "CustomerName"));

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMsg, setErMsg] = useState<string>("");

  useEffect(() => {
    axiosUrl
      .get(`/gigs/my`)
      .then((res) => {
        setRecords(res.data.slice(0, PAGE_SIZE));
        setInitialRecords(res.data.slice(0, 100));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErMsg(err.response ? err.response.data.msg : "something went wrong");
        showNotification({
          message: err.response
            ? err.response.data.msg
            : "something went wrong",
          color: "red",
        });
      });
  }, []);
  //search useeffect hook
  useEffect(() => {
    setRecords(
      initialRecords.filter(({ price, title }) => {
        if (
          debouncedQuery !== "" &&
          !`${price} ${title}`
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
    setRecords(records.slice(from, to));
  }, [page]);

  //sorting useeffect hook
  useEffect(() => {
    const data = sortBy(records, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  //handle delete
  const handelDelete = (data) => {};
  return (
    <>
      {errMsg && <Text>{errMsg}</Text>}
      {!errMsg && isLoading ? (
        <div className="w-full h-64 flex items-center justify-center ">
          <Loader color={"green"} />
        </div>
      ) : (
        <Paper my={"xl"} className="container mx-auto p-4">
          <Flex my={"xl"} align={"center"} justify="space-between">
            <Title order={profile ? 4 : 2} color="gray.8">
              My Gigs
            </Title>
            <Link href={"/gig/add"}>
              <button
                className="customBtn bg-green-500 hover:bg-green-600"
                style={{ fontSize: "0.8rem" }}
              >
                Add New Gig
              </button>
            </Link>
          </Flex>

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
                render: (data: GigsProps) => (
                  <Flex align={"center"}>
                    <div className="relative w-32 h-20 overflow-hidden rounded">
                      <Image src={data.coverImage} fill alt={data.title} />
                    </div>
                    <Title ml={"xl"} order={6} tt={"capitalize"}>
                      <Link href={`/gig/${data._id}`}>{data.title}</Link>
                    </Title>
                  </Flex>
                ),
              },

              {
                accessor: "basicPrice",
                sortable: true,
                title: <Text mr="xs">Basic Price</Text>,
                render: (data: GigsProps) => (
                  <Text tt={"capitalize"}>${data.Basic.price}</Text>
                ),
              },
              {
                accessor: "StandradPrice",
                hidden: profile,
                sortable: true,
                title: <Text mr="xs">Standrad Price</Text>,
                render: (data: GigsProps) => (
                  <Text tt={"capitalize"}>${data.Standrad.price}</Text>
                ),
              },
              {
                accessor: "PremiumPrice",
                hidden: profile,
                sortable: true,
                title: <Text mr="xs">Premium Price</Text>,
                render: (data: GigsProps) => (
                  <Text tt={"capitalize"}>${data.Premium.price}</Text>
                ),
              },

              {
                accessor: "Sales",
                textAlignment: "center",
                sortable: true,
                title: <Text mr="xs">Sales</Text>,
                render: (data: GigsProps) => (
                  <Text tt={"capitalize"}>{data.sales}</Text>
                ),
              },

              {
                accessor: "actions",
                textAlignment: "center",
                title: <Text mr="xs"> Action</Text>,

                render: (data: GigsProps) => (
                  <div className="w-full  flex justify-center gap-x-2">
                    <ActionIcon color="green">
                      <Link href={`/gig/update/${data._id}`}>
                        <FiEdit size={17} />
                      </Link>
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => handelDelete(data)}>
                      <BsTrash size={17} />
                    </ActionIcon>
                  </div>
                ),
              },
            ]}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            totalRecords={myGigs.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
          />
        </Paper>
      )}
    </>
  );
}

export default Mygigs;
