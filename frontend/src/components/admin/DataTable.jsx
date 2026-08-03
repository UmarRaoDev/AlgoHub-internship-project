import { useMemo, useState } from "react";

/**
 * Reusable admin table: search + client-side pagination.
 * Every CMS module (Services, Team, FAQs, etc.) uses this instead of
 * hand-rolling its own table markup — keeps every module visually identical.
 *
 * Props:
 *  columns        [{ key, label, render?(row) }]
 *  data           array of row objects
 *  searchKeys     which row fields the search box filters on, e.g. ["name","email"]
 *  renderActions  (row) => JSX  — buttons shown in the Actions column
 *  getRowId       (row) => string, defaults to row._id
 */
export default function DataTable({
  columns,
  data,
  searchKeys = [],
  searchPlaceholder = "Search...",
  pageSize = 10,
  loading = false,
  error = "",
  emptyMessage = "No records found.",
  renderActions,
  getRowId = (row) => row._id,
  headerExtra,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query || searchKeys.length === 0) return data;
    return data.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(query))
    );
  }, [data, search, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {searchKeys.length > 0 ? (
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:max-w-sm"
          />
        ) : (
          <div />
        )}
        {headerExtra}
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
        {loading ? (
          <p className="p-8 text-center text-sm text-slate-400">Loading...</p>
        ) : pageRows.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-400">{emptyMessage}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="whitespace-nowrap px-6 py-4">
                      {col.label}
                    </th>
                  ))}
                  {renderActions && <th className="whitespace-nowrap px-6 py-4">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pageRows.map((row) => (
                  <tr key={getRowId(row)}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 text-slate-300">
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    {renderActions && <td className="px-6 py-4">{renderActions(row)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>
            Page {currentPage} of {totalPages} ({filtered.length} total)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}