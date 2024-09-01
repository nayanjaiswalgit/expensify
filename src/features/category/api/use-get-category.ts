import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Category ID is required");
      }

      const response = await fetch(`/api/categories/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }

      console.log(response, "response");
      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
