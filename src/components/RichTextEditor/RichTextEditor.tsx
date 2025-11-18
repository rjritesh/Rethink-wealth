import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline'
import BulletLine from '@tiptap/extension-bullet-list';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import './editor.css'

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 hover:underline',
                    target: '_blank', // Opens links in new tab
                },
            }),
            BulletLine,
            Placeholder.configure({
                placeholder: 'Start typing here...',
                emptyEditorClass: 'is-editor-empty',
            }),
            CharacterCount,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none py-2 px-3 min-h-[150px]',
            },
        },
        onUpdate: ({ editor }) => {
            const rawHTML = editor.getHTML();
            const plainText = editor.getText().replace(/\u200B/g, '').trim();
            if (!plainText) {
                onChange('');
                return;
            }
            const htmlWithLineBreaks = rawHTML.replace(/<p><\/p>/g, '<p>&#8203;</p>');
            onChange(htmlWithLineBreaks);
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '')
        }
    }, [value, editor])

    return (
        <div className="relative border border-gray-200 rounded-lg bg-white shadow-sm  transition-all duration-150 overflow-hidden">
            <MenuBar editor={editor} />
            <div className="px-3 py-2">
                <EditorContent editor={editor} />
            </div>
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {editor?.storage.characterCount?.characters() || 0} chars
            </div>
        </div>
    )
};

export default RichTextEditor;

interface MenuBarProps {
    editor: Editor | null;
}


const MenuBar = ({ editor }: MenuBarProps) => {
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);

    if (!editor) return null;

    const setLink = () => {
        if (linkUrl === '') {
            setShowLinkInput(false);
            return;
        }

        // If no text selected, insert link with URL as text
        if (editor.state.selection.empty) {
            editor
                .chain()
                .focus()
                .insertContent(`<a href="${linkUrl}" target="_blank">${linkUrl}</a>`)
                .run();
        } else {
            // Add link to selected text
            editor
                .chain()
                .focus()
                .toggleLink({ href: linkUrl, target: '_blank' })
                .run();
        }

        setLinkUrl('');
        setShowLinkInput(false);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()} type='button'
                    className={`p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium ${editor.isActive('bold') ? 'bg-gray-300' : 'bg-gray-100'
                        }`}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()} type='button'
                    className={`p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium ${editor.isActive('italic') ? 'bg-gray-300' : 'bg-gray-100'
                        }`}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()} type='button'
                    className={`p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium ${editor.isActive('underline') ? 'bg-gray-300' : 'bg-gray-100'
                        }`}
                >
                    Underline
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()} type='button'
                    className={`p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium ${editor.isActive('bulletList') ? 'bg-gray-300' : 'bg-gray-100'
                        }`}
                >
                    Bullet List
                </button>
                {/* New Link Button */}
                <button
                    onClick={() => {
                        if (editor.isActive('link')) {
                            editor.chain().focus().unsetLink().run();
                        } else {
                            setShowLinkInput(true);
                        }
                    }} type='button'
                    className={`p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium ${editor.isActive('link') ? 'bg-gray-300' : 'bg-gray-100'
                        }`}
                >
                    Link
                </button>
                <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Insert table
                </button>
                <button onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Add column before
                </button>
                <button onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Add column after
                </button>
                <button onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Delete column
                </button>
                <button onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Add row before
                </button>
                <button onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Add row after
                </button>
                <button onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Delete row
                </button>
                <button onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50">
                    Delete table
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50"
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()} type='button'
                    className="p-1 px-2 rounded cursor-pointer hover:bg-gray-200 text-[12px] font-medium bg-gray-100 disabled:opacity-50"
                >
                    Redo
                </button>
            </div>

            {/* Link Input Field (shown when link button is clicked) */}
            {showLinkInput && (
                <div className="p-2 bg-gray-100 border-b border-gray-200 flex gap-2">
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="Enter URL..."
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                        onKeyDown={(e) => e.key === 'Enter' && setLink()}
                        autoFocus
                    />
                    <button
                        onClick={setLink} type='button'
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => {
                            setLinkUrl('');
                            setShowLinkInput(false);
                        }} type='button'
                        className="px-2 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};