import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCategory = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (data) => {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to update category with ID ${id}`);
      }
      return response.json();
    },

    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error("Failed to update this category");
    },
  });
  return mutation;
};
