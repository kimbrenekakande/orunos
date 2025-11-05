import { BaseCalloutPlugin } from '@platejs/callout';

import { CalloutElementStatic } from '@/components/tiptapui/callout-node-static';

export const BaseCalloutKit = [
  BaseCalloutPlugin.withComponent(CalloutElementStatic),
];
