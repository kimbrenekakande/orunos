'use client';

import { cn } from '@/lib/utils';

import { Toolbar } from './toolbar';

export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <div className="sticky  scrollbar-hide top-0 pt-4 left-0 z-60 w-full overflow-x-auto border-b border-b-border bg-background/95 backdrop-blur-sm supports-backdrop-blur:bg-background/60">
      <Toolbar
        {...(props as any)}
        className={cn(
          'flex w-full min-w-max flex-nowrap gap-1 p-1',
          props.className
        )}
      />
    </div>
  );
}
