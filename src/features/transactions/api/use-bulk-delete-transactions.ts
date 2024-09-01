import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await fetch("api/tr");
      return response;
    },
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: Also invalidate the summary
    },
    onError: (error) => {
      toast.error("Failed to delete transactions");
    },
  });
  return mutation;
};
