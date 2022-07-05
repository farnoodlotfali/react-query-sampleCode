import { ITodos } from "./Itodos";

export interface IPaginatedTodos {
  todos: ITodos[];
  hasMore: boolean;
}
