'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CourseTableControls() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    /* ---------------- Helpers ---------------- */

    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            value ? params.set(key, value) : params.delete(key)
        })

        params.set('page', '1')
        router.push(`${pathname}?${params.toString()}`)
    }

    /* ---------------- Search ---------------- */

    const handleSearch = useDebouncedCallback((value: string) => {
        updateParams({ search: value || null })
    }, 400)

    /* ---------------- Sort ---------------- */
    const clearSort = () => {
        updateParams({
            sortBy: null,
            sortOrder: null,
        })
    }


    return (
        <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

            {/* 🔍 Search */}
            <Input
                placeholder="Search by course name / code..."
                defaultValue={searchParams.get('search') ?? ''}
                onChange={(e) => handleSearch(e.target.value)}
                className="sm:max-w-xs"
            />

            <div className="flex flex-wrap gap-2">

                {/* 🎯 Status Filter */}
                <Select
                    defaultValue={searchParams.get('status') ?? 'all'}
                    onValueChange={(value) =>
                        updateParams({ status: value === 'all' ? null : value })
                    }
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                </Select>

                {/* 🔽 Sort Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            Sort
                            <ArrowUpDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-60">

                        {/* 🔄 Default */}
                        <DropdownMenuItem onClick={clearSort}>
                            Default (Backend order)
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Course Code */}
                        <DropdownMenuItem
                            onClick={() =>
                                updateParams({ sortBy: 'courseCode', sortOrder: 'asc' })
                            }
                        >
                            Course Code (A → Z)
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                updateParams({ sortBy: 'courseCode', sortOrder: 'desc' })
                            }
                        >
                            Course Code (Z → A)
                        </DropdownMenuItem>

                        {/* Credits */}
                        <DropdownMenuItem
                            onClick={() =>
                                updateParams({ sortBy: 'credits', sortOrder: 'asc' })
                            }
                        >
                            Credits (Low → High)
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                updateParams({ sortBy: 'credits', sortOrder: 'desc' })
                            }
                        >
                            Credits (High → Low)
                        </DropdownMenuItem>

                        {/* Created At */}
                        <DropdownMenuItem
                            onClick={() =>
                                updateParams({ sortBy: 'createdAt', sortOrder: 'desc' })
                            }
                        >
                            Created (Newest First)
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                updateParams({ sortBy: 'createdAt', sortOrder: 'asc' })
                            }
                        >
                            Created (Oldest First)
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </div>
    )
}
