'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TaskStatus } from '@/lib/types'

interface TaskFiltersProps {
  filter: TaskStatus | 'all'
  onFilterChange: (filter: TaskStatus | 'all') => void
  taskCounts: {
    all: number
    pending: number
    in_progress: number
    completed: number
  }
}

export function TaskFilters({
  filter,
  onFilterChange,
  taskCounts,
}: TaskFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Filter by:</span>
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All ({taskCounts.all})</SelectItem>
          <SelectItem value="pending">Pending ({taskCounts.pending})</SelectItem>
          <SelectItem value="in_progress">
            In Progress ({taskCounts.in_progress})
          </SelectItem>
          <SelectItem value="completed">
            Completed ({taskCounts.completed})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
