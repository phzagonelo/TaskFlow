'use client'

import { CheckCircleIcon, ClockIcon, ListTodoIcon, PlayCircleIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface StatsCardsProps {
  counts: {
    all: number
    pending: number
    in_progress: number
    completed: number
  }
}

export function StatsCards({ counts }: StatsCardsProps) {
  const stats = [
    {
      label: 'Total',
      value: counts.all,
      icon: ListTodoIcon,
      color: 'text-foreground',
      bg: 'bg-muted',
    },
    {
      label: 'Pending',
      value: counts.pending,
      icon: ClockIcon,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      label: 'In Progress',
      value: counts.in_progress,
      icon: PlayCircleIcon,
      color: 'text-info',
      bg: 'bg-info/10',
    },
    {
      label: 'Completed',
      value: counts.completed,
      icon: CheckCircleIcon,
      color: 'text-success',
      bg: 'bg-success/10',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-border/50 bg-card p-4 transition-colors hover:bg-card/80"
        >
          <div className="flex items-center gap-4">
            <div className={`flex size-10 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={`size-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
