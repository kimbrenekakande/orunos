import { BaseColumnItemPlugin, BaseColumnPlugin } from '@platejs/layout';

import {
  ColumnElementStatic,
  ColumnGroupElementStatic,
} from '@/components/platejs/column-node-static';

export const BaseColumnKit = [
  BaseColumnPlugin.withComponent(ColumnGroupElementStatic),
  BaseColumnItemPlugin.withComponent(ColumnElementStatic),
];
