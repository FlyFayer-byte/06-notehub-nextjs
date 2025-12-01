import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

// Токен з .env (Next.js)
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// ---- Типи параметрів ----

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface DeleteNoteParams {
  id: string;
}

// ---- Типи відповідей ----

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteResponse = Note;
export type DeleteNoteResponse = Note;

// ---- API функції ----

// Отримання списку нотаток
export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await noteApi.get<FetchNotesResponse>('/notes', {
    params: {
      page: params.page,
      perPage: params.perPage,
      ...(params.search ? { search: params.search } : {}),
    },
  });

  return response.data;
}

// Видалення нотатки
export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await noteApi.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}

// Створення нової нотатки
export async function createNote(noteData: CreateNoteParams): Promise<CreateNoteResponse> {
  const response = await noteApi.post<CreateNoteResponse>('/notes', noteData);
  return response.data;
}

// ---- Fetch note by ID (потрібно для сторінки /notes/[id]) ----
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteApi.get<Note>(`/notes/${id}`);
  return response.data;
}
