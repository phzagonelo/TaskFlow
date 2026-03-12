'use client'

import { useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'
import { RefreshCwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { StatsCards } from '@/components/stats-cards'
import { TaskFilters } from '@/components/task-filters'
import { TaskList } from '@/components/task-list'
import { getTasks } from '@/lib/api'
import { AuthGuard } from '@/components/auth-guard'
import type { Task, TaskStatus } from '@/lib/types'

export default function TaskManagementPage() {
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all')

  const {
    data: tasks = [],
    isLoading,
    mutate,
  } = useSWR<Task[]>('tasks', getTasks, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  const handleRefresh = useCallback(() => {
    mutate()
  }, [mutate])

  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    }),
    [tasks]
  )

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header onTaskCreated={handleRefresh} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            Gestão de Tarefas
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Gerencie suas tarefas de forma eficiente. Crie, visualize e filtre
            suas atividades.
          </p>
        </div>

        <StatsCards counts={taskCounts} />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCwIcon className="size-4" />
            Atualizar
          </Button>
        </div>

        <div className="mt-6">
          <TaskList tasks={tasks} isLoading={isLoading} filter={filter} onStatusChange={handleRefresh} />
        </div>
      </main>

      <footer className="border-t border-border/50 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          <p>
            TaskFlow &copy; {new Date().getFullYear()} &mdash; Sistema de Gestão
            de Tarefas
          </p>
        </div>
      </footer>
      </div>
    </AuthGuard>
  )
}
