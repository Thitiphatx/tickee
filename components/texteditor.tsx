import '../styles/globals.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Image as TipTapImage } from '@tiptap/extension-image'
import React from 'react'
import TextAlign from '@tiptap/extension-text-align'; // Import TextAlign extension
import { Button } from '@nextui-org/button'
import { IconAlignCenter, IconAlignLeft, IconAlignRight, IconArrowBackOutline, IconArrowForwardOutline, IconBold, IconBxImageAdd, IconFontColors, IconFormatItalic, IconFormatListBulleted, IconHr, IconItalic, IconOrderedList, IconReturnDownForwardSharp } from '@/styles/icon'
import { Tooltip } from '@nextui-org/tooltip'



const MenuBar = ({ editor }) => {
    if (!editor) return null

    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div className="max-w-screen-md">
            <div className="space-x-2">
                <Tooltip content="ตัวหนา" placement="bottom">
                    <Button
                        isIconOnly
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        <IconBold width="1.2rem" height="1.2rem" />
                    </Button>
                </Tooltip>

                <Tooltip content="ตัวเอียง" placement="bottom">
                <Button
                    isIconOnly
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <IconItalic width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="สีแดง" placement="bottom">
                <Button
                    isIconOnly
                    onClick={() => editor.chain().focus().setColor('#FF0000').run()}
                    className={editor.isActive('textStyle', { color: '#FF0000' }) ? 'is-active' : ''}
                >
                    <IconFontColors width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="Bullet" placement="bottom">
                <Button
                    isIconOnly
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <IconFormatListBulleted width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="Order" placement="bottom">
                <Button
                    isIconOnly
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <IconOrderedList width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="คั่นหน้า" placement="bottom">
                <Button 
                    isIconOnly
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    <IconHr width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="ชิดซ้าย" placement="bottom">
                <Button
                    isIconOnly
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                    <IconAlignLeft width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="กึ่งกลาง" placement="bottom">
                <Button
                    isIconOnly
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                    <IconAlignCenter width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="ชิดขวา" placement="bottom">

                <Button
                    isIconOnly
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                    <IconAlignRight width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="เลิกทำ" placement="bottom">
                <Button
                    isIconOnly
                    className="cursor-pointer"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <IconArrowBackOutline width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="ทำซ้ำ" placement="bottom">
                <Button
                    isIconOnly
                    className="cursor-pointer"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    <IconArrowForwardOutline width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>
                <Tooltip content="เพิ่มรูปภาพ" placement="bottom">
                <Button
                    isIconOnly
                    onClick={addImage}>
                    <IconBxImageAdd width="1.2rem" height="1.2rem" />
                </Button>
                </Tooltip>

            </ButtonGroup>

        </div>
    )
}
const ResizableImage = TipTapImage.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        width: {
          default: 'auto',
          renderHTML: attributes => {
            return { width: attributes.width }
          },
        },
        height: {
          default: 'auto',
          renderHTML: attributes => {
            return { height: attributes.height }
          },
        },
      }
    },
  })
  
  // ฟังก์ชันนี้ใช้เพื่อเพิ่มรูปภาพพร้อมขนาดที่กำหนดโดยผู้ใช้
  const addImageWithSize = (editor) => {
    const url = window.prompt('URL ของรูปภาพ')
    const width = window.prompt('ความกว้าง (px)')
    const height = window.prompt('ความสูง (px)')
  
    if (url) {
      editor.chain().focus().setImage({ src: url, width: width || 'auto', height: height || 'auto' }).run()
    }
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
    ResizableImage,
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
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML(); // Get the HTML content
            setContent(html); // Update the parent state with the content
        },
    })

    return (


        <div className="flex flex-col justify-center items-center gap-5 w-full">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>

    )
}

export default TextEditor
