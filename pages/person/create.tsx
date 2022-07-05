import React, { FormEventHandler, useState } from "react";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { fetchData } from ".";
import { IPerson } from "../../src/lib/interfaces/IPerson";

const createPerson = async (
  id: string,
  name: string,
  age: number
): Promise<IPerson> => {
  const res: Response = await fetch("/api/person/create", {
    method: "POST",
    body: JSON.stringify({
      id,
      name,
      age,
    }),
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("invalid");
};

interface IPersonCreate {
  id: string;
  name: string;
  age: number;
}

interface IContext {
  previousPerson: IPerson | undefined;
}
const Create: React.FC = () => {
  const queryClient = useQueryClient();
  const [enabled, setenabled] = useState(false);

  const { isLoading, data: queryData }: UseQueryResult<IPerson, Error> =
    useQuery<IPerson, Error>("person", fetchData, { enabled });
  //
  const mutation: UseMutationResult<IPerson, Error, IPersonCreate> =
    useMutation<IPerson, Error, IPersonCreate, IContext | undefined>(
      async ({ id, name, age }) => createPerson(id, name, age),
      {
        onMutate: (_variables: IPersonCreate) => {
          // await queryClient.cancelQueries("person");
          const previousPerson: IPerson | undefined =
            queryClient.getQueryData("person");
          const newTodo: IPerson = {
            id: "123",
            age: 121,
            name: "lole",
          };
          queryClient.setQueryData("person", newTodo);
          return { previousPerson };
        },

        onSuccess: (
          data: IPerson,
          _variables: IPersonCreate,
          _context: IContext | undefined
        ) => {
          queryClient.invalidateQueries("person");
          console.log("onSuccess", data);
        },
        onError: (
          error: Error,
          _variables: IPersonCreate,
          context: IContext | undefined
        ) => {
          queryClient.setQueryData("person", context?.previousPerson);
          console.log("onError", error, " id", context?.previousPerson?.id);
        },

        // no matter if error or success run me
        onSettled: (
          _data: IPerson | undefined,
          _error: Error | null,
          _variables: IPersonCreate | undefined,
          _context: IContext | undefined
        ) => {
          return console.log("complete mutation!");
        },
      }
    );

  const onSubmit: FormEventHandler<HTMLFormElement> = async (
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: number };
    };

    const id = "1";
    const name = target.name.value;
    const age = target.age.value;

    mutation.mutate({ id, name, age });
  };

  return (
    <>
      {mutation.isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          {mutation.isError ? (
            <div>error happened : {mutation?.error?.message}</div>
          ) : null}
          {mutation.isSuccess ? (
            <div className="">
              todo added person name is {mutation?.data?.name} and age is{" "}
              {mutation?.data?.age}
            </div>
          ) : null}
        </>
      )}

      <button
        onClick={() => {
          setenabled(!enabled);
          queryClient.invalidateQueries("person");
        }}
      >
        invalidate cache
      </button>

      <form onSubmit={onSubmit}>
        <label htmlFor="name">name:</label>
        <br />
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="age">age:</label>
        <br />
        <input type="number" id="age" name="age" />
        <br />
        <br />
        <input type="submit" value="submit" />
      </form>

      {queryData && (
        <>
          <p>name:{queryData?.name}</p>
          <p>age:{queryData?.age}</p>
        </>
      )}
    </>
  );
};

export default Create;
