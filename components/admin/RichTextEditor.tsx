"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Bold, Italic, List, ListOrdered, Heading2, LinkIcon } from "lucide-react";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[180px] px-3 py-2 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const tombol = [
    { icon: Bold, aktif: editor.isActive("bold"), aksi: () => editor.chain().focus().toggleBold().run() },
    { icon: Italic, aktif: editor.isActive("italic"), aksi: () => editor.chain().focus().toggleItalic().run() },
    { icon: Heading2, aktif: editor.isActive("heading", { level: 2 }), aksi: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { icon: List, aktif: editor.isActive("bulletList"), aksi: () => editor.chain().focus().toggleBulletList().run() },
    { icon: ListOrdered, aktif: editor.isActive("orderedList"), aksi: () => editor.chain().focus().toggleOrderedList().run() },
    {
      icon: LinkIcon,
      aktif: editor.isActive("link"),
      aksi: () => {
        const url = window.prompt("URL tautan:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
    },
  ];

  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      <div className="flex gap-1 border-b border-gray-200 bg-gray-50 p-1.5">
        {tombol.map(({ icon: Icon, aktif, aksi }, idx) => (
          <button
            key={idx}
            type="button"
            onClick={aksi}
            className={`flex h-8 w-8 items-center justify-center rounded ${
              aktif ? "bg-teal-100 text-teal-700" : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            <Icon size={15} />
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
