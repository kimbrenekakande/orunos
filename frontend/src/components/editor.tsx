'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TiptapEditor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style : ' padding-left: 56px; padding-right: 56px; padding-top: 56px;',
        class: 'focus:outline-none print:border-0 bg-white border rounded-sm border-gray-200 flex flex-col min-h-[90vh] mb-10 w-[816px] pr-14 pb-10 ', //edits inner editor area
      }
    },
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  return(
    <div className='h-full overflow-x-auto bg-white px-4 print:p-0 print:bg-white print:overflow-visible '>
      <div className='min-w-max bg-white flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TiptapEditor