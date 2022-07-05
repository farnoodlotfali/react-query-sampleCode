import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
  UseQueryResult,
} from "react-query";
import { IPerson } from "../../src/lib/interfaces/IPerson";
import { fetchData } from "../person";

const Hydration: React.FC = () => {
  const { isLoading, isError, error, data }: UseQueryResult<IPerson, Error> =
    useQuery<IPerson, Error>("person", fetchData);
  if (isLoading) {
    return <div>isLoading ...</div>;
  }
  if (isError) {
    return <div>error ...{error?.message}</div>;
  }
  const router = useRouter();
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
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("person", fetchData);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Hydration;
