/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Pagination from "./Pagination";
import {setPage, setPageSize, setSortOrder} from "./redux/MTDatatableParametersAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import {column} from "../../../../_metronic/partials/widgets/datatable/HelperModels";
import {useIntl} from "react-intl";

// TODO: OnChange'lerin TypeScript'e uygun hale getirilmesi gerekiyor. useStateCallback'teki callback'e tip verilmeli.

type Props = {
    columns: Array<column>
    body: any,
    totalPageCount?: number,
    totalItemCount?: number,
    actionColumn?: boolean,
    paginationState?: boolean
}

const MTDatatable: React.FC<Props> = ({columns, body, totalPageCount = 15, actionColumn = true, paginationState = true,totalItemCount}) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const dTParameters = useSelector((state: RootState) => state.datatableParameters)

    const handlePageChange = (value: React.SetStateAction<number>) => {
        dispatch(setPage(Number(value)))
    };

    const handlePageSizeChange = (event: { target: { value: string; }; }) => {
        dispatch(setPageSize(Number(event.target.value), 1))
    };

    const handleSortChange = (accessor: string, index: number) => {
        let orderStatus;
        if (dTParameters.SortOrder === "") {
            orderStatus = accessor + " ASC";
        } else if (dTParameters.SortOrder.split(" ")[1] === "ASC") {
            orderStatus = accessor + " DESC";
        } else {
            orderStatus = "";
        }
        if( dTParameters.SortOrder.split(" ")[0] !== accessor)
            orderStatus=accessor+" ASC";
        dispatch(setSortOrder(orderStatus, orderStatus ? [{Column: index, Dir: orderStatus.trim().split(" ")[1]}] : []))
    };

    return (
        <div className='table-responsive'>
            <table className='table table-hover table-rounded table-row-bordered table-row-gray-300 align-middle gs-0 gy-4 table-striped'>
                <thead>
                <tr className='fw-bolder text-muted border-bottom-2'>
                    <th/>
                    {
                        <>{
                            columns.map((column, columnIndex) =>
                                <th key={`heading-${columnIndex}`}
                                    className={(column.width ? "max-w-" + column.width : "") + (actionColumn && columnIndex === columns.length - 1 ? " text-end px-10" : "")}
                                    onClick={() => column.orderable !== false && handleSortChange(column.accessor, columnIndex)}
                                    style={column.orderable === false ? {"cursor": "default"} : {"cursor": "pointer"}}
                                >
                                    {column.header + (dTParameters.SortOrder.split(" ")[0] === column.accessor ? (dTParameters.SortOrder.split(" ")[1] === "DESC" ? " ▼" : " ▲") : "")}
                                </th>
                            )}
                        </>
                    }
                </tr>
                </thead>
                <tbody>
                {
                    body.map((rowData: any,rowIndex: number) =>
                        <tr key={`row-${rowIndex}`}
                        >
                            <td/>
                            {
                                columns.map((column, columnIndex) =>

                                    <td key={`${rowIndex}-${columnIndex}`}
                                    >
                                        <div
                                            className={actionColumn ? columns.length - 1 !== columnIndex ? 'd-flex align-items-center' : "d-flex justify-content-end flex-shrink-0 px-3" : 'd-flex align-items-center'}>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <div className='text-dark fw-bolder fs-6'>
                                                    {
                                                        column.render ? column.render(rowData, rowData[column.accessor]) :
                                                            rowData[column.accessor]
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                )
                            }
                        </tr>
                    )}
                </tbody>
            </table>
            {
                Object.keys(body).length === 0 ?
                    <div className='text-center text-muted mt-5'>
                        <i className='fa fa-exclamation-circle fa-2x'/>
                        <p className='mt-2'>{intl.formatMessage({id: 'DATATABLE.RESULT_INFO_EMPTY'})}</p>
                    </div> : totalItemCount && <div className=' text-muted mt-5'><p className='mt-2'>
                    {intl.formatMessage({id: "DATATABLE.RESULT_INFO"},
                        {number: totalItemCount})}</p></div>
            }
            <div>
                {
                    paginationState ?

                        <div className={"d-flex justify-content-between"}>
                            <div className="p-2"/>
                            <div className="p-2">
                                <Pagination currentPage={dTParameters.CurrentPage} totalCount={totalPageCount}
                                            pageSize={dTParameters.PageSize} onPageChange={(page: number) => {
                                    handlePageChange(page)
                                }}/>
                            </div>
                            <div className="p-2">
                                <select className='form-select form-select-solid form-select-sm' onChange={handlePageSizeChange}
                                        value={dTParameters.PageSize}>
                                    {
                                        Array.of(20, 40, 60).map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        :""
                }

            </div>
        </div>
    )

}

export default MTDatatable;