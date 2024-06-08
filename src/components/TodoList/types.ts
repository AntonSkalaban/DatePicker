export interface TodoListProps {
  todoData: { date: string; todo: string[] };
  onClose: () => void;
  addTodo: ({ date, todo }: { date: string; todo: string[] }) => void;
}
