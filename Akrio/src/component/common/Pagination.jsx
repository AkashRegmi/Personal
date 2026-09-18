const Pagination = ({ totalpage, page, disable = false, onPageChange }) => {
  //we do not render the page if the totalpag eis 1
  if (!totalpage || totalpage <= 1) return null;
  const getPageNumber = () => {
    const pages = [];
    if (totalpage <= 5) {
      for (let i = 1; i <= totalpage; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalpage];
    }
    if (page >= totalpage - 2) {
      return [1, 2, "...", totalpage - 2, totalpage - 1, totalpage];
    }
    return [1, "...", page - 1, page, page + 1, "...", totalpage];
  };
  const pageNumber = getPageNumber();

  const handelPrevious = () => {
    if (page > 1 && !disable) {
      onPageChange(page - 1);
    }
  }; 
  const handelNext = () => {
    if (page < totalpage && !disable) {
      onPageChange(page + 1);
    }
  };
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between  border-gray-200 px-4 py-4 sm:px-6"
    >
      <div className="flex items-center justify-between w-full sm:hidden gap-2 ">
        {" "}
        <button
          type="button"
          onClick={handelPrevious}
          disabled={page === 1 || disable}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handelNext}
          disabled={page === totalpage || disable}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden w-full items-center justify-between sm:flex gap-2">
        {" "}
        <button
          type="button"
          onClick={handelPrevious}
          disabled={page === 1 || disable}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {pageNumber.map((item, index) => (
            <button
              type="button"
              key={index}
              disabled={disable || item === page}
              aria-current={item === page ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                item === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } disabled:cursor-not-allowed`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handelNext}
          disabled={page === totalpage || disable}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
