export async function parseCsv(res, start = 1) {
  const text = await res.text()
  const rows = text.split("\n").slice(start, text.length - start)
  
  return rows
}

export function parseRow(row, columns) {
  return row.split(',').slice(0, columns)
}
