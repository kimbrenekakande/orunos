import { BaseTocPlugin } from '@platejs/toc';

import { TocElementStatic } from '@/components/platejs/toc-node-static';

export const BaseTocKit = [BaseTocPlugin.withComponent(TocElementStatic)];
