import type { NextApiRequest, NextApiResponse } from "next";
import { IPerson } from "../../../src/lib/interfaces/IPerson";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPerson>
) {
  console.log(11);

  res.status(200).json({ id: "1", age: 33, name: "John Doe" });
}
