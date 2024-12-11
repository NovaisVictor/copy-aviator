'use client'
import { cn } from '@/lib/utils'
import { HomeIcon, Plane, Play, Video } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavMenu() {
  const pathName = usePathname()
  return (
    <div className="fixed bottom-2 right-2 left-2 z-[100000]">
      <div className="flex justify-around rounded-full border border-primary items-center bg-accent p-1 pb-4 uppercase font-semibold text-sm">
        <div className="flex flex-col items-center justify-center space-y-0">
          <Link
            href={'/'}
            className={cn(
              'p-2 rounded-md',
              pathName === '/' && 'bg-primary -translate-y-3.5 transition-all',
            )}
          >
            <HomeIcon className="size-8" />
          </Link>
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-0">
          <Link
            href={'/live'}
            className={cn(
              'p-2 rounded-md',
              pathName === '/live' &&
                'bg-primary -translate-y-3.5 transition-all',
            )}
          >
            <Video className="size-8" />
          </Link>
          <p>Lives</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-0">
          <Link
            href={'/aviator'}
            className={cn(
              'p-2 rounded-md',
              pathName === '/aviator' &&
                'bg-primary -translate-y-3.5 transition-all',
            )}
          >
            <Plane className="size-8 tex" />
          </Link>
          <p>Aviator</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-0">
          <Link
            href={'/course'}
            className={cn(
              'p-2 rounded-md',
              pathName === '/course' &&
                'bg-primary -translate-y-3.5 transition-all',
            )}
          >
            <Play className="size-8" />
          </Link>
          <p>Aulas</p>
        </div>
      </div>
    </div>
  )
}
