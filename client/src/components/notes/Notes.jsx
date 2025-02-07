"use client";

import { useState } from "react";
import "@mdxeditor/editor/style.css";
import "./style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CodeToggle,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertThematicBreak,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  imagePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";

import Header from "./NotesHeader";

const Notes = () => {
  const [markdown, setMarkdown] = useState(`
# Untitled Note


`);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col ">
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <MDXEditor
            markdown={markdown}
            onChange={setMarkdown}
            contentEditableClassName="prose dark:prose-invert max-w-none focus:outline-none min-h-[calc(100vh-12rem)]"
            plugins={[
              listsPlugin(),
              quotePlugin(),
              headingsPlugin(),
              linkPlugin(),
              imagePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-gray-200 pt-4 ">
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <CodeToggle />
                    <BlockTypeSelect />
                    <CreateLink />
                    <InsertImage />
                    <ListsToggle />
                    <InsertThematicBreak />
                  </div>
                ),
              }),
            ]}
            className="w-full bg-white "
          />
        </div>
      </div>
    </div>
  );
};

export default Notes;
