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
      <span className="text-sm text-muted-foreground">Filtrar por:</span>
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas ({taskCounts.all})</SelectItem>
          <SelectItem value="pending">Pendentes ({taskCounts.pending})</SelectItem>
          <SelectItem value="in_progress">
            Em Progresso ({taskCounts.in_progress})
          </SelectItem>
          <SelectItem value="completed">
            Concluídas ({taskCounts.completed})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
