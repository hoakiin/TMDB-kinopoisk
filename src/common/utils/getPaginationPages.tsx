const SIBLING_COUNT = 1;

export const getPaginationPages = (
  currentPage: number,
  totalPages: number,
): (number | "...")[] => {
  if (totalPages <= 1) return [];

  const pages: (number | "...")[] = [];

  const start = Math.max(currentPage - SIBLING_COUNT, 2);
  const end = Math.min(currentPage + SIBLING_COUNT, totalPages - 1);

  pages.push(1);

  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};