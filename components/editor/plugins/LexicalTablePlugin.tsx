import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
//   INSERT_TABLE_COMMAND,
  TablePlugin,
} from "@lexical/react/LexicalTablePlugin";
import { INSERT_TABLE_COMMAND } from "@lexical/table";

export function TableControlPlugin() {
  const [editor] = useLexicalComposerContext();

  const createTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: "3",
      rows: "2",
    });
  };

  return (
    <>
      <TablePlugin />
      <button onClick={createTable}>Create Table (max 2 rows)</button>
    </>
  );
}
