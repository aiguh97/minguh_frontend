import { createCommand } from 'lexical';

// ⬅️ define command properly with expected payload type (string)
export const SET_FONT_FAMILY_COMMAND = createCommand<string>();
export const SET_FONT_SIZE_COMMAND = createCommand<string>();
