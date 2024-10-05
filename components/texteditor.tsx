import '../styles/globals.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import React from 'react'
import TextAlign from '@tiptap/extension-text-align'; // Import TextAlign extension
import { Button, ButtonGroup } from '@nextui-org/button'
import Head from 'next/head'
import {IconAlignCenter, IconAlignLeft, IconAlignRight, IconArrowBackOutline, IconArrowForwardOutline, IconBold, IconBxImageAdd, IconFontColors, IconFormatItalic, IconFormatListBulleted, IconHr, IconItalic, IconOrderedList, IconReturnDownForwardSharp} from '@/styles/icon'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="control-group">
      <ButtonGroup>
   <Button
     onClick={() => editor.chain().focus().toggleBold().run()}
     disabled={!editor.can().chain().focus().toggleBold().run()}
     className={editor.isActive('bold') ? 'is-active' : ''}
   >
     <IconBold/>
   </Button>
   
   <Button
     onClick={() => editor.chain().focus().toggleItalic().run()}
     disabled={!editor.can().chain().focus().toggleItalic().run()}
     className={editor.isActive('italic') ? 'is-active' : ''}
   >
     <IconItalic/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().setColor('#FF0000').run()}
     className={editor.isActive('textStyle', { color: '#FF0000' }) ? 'is-active' : ''}
   >
     <IconFontColors/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().toggleBulletList().run()}
     className={editor.isActive('bulletList') ? 'is-active' : ''}
   >
     <IconFormatListBulleted/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().toggleOrderedList().run()}
     className={editor.isActive('orderedList') ? 'is-active' : ''}
   >
     <IconOrderedList/>
   </Button>

   <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
     <IconHr/>
   </Button>

   <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
     <IconReturnDownForwardSharp/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().setTextAlign('left').run()}
     className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
   >
     <IconAlignLeft/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().setTextAlign('center').run()}
     className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
   >
     <IconAlignCenter/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().setTextAlign('right').run()}
     className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
   >
     <IconAlignRight/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().undo().run()}
     disabled={!editor.can().chain().focus().undo().run()}
   >
    <IconArrowBackOutline/>
   </Button>

   <Button
     onClick={() => editor.chain().focus().redo().run()}
     disabled={!editor.can().chain().focus().redo().run()}
   >
    <IconArrowForwardOutline/>
   </Button>

   <Button onClick={addImage}>
     <IconBxImageAdd/>
   </Button>
</ButtonGroup>

    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
  Document,
  Paragraph,
  Text,
  Image,
  Dropcursor,
  TextAlign.configure({ types: ['heading', 'paragraph'] })
]

const content = `
<h2>Hi there,</h2>
<p>This is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kinds of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p>
<ul>
  <li>That’s a bullet list with one …</li>
  <li>… or two list items.</li>
</ul>
<p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try adding an image:</p>
<img src="https://placehold.co/600x400" />
<blockquote>Wow, that’s amazing. Good work! 👏</blockquote>
`

const TextEditor = ({ setContent }) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
        const html = editor.getHTML(); // Get the HTML content
        setContent(html); // Update the parent state with the content
      },
  })

  return (
    
    
    <div>
        <MenuBar editor={editor} />
        
      <EditorContent editor={editor} />
    </div>

  )
}

export default TextEditor
