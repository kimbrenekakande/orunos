import { BaseCommentPlugin } from '@platejs/comment';

import { CommentLeafStatic } from '@/components/platejs/comment-node-static';

export const BaseCommentKit = [
  BaseCommentPlugin.withComponent(CommentLeafStatic),
];
