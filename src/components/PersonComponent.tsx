import Link from "next/link";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { fetchData } from "../../pages/person";
import { IPerson } from "../lib/interfaces/IPerson";

const PersonComponent = () => {
  const { data }: UseQueryResult<IPerson, Error> = useQuery<
    IPerson,
    Error,
    IPerson,
    string
  >("person", fetchData, {
    //   refetchOnWindowFocus: false,
  });

  return (
    <>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </>
  );
};

export default PersonComponent;
