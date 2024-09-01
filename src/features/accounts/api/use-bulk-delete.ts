import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await fetch("api/accounts");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      // TODO: Also invalidate the summary
    },
    onError: (error) => {
      toast.error("Failed to delete account");
    },
  });
  return mutation;
};
