export const getNormalizeHeaders = (items: Array<Record<string, any>>) => {
    const keys = items.flatMap(item => Object.keys(item))
    const headers = [...new Set(keys)]
    return headers.map((header: string) => ({ headerName: header.split("_").join(" ").toLocaleUpperCase(), field: header }))
}