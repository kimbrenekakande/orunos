import { BaseMentionPlugin } from '@platejs/mention';

import { MentionElementStatic } from '@/components/tiptapui/mention-node-static';

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
];
