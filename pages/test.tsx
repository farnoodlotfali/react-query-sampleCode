/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
// index.tsx
import Link from "next/link";
import React, { FC, Fragment } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";
var myHeaders = new Headers();
myHeaders.append("ApiCode", "ab270f5c8ff3184f993a8b6711789e9497f92c9d");
myHeaders.append("Authorization", "039163556401e5308ed52330d254b9db047c1711");

var requestOptions: any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
const fetchTodos = ({ pageParam = 0 }: QueryFunctionContext) => {
  fetch(
    `https://api.repairshop.b-test.ir/api/v1/customer/list?start=${pageParam}&limit=100&searchWord=&searchMobile=&status=all`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const PaginatedTodoPage: FC = () => {
  const { isSuccess, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<any, Error>("customer", fetchTodos, {
      getNextPageParam: (lastPage) => lastPage.nextpage,
    });

  return (
    <>
      {isSuccess &&
        data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page?.customers.map((customer: any) => {
              if (customer.vehicles.length === 0) {
                return (
                  <Fragment key={customer.id}>
                    <div className="">
                      {customer.fname + " " + customer.lname}
                    </div>
                  </Fragment>
                );
              }
              return customer.vehicles.map((vehicle: any, j: number) => {
                return (
                  <Fragment key={customer.id + j}>
                    <div className="">
                      {customer.fname + " " + customer.lname}
                    </div>
                  </Fragment>
                );
              });
            })}
          </Fragment>
        ))}

      <button
        type="button"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
      <div className="">
        <Link href={"/"}>Back</Link>
      </div>
    </>
  );
};

export default PaginatedTodoPage;
