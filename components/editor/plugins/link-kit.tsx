'use client';

import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '@/components/tiptapui/link-node';
import { LinkFloatingToolbar } from '@/components/tiptapui/link-toolbar';

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
