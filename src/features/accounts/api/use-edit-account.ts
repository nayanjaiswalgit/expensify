import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditAccount = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await fetch("/act");

      return response.json();
    },
    onSuccess: () => {
      toast.success("Account Deleted");
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      //TODO: Invalidate summary and trasactions
    },
    onError: (error) => {
      toast.error("Failed to delete account");
    },
  });
  return mutation;
};
