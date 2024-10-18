import { useState } from 'react';

export const usePagination = (initialLimit: number = 20) => {
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(0);

  const updatePagination = ( current:number, pageSize:number ) => {
    setLimit(pageSize);
    setOffset((current - 1) * pageSize);
  };

  return {
    limit,
    offset,
    setLimit,
    updatePagination,
  };
};
