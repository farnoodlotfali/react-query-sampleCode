import { NextApiRequest, NextApiResponse } from "next";
import { IInfinitePage } from "../../../../src/lib/interfaces/IInfinitePage";
import { ITodos } from "../../../../src/lib/interfaces/Itodos";

export default (
  req: NextApiRequest,
  res: NextApiResponse<{ page: { todos: ITodos[]; hasMore: boolean } } | Error>
): void => {
  const {
    query: { page },
  } = req;

  if (typeof page === "string") {
    console.log(`getting infinite page page: ${page}`);
    const returnTodos: ITodos[] = [];
    // eslint-disable-next-line radix
    const numberpage = parseInt(page);
    // eslint-disable-next-line radix
    const nums = numberpage * 5;
    for (let i = nums; i < nums + 5; i += 1) {
      const returnTodo: ITodos = {
        id: i,
        message: `Todo number: ${i}`,
      };
      returnTodos.push(returnTodo);
    }

    const testPage: IInfinitePage = {
      nextpage: numberpage + 1 < 4 ? numberpage + 1 : undefined,
      page: {
        todos: returnTodos,
        hasMore: page !== "4",
      },
    };

    res.status(200).json(testPage);
  } else {
    res.status(500).json(new Error("id is not of correct type"));
  }
};
