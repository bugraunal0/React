import {Column, useTable, usePagination, useFilters, useSortBy} from 'react-table'
import React, {FC, useMemo} from "react";

interface ExampleObject {
    col1: string
    col2: string
    col3: number
}

const RGDatatable: FC = () => {

    const data = useMemo(
        () => [
            {
                col1: 'Elma',
                col2: 'Armut',
                col3: 1
            },
            {
                col1: 'Ali',
                col2: 'Veli',
                col3: 2
            },
            {
                col1: 'Deli',
                col2: 'Kedi',
                col3: 3
            },
        ],
        []
    )

    const columns: Column<ExampleObject>[] = React.useMemo(
        () => [
            {
                Header: 'Sütun 1',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Sütun 2',
                accessor: 'col2',
            },
            {
                Header: 'Sütun 3',
                accessor: 'col3',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data}, useFilters, useSortBy,usePagination)

    return (
        <div className='table-responsive'>
            <table {...getTableProps()} className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className='fw-bolder text-muted'>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                        <th className='min-w-25px text-end'>İşlemler</th>
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()} >
                                        <div className='d-flex align-items-center'>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                                                    {cell.render('Cell')}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export {RGDatatable}