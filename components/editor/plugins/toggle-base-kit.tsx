import { BaseTogglePlugin } from '@platejs/toggle';

import { ToggleElementStatic } from '@/components/tiptapui/toggle-node-static';

export const BaseToggleKit = [
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
