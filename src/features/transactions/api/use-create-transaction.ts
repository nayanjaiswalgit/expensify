import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await fetch("/api/account");
      return respons.json();
    },
    onSuccess: () => {
      toast.success("Transaction created successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: Invalidate summary
    },
    onError: (error) => {
      toast.error("Failed to create transaction");
    },
  });
  return mutation;
};
