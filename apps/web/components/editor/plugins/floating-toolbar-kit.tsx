'use client';

import { createPlatePlugin } from 'platejs/react';

import { FloatingToolbar } from '@/components/platejs/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/platejs/floating-toolbar-buttons';

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      ),
    },
  }),
];
