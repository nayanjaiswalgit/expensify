import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useOpenCategory } from "@/features/category/hooks/use-open-category";
import { useOpenTransactions } from "@/features/transactions/hooks/use-open-transaction";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import React from "react";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};
const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { opOpen: onOpenTransaction } = useOpenTransactions();

  const onClick = () => {
    if (categoryId) onOpenCategory(categoryId);
    else {
      onOpenTransaction(id);
    }
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline ",
        !category && "text-rose-500"
      )}
    >
      {!category && <TriangleAlert className="mr-2 size-4  shrink-0" />}
      {category || "UnCategorized"}
    </div>
  );
};

export default CategoryColumn;
