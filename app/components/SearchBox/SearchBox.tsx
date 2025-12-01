import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ value, onSearchChange }: SearchBoxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search notes"
      className={css.input}
      value={value}
      onChange={handleChange}
    />
  );
}
