import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import React from "react";

type Props = {
  id: string;
  account: string | null;
  accountId: string | null;
};
const AccountColumn = ({ id, account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    onOpenAccount(accountId);
  };
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline "
    >
      {AccountColumn}
    </div>
  );
};

export default AccountColumn;
