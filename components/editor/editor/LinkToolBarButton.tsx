"use client";

import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";

export default function LinkEditorButton() {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleInsertLink = () => {
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      setUrl("");
      setOpen(false);
    }
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Link size={16} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Masukkan URL Link</DialogHeader>

          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://contoh.com"
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={handleInsertLink} disabled={!url}>Sisipkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
