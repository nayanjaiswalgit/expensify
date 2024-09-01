import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteExpense = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await fetch("/api/expense");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Expense deleted");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      // TODO: Also invalidate the summary
    },
    onError: (error) => {
      toast.error("Failed to delete expense");
    },
  });

  return mutation;
};
