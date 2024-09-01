import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (data) => {
      const response = await fetch("/api/accounts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create accounts`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error("Failed to create account");
    },
  });
  return mutation;
};
