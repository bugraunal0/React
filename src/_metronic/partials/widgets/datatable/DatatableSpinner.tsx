import React, {FC} from 'react'
import {useIntl} from "react-intl";

const DatatableSpinner: FC = () => {
    const intl = useIntl()
    return (
        <>
            <div className='d-flex justify-content-center' style={{marginTop:"60px",marginBottom:"60px"}}>
                <div className='spinner-border text-primary' role='status'/>
                <div className='mx-3 my-1'>
                    {intl.formatMessage({id: 'DATATABLE.SPINNER.LOADING'})}
                </div>
            </div>
        </>
    )
}

export {DatatableSpinner}
