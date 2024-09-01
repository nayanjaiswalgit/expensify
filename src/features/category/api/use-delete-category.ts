import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete category");
      }
      if (response.status !== 204) {
        return response.json();
      }
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
  return mutation;
};
