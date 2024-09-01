import { useQuery } from "@tanstack/react-query";

// Simplified fetch function with error handling

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const { data } = await response.json();
      return data;
    },
    // e.g., staleTime: 60000 // data is considered fresh for 1 minute
  });
};
