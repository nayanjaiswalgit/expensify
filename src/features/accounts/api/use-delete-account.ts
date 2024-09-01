import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAccount = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await fetch(`/api/accounts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete account");
      }

      if (response.status !== 204) {
        return response.json();
      }
      return;
    },
    onSuccess: (data) => {
      // Assuming data is as expected
      toast.success("Successfully deleted account");
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      // Improved error display
      toast.error(`Failed to delete account: ${error.message}`);
    },
  });

  return mutation;
};
