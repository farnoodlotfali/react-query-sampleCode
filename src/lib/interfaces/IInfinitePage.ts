import { ITodos } from "./Itodos";

export interface IInfinitePage {
  nextpage: number | undefined;
  page: {
    todos: ITodos[];
    hasMore: boolean;
  };
}
