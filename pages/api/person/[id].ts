import { NextApiResponse, NextApiRequest } from "next";
import { IPerson } from "../../../src/lib/interfaces/IPerson";

export default (req: NextApiRequest, res: NextApiResponse<IPerson | Error>) => {
  const {
    query: { id },
  } = req;

  if (typeof id === "number" || typeof id === "string") {
    res.status(200).json({ id, name: "ali", age: 25 });
  }
};
