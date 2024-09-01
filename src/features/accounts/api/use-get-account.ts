import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const response = await fetch(`/api/accounts/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch expense");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
