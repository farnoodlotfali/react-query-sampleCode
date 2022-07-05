import type { NextApiRequest, NextApiResponse } from "next";
import { ITodos } from "../../src/lib/interfaces/Itodos";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITodos>
) {
  res.status(200).json({ id: 1, message: "im todo" });
}
