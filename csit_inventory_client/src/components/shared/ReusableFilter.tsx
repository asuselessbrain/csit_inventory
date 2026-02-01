"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface FilterOption {
  _id: string;
  name: string;
}

interface ReusableFilterProps {
  options: FilterOption[];
  queryKey: string;
  placeholder: string;
}

export default function ReusableFilter({
  options = [],
  queryKey,
  placeholder,
}: ReusableFilterProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValues =
    searchParams.get(queryKey)?.split(",").filter(Boolean) || [];

  const handleSelect = (currentValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedValues = [...selectedValues];

    if (newSelectedValues.includes(currentValue)) {
      newSelectedValues = newSelectedValues.filter((id) => id !== currentValue);
    } else {
      newSelectedValues.push(currentValue);
    }

    if (newSelectedValues.length > 0) {
      params.set(queryKey, newSelectedValues.join(","));
    } else {
      params.delete(queryKey);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearFilter = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    const params = new URLSearchParams(searchParams.toString());
    params.delete(queryKey);
    params.set("page", "1");

    setOpen(false); 
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full sm:min-w-55 h-auto min-h-10 justify-between text-left font-normal px-3 py-2"
          >
            <div className="flex flex-wrap gap-1 max-w-[90%]">
              <span className="text-muted-foreground">{placeholder}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-2">
              {selectedValues.length > 0 && (
                <div
                  role="button"
                  onClick={clearFilter}
                  className="p-0.5 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-3.5 w-3.5 opacity-60 hover:opacity-100" />
                </div>
              )}
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-55 p-0" align="start">
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}...`}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option._id}
                    onSelect={() => handleSelect(option._id)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValues.includes(option._id)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{option.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
