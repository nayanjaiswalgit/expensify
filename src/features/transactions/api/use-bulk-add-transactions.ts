import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await fetch("api/trnas");
      return response;
    },
    onSuccess: () => {
      toast.success("Transaction created successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: Also invalidate the summary
    },
    onError: (error) => {
      toast.error("Failed to create transactions");
    },
  });
  return mutation;
};
