import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditAccount = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (data) => {
      const response = await fetch(`/api/accounts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update account with ID ${id}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Account Updated");
      // Invalidate the updated account's query
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      // Invalidate the accounts list to reflect the change
      queryClient.invalidateQueries({ queryKey: ["accounts"] });

      // queryClient.invalidateQueries({ queryKey: ["summary"] });
      // queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(`Failed to update account: ${error.message}`);
    },
  });

  return mutation;
};
