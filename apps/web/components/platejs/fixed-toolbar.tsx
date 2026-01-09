'use client';

import { cn } from '@/lib/utils';

import { Toolbar } from './toolbar';

export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <div className="sticky top-0 left-0 z-50 w-full overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur-sm supports-backdrop-blur:bg-background/60">
      <Toolbar
        {...props}
        className={cn(
          'flex w-full min-w-max flex-nowrap gap-1 p-1',
          props.className
        )}
      />
    </div>
  );
}
