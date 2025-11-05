'use client';

import { LinkPlugin } from '@platejs/link/react';

import { LinkElement } from '@/components/platejs/link-node';
import { LinkFloatingToolbar } from '@/components/platejs/link-toolbar';

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
