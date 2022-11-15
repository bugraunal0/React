export interface DynamicKeyValue {
    [key: string]: string
}

export type column = {
    header: string,
    accessor: string,
    width: string,
    orderable?: boolean,
    searchable?: boolean,
    render?: Function,
}