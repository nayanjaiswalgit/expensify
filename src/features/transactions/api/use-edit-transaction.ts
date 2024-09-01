import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await fetch("/api/catter");
      return response;
    },
    onSuccess: () => {
      toast.success("Transaction Deleted");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      //TODO: Invalidate summary and trasactions
    },
    onError: (error) => {
      toast.error("Failed to edit  transaction");
    },
  });
  return mutation;
};
