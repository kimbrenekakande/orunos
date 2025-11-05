import { BaseMentionPlugin } from '@platejs/mention';

import { MentionElementStatic } from '@/components/platejs/mention-node-static';

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
];
