import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { Note } from '../../types/note';
import { deleteNote } from '../../lib/api';

import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success('Note deleted');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setDeletingId(null);
    },
    onError: () => {
      toast.error('Failed to delete note');
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    setDeletingId(id);
    mutation.mutate(id);
  };

  if (notes.length === 0) return <p>No notes found</p>;

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={mutation.isPending && deletingId === note.id}
            >
              {mutation.isPending && deletingId === note.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
