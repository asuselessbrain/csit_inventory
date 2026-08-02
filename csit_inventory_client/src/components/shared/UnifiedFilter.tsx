"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check, Filter, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface FilterOption {
  id: string;
  name: string;
}

export interface FilterGroupDef {
  title: string;
  queryKey: string;
  options: FilterOption[];
}

interface UnifiedFilterProps {
  filters: FilterGroupDef[];
}

export default function UnifiedFilter({ filters }: UnifiedFilterProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  let activeFilterCount = 0;
  filters.forEach((filter) => {
    const values = searchParams.get(filter.queryKey)?.split(",").filter(Boolean) || [];
    activeFilterCount += values.length;
  });

  const handleSelect = (queryKey: string, optionId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(queryKey)?.split(",").filter(Boolean) || [];
    let newValues = [...currentValues];

    if (newValues.includes(optionId)) {
      newValues = newValues.filter((id) => id !== optionId);
    } else {
      newValues.push(optionId);
    }

    if (newValues.length > 0) {
      params.set(queryKey, newValues.join(","));
    } else {
      params.delete(queryKey);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const params = new URLSearchParams(searchParams.toString());
    filters.forEach((filter) => {
      params.delete(filter.queryKey);
    });
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between gap-2 h-10 min-w-[150px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </div>
            {activeFilterCount > 0 && (
              <div className="flex items-center">
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="px-1 font-normal lg:hidden">
                  {activeFilterCount}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  <Badge variant="secondary" className="px-1 font-normal">
                    {activeFilterCount} selected
                  </Badge>
                </div>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search filters..." />
            <CommandList>
              <ScrollArea className="h-[300px]">
                <CommandEmpty>No results found.</CommandEmpty>
                {filters.map((group, index) => {
                  const selectedValues = searchParams.get(group.queryKey)?.split(",").filter(Boolean) || [];
                  return (
                    <div key={group.queryKey}>
                      <CommandGroup heading={group.title}>
                        {group.options.map((option) => (
                          <CommandItem
                            key={option.id}
                            onSelect={() => handleSelect(group.queryKey, option.id)}
                            className="flex items-center gap-2"
                          >
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary transition-colors",
                                selectedValues.includes(option.id)
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className={cn("h-4 w-4")} />
                            </div>
                            <span className="flex-1 break-words">{option.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {index < filters.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </ScrollArea>
            </CommandList>
          </Command>
          {activeFilterCount > 0 && (
            <div className="p-2 border-t">
              <Button
                variant="ghost"
                className="w-full text-sm text-center text-muted-foreground hover:text-foreground"
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
