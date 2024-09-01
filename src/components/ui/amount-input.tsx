import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const AmountInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;
  const onReverseValue = () => {
    if (!value) return;
    const newValue = parseFloat(value) * -1;
    onChange((newValue * -1).toString());
  };
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "bg-slate-400 hover:bg-slate-500 absolute top-1.5  left-1.5 rounded-md flex items-center justify-center transition",
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600"
              )}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <PlusCircle className="size-3 text-white" />}
              {isExpense && <MinusCircle className="size-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] for income and [-] for expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="₹"
        className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={value}
        decimalScale={2}
        decimalsLimit={2}
        onValueChange={onChange}
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && "This will count as income"}
        {isExpense && "This will count as an expense"}
      </p>
    </div>
  );
};

//  <TooltipProvider>
//             <TooltipTrigger>
//               <CurrencyInput
//                 className={cn("w-full", "text-sm", "pr-10", disabled? "text-gray-400" : "text-gray-900")}
//                 value={value}
//                 onChange={onChange}
//                 disabled={disabled}
//                 placeholder={placeholder}
//               />
//               {isIncome && (
//                 <Tooltip content={<TooltipContent>Income</TooltipContent>}>
//                   <PlusCircle className="absolute top-1 right-1 text-white" />
//                 </Tooltip>
//               )}
//               {isExpense && (
//                 <Tooltip content={<TooltipContent>Expense</TooltipContent>}>
//                   <MinusCircle className="absolute top-1 right-1 text-white" />
//                 </Tooltip>
//               )}
//               {!disabled && (
//                 <Tooltip content={<TooltipContent>Reverse</TooltipContent>}>
//                   <Info className="absolute top-1 right-2 text-white" />
//                 </Tooltip>
//         </TooltipProvider>
