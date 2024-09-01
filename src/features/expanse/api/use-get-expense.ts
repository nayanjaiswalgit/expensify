import { useQuery } from "@tanstack/react-query";

export const useGetExpense = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["expense", { id }],
    queryFn: async () => {
      const response = await fetch(`/api/expenses/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch expense");
      }

      return response.json();
    },
  });
  return query;
};
