'use client';

import { CaptionPlugin } from '@platejs/caption/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@platejs/media/react';
import { KEYS } from 'platejs';

import { AudioElement } from '@/components/platejs/media-audio-node';
import { MediaEmbedElement } from '@/components/platejs/media-embed-node';
import { FileElement } from '@/components/platejs/media-file-node';
import { ImageElement } from '@/components/platejs/media-image-node';
import { PlaceholderElement } from '@/components/platejs/media-placeholder-node';
import { MediaPreviewDialog } from '@/components/platejs/media-preview-dialog';
import { MediaUploadToast } from '@/components/platejs/media-upload-toast';
import { VideoElement } from '@/components/platejs/media-video-node';

export const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    render: { afterEditable: MediaPreviewDialog, node: ImageElement },
  }),
  MediaEmbedPlugin.withComponent(MediaEmbedElement),
  VideoPlugin.withComponent(VideoElement),
  AudioPlugin.withComponent(AudioElement),
  FilePlugin.withComponent(FileElement),
  PlaceholderPlugin.configure({
    options: { disableEmptyPlaceholder: true },
    render: { afterEditable: MediaUploadToast, node: PlaceholderElement },
  }),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
];
