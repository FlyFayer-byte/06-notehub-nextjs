'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query';
import NoteList from '@/app/components/NoteList/NoteList';
import SearchBox from '@/app/components/SearchBox/SearchBox';
import Pagination from '@/app/components/Pagination/Pagination';
import Modal from '@/app/components/Modal/Modal';
import NoteForm from '@/app/components/NoteForm/NoteForm';
import { fetchNotes } from '@/app/lib/api';
import css from './NotesPage.module.css';
export default function NotesClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onSearchChange={value => {
            setSearchQuery(value);
            setPage(1);
          }}
        />
        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {isError && <p style={{ color: 'red' }}>❌ Failed to load notes</p>}

      {isLoading && <p>Loading...</p>}
      {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && !notes.length && <p>No notes found</p>}

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm
            onSuccess={() => {
              setIsOpen(false);
              setPage(1);
              queryClient.invalidateQueries({ queryKey: ['notes'] });
            }}
          />
        </Modal>
      )}
    </div>
  );
}
