import { GetServerSideProps } from "next";
import Link from "next/link";
import { useQuery, UseQueryResult } from "react-query";
import { IPerson } from "../../src/lib/interfaces/IPerson";
import { fetchData } from "../person";

interface intialDataProps {
  person: IPerson;
}

const IntialData: React.FC<intialDataProps> = ({ person }) => {
  const { isLoading, isError, error, data }: UseQueryResult<IPerson, Error> =
    useQuery<IPerson, Error>("person", fetchData, { initialData: person });
  if (isLoading) {
    return <div>isLoading ...</div>;
  }
  if (isError) {
    return <div>error ...{error?.message}</div>;
  }
  return (
    <>
      <Link href="/">bbb</Link>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { person: IPerson };
}> => {
  const person = await fetch("http://localhost:8080/api/person").then((res) =>
    res.json()
  );

  return {
    props: { person },
  };
};

export default IntialData;
