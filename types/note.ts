// Доступні типи тегів нотаток (строго фіксований набір значень)
export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";

// Структура однієї нотатки з API
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string; // дата у форматі ISO
  updatedAt: string; // дата у форматі ISO
}
