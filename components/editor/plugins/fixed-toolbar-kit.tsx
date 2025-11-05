'use client';

import { createPlatePlugin } from 'platejs/react';

import { FixedToolbar } from '@/components/tiptapui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/tiptapui/fixed-toolbar-buttons';

export const FixedToolbarKit = [
  createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
      ),
    },
  }),
];
