'use client'

import { ListTodoIcon } from 'lucide-react'
import { TaskCard } from '@/components/task-card'
import { Empty } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import type { Task, TaskStatus } from '@/lib/types'

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
  filter: TaskStatus | 'all'
  onStatusChange?: () => void
}

export function TaskList({ tasks, isLoading, filter, onStatusChange }: TaskListProps) {
  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.status === filter)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner className="size-8 text-primary" />
      </div>
    )
  }

  if (filteredTasks.length === 0) {
    return (
      <Empty
        icon={ListTodoIcon}
        title="No tasks found"
        description={
          filter === 'all'
            ? 'Create a new task to get started.'
            : `No tasks with status "${filter === 'pending' ? 'Pending' : filter === 'in_progress' ? 'In Progress' : 'Completed'}".`
        }
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  )
}
