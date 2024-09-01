import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const response = fetch("/api");

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
