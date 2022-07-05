import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { IPerson } from "../../src/lib/interfaces/IPerson";

const getPersonById = async (id: string | string[] | undefined) => {
  if (typeof id === "string") {
    const res = await fetch(`/api/person/${id}`);
    if (res.ok) {
      return res.json();
    }
    throw new Error("invalid fetch");
  }
  throw new Error("invalid id");
};

const PersonPage: React.FC = () => {
  const {
    query: { id },
  } = useRouter();

  const { isError, isLoading, error, data } = useQuery<IPerson, Error>(
    ["person", id],
    () => getPersonById(id),
    {
      enabled: !!id,
      retry: 4,
      retryDelay: (attemptIndex) => {
        console.log(attemptIndex, Math.min(1000 * 2 ** attemptIndex, 30000));

        return Math.min(1000 * 2 ** attemptIndex, 30000);
      },
    }
  );

  if (isLoading) {
    return <div className="">loading...</div>;
  }

  if (isError) {
    return <p>Error is ....{error?.message}</p>;
  }

  return (
    <>
      {" "}
      <Link href={"/"}>home</Link>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </>
  );
};

export default PersonPage;
