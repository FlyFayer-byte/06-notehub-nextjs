import type { FC } from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

// Пропси компонента пагінації
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  // ReactPaginate повертає номер сторінки в форматі 0-based
  const handlePageClick = (selected: { selected: number }) => {
    onPageChange(selected.selected + 1);
  };

  // Якщо сторінка всього одна — пагінація не потрібна
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageClick}
      pageCount={totalPages}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
