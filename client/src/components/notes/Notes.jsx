import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { Extension } from "@tiptap/core";
import { wrappingInputRule } from "@tiptap/core";

// Example UI button component (replace with your own or shadcn/ui)
import { Button } from "../ui/button";
// Icons from lucide-react
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  List,
} from "lucide-react";

/**
 * Custom extension that adds an input rule for bullet lists.
 * When the user types "- " at the start of a line, it wraps that line in a bullet list.
 */
const BulletListInputRuleExtension = Extension.create({
  name: "bulletListInputRule",
  addInputRules() {
    return [
      wrappingInputRule({
        find: /^-\s$/,
        type: this.editor.schema.nodes.bullet_list,
      }),
    ];
  },
});

export default function ObsidianLikeEditor() {
  const [title, setTitle] = useState("Untitled Note");

  // Initialize Tiptap editor with built-in and custom extensions.
  // Note: StarterKit includes many input rules (including for headings).
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      // The Heading extension already includes markdown-style input for headings.
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Start typing your note...",
      }),
      // Add our custom bullet list input rule
      BulletListInputRuleExtension,
    ],
    content: "<p>Start writing your note...</p>",
    autofocus: "end",
  });

  return (
    <div className="h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      {/* HEADER with an editable title */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Note"
          className="text-xl font-bold bg-transparent border-b border-transparent focus:border-gray-400 outline-none flex-1 mr-4"
        />
      </header>

      <div className="p-4 flex flex-col flex-1">
        {/* TOOLBAR for mouse-based commands */}
        <div className="flex items-center space-x-2 mb-2">
          <Button
            variant={editor?.isActive("bold") ? "default" : "secondary"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant={editor?.isActive("italic") ? "default" : "secondary"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant={editor?.isActive("underline") ? "default" : "secondary"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>
          <Button
            variant={
              editor?.isActive("heading", { level: 1 })
                ? "default"
                : "secondary"
            }
            size="sm"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            variant={editor?.isActive("bulletList") ? "default" : "secondary"}
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        {/* EDITOR CONTENT AREA */}
        <div className="flex-1 overflow-y-auto">
          {/* 
            The "prose" class from Tailwind Typography gives default styling to elements like <h1>, <ul>, etc.
            If you're not using the typography plugin, you can add custom CSS.
          */}
          <EditorContent editor={editor} className="prose max-w-none" />
        </div>
      </div>
    </div>
  );
}
