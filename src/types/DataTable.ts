type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);
export interface DataTableHeader{

    key: string;
    value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start'| 'end' | 'center';
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: DataTableCompareFunction;
}
export interface DataTableSort{
    key:string,
    order:'asc'|'desc';
}