'use client'

import { CheckSquareIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateTaskDialog } from '@/components/create-task-dialog'
import { CreateUserDialog } from '@/components/create-user-dialog'
import { useAuth } from '@/lib/auth-context'

interface HeaderProps {
  onTaskCreated: () => void
}

export function Header({ onTaskCreated }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <CheckSquareIcon className="size-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">TaskFlow</span>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="size-4" />
              <span className="hidden sm:inline">{user.username}</span>
            </div>
          )}
          <CreateUserDialog />
          <CreateTaskDialog onTaskCreated={onTaskCreated} />
          <Button variant="ghost" size="icon" onClick={logout} title="Sair">
            <LogOutIcon className="size-4" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
