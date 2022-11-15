
export interface DTParameters {
    Columns: Array<DTColumn>;
    CurrentPage: number;
    PageSize: number;
    Order: Array<DTOrder>;
    SortOrder: string;
}

export interface DTColumn {
    Data: string;
    Orderable: boolean;
    Searchable: boolean;
}

export interface DTOrder {
    Column: number;
    Dir: string;
}