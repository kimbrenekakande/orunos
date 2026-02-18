import { BaseTogglePlugin } from '@platejs/toggle';

import { ToggleElementStatic } from '@/components/platejs/toggle-node-static';

export const BaseToggleKit = [
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
