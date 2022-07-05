import Link from "next/link";
import { useState } from "react";
import {
  Query,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import PersonComponent from "../../src/components/PersonComponent";
import { IPerson } from "../../src/lib/interfaces/IPerson";
import { ITodos } from "../../src/lib/interfaces/Itodos";

export const fetchData = async () => {
  const res = await fetch("/api/person");
  if (res.ok) {
    return res.json();
  }
  throw new Error("error");
};
export const fetchTodo = async () => {
  const res = await fetch("/api/todo");
  if (res.ok) {
    return res.json();
  }

  throw new Error("error");
};

const Person: React.FC = () => {
  const [enabled, setenabled] = useState(true);
  const queryClient = useQueryClient();
  const { status, isSuccess, error, data }: UseQueryResult<IPerson, Error> =
    useQuery<IPerson, Error, IPerson, string>("person", fetchData, {
      enabled,
      //   refetchOnWindowFocus: false,
    });

  const { isSuccess: todoSuccess }: UseQueryResult<ITodos, Error> = useQuery<
    ITodos,
    Error,
    ITodos,
    string
  >("todo", fetchTodo, {
    enabled,
    //   refetchOnWindowFocus: false,
  });

  const usequeries = useQueries(
    ["1", "2", "3"].map((id) => {
      return {
        queryKey: ["todo", { page: id }],
        queryFn: () => {
          return id;
        },
        enabled,
      };
    })
  );

  if (isSuccess && enabled && todoSuccess) {
    setenabled(false);
  }

  if (status === "loading") {
    return <div className="">loading...</div>;
  }

  if (status === "error") {
    return <p>Error is ....{error?.message}</p>;
  }
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          queryClient.invalidateQueries();
        }}
      >
        invalidate Queries
      </button>{" "}
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          queryClient.invalidateQueries("person");
        }}
      >
        invalidate person
      </button>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          queryClient.invalidateQueries("todo");
        }}
      >
        invalidate todo
      </button>{" "}
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          queryClient.invalidateQueries(["todo", "1"], {
            exact: true,
          });
        }}
      >
        invalidate todo1
      </button>{" "}
      <br />
      <button
        onClick={(event) => {
          event.preventDefault();
          queryClient.invalidateQueries({
            predicate: (query): any => {
              let x: any = query?.queryKey[1];
              // eslint-disable-next-line radix
              return parseInt(x?.page) % 2 === 1;
            },
          });
        }}
      >
        invalidate todo odd
      </button>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
      {/* <h1>sss</h1>
      <PersonComponent /> */}
    </>
  );
};

export default Person;
