import { useQuery } from "@tanstack/react-query";

// Simplified fetch function with error handling

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await fetch("/api/expenses");

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const { data } = await response.json();
      return data;
    },
    // e.g., staleTime: 60000 // data is considered fresh for 1 minute
  });
};
