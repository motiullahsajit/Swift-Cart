import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";

function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={`${containerClassname} w-full`}>
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-[#1B5A7D] my-4 md:my-8">
          {heading}
        </h2>
        <div>
          <table
            className="w-full bg-white shadow-lg rounded-lg min-w-max"
            {...getTableProps()}
          >
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-2 md:px-4 py-2 text-left text-xs md:text-sm font-medium text-gray-600"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted && (
                        <span>
                          {column.isSortedDesc ? (
                            <AiOutlineSortDescending className="inline ml-1" />
                          ) : (
                            <AiOutlineSortAscending className="inline ml-1" />
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="border-b last:border-none hover:bg-gray-50 transition-colors"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      <td
                        className="px-2 md:px-4 py-2 text-xs md:text-sm text-gray-800"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showPagination && (
          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-3 py-1 rounded ${
                !canPreviousPage ? "bg-gray-300" : "bg-blue-500"
              } text-white`}
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              Prev
            </button>
            <span>
              {pageIndex + 1} of {pageCount}
            </span>
            <button
              className={`px-3 py-1 rounded ${
                !canNextPage ? "bg-gray-300" : "bg-blue-500"
              } text-white`}
              onClick={nextPage}
              disabled={!canNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
