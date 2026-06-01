export const escapeMarkdownTableCell = (value: string | number): string =>
  `${value}`.replace(/\|/g, '\\|')

export const createMarkdownTable = (
  columns: readonly string[],
  rows: (string | number)[][]
): string => {
  const tableRows = [columns, ...rows].map((row) =>
    row.map(escapeMarkdownTableCell)
  )
  const columnWidths = columns.map((_, columnIndex) =>
    Math.max(...tableRows.map((row) => row[columnIndex]?.length ?? 0), 3)
  )
  const formatRow = (row: string[]) =>
    `| ${row.map((cell, index) => cell.padEnd(columnWidths[index], ' ')).join(' | ')} |`

  const header = formatRow(tableRows[0])
  const separator = `| ${columnWidths.map((width) => '-'.repeat(width)).join(' | ')} |`
  const body = tableRows.slice(1).map(formatRow)

  return [header, separator, ...body].join('\n')
}
