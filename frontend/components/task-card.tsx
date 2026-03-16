'use client'

import { useState } from 'react'
import { CalendarIcon, ClockIcon, PlayIcon, CheckIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { updateTaskStatus } from '@/lib/api'
import type { Task } from '@/lib/types'

interface TaskCardProps {
  task: Task
  onStatusChange?: () => void
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-warning/20 text-warning border-warning/30',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-info/20 text-info border-info/30',
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/20 text-success border-success/30',
  },
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const status = statusConfig[task.status]
  const deadline = new Date(task.deadline)
  const isOverdue = deadline < new Date() && task.status !== 'completed'
  const formattedDate = deadline.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const handleStartTask = async () => {
    setIsUpdating(true)
    try {
      await updateTaskStatus(task.id, 'in_progress')
      onStatusChange?.()
    } catch (error) {
      console.error('Error starting task:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCompleteTask = async () => {
    setIsUpdating(true)
    try {
      await updateTaskStatus(task.id, 'completed')
      onStatusChange?.()
    } catch (error) {
      console.error('Error completing task:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-balance font-medium leading-tight text-foreground">
            {task.title}
          </h3>
          <Badge className={status.className}>{status.label}</Badge>
        </div>

        {task.description && (
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className={`flex items-center gap-1.5 ${isOverdue ? 'text-destructive' : ''}`}>
            {isOverdue ? (
              <ClockIcon className="size-3.5" />
            ) : (
              <CalendarIcon className="size-3.5" />
            )}
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground/70">User ID:</span>
            <span>{task.user_id}</span>
          </div>
        </div>

        {task.status !== 'completed' && (
          <div className="mt-1 flex items-center gap-2 border-t border-border/50 pt-3">
            {task.status === 'pending' && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleStartTask}
                disabled={isUpdating}
                className="h-8 flex-1 gap-2 border-info/30 text-info hover:border-info hover:bg-info/10 hover:text-info"
              >
                {isUpdating ? <Spinner className="size-3.5" /> : <PlayIcon className="size-3.5" />}
                Start Task
              </Button>
            )}
            {task.status === 'in_progress' && (
              <Button
                size="sm"
                onClick={handleCompleteTask}
                disabled={isUpdating}
                className="h-8 flex-1 gap-2 bg-success/20 text-success hover:bg-success/30"
              >
                {isUpdating ? <Spinner className="size-3.5" /> : <CheckIcon className="size-3.5" />}
                Complete Task
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  )
}
