import { useState, useCallback, useMemo } from "react";

const useTodoStatus = () => {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const moveToCompleted = useCallback((todo) => {
    setPendingTodos((prev) => prev.filter((item) => item.id !== todo.id));
    setCompletedTodos((prev) => [...prev, todo]);
  }, []);

  const moveToPending = useCallback((todo) => {
    setCompletedTodos((prev) => prev.filter((item) => item.id !== todo.id));
    setPendingTodos((prev) => [...prev, todo]);
  }, []);

  const sortedPending = useMemo(() => {
    return [...pendingTodos].sort((a, b) => a.title.localeCompare(b.title));
  }, [pendingTodos]);

  const sortedCompleted = useMemo(() => {
    return [...completedTodos].sort((a, b) => a.title.localeCompare(b.title));
  }, [completedTodos]);

  return {
    pendingTodos: sortedPending,
    completedTodos: sortedCompleted,
    setPendingTodos,
    setCompletedTodos,
    moveToCompleted,
    moveToPending,
  };
};

export default useTodoStatus;
