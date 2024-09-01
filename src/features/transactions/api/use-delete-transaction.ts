import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await fetch("/api/account");
      return response;
    },
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
    },
    onError: (error) => {
      toast.error("Failed to delete transaction");
    },
  });
  return mutation;
};
