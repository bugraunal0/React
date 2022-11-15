/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {KTSVG} from '../../../helpers'
import {useDispatch} from "react-redux";


type Props = {
    text: string,
    action: Function,
    id: string,
}

const DeleteConfirm: FC<Props> = (props) => {
    const {text,action,id} = props;
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    return (
        <div className='modal fade' id={`kt_modal_delete_confirm_${id}`} aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered mw-500px'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h2>Uyarı</h2>

                        <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss={`modal`}>
                            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1'/>
                        </div>
                    </div>

                    <div className='modal-body py-lg-10 px-lg-10'>
                        <div>
                            <div className='flex-row-fluid py-lg-5 px-lg-15'>
                                <div className="fs-5 text-gray-800 text-hover-primary fw-bold">
                                    {text} silmek istediğinize emin misiniz?
                                </div>
                                <div className='d-flex flex-stack pt-10'>
                                    <div className='me-2'>
                                    </div>
                                    <div>
                                        <button type='submit' className='btn btn-lg btn-danger me-3'
                                                data-bs-dismiss={`modal`}>
                            <span className='indicator-label'>
                              İptal
                                <KTSVG
                                    path='/media/icons/duotune/arrows/arr015.svg'
                                    className='svg-icon-3 ms-2 me-0'
                                />
                            </span>
                                        </button>
                                        <button type='submit' className='btn btn-lg btn-primary me-3'
                                                data-bs-dismiss={`modal`}
                                                onClick={()=>{dispatch(action(id))}}
                                        >
                            <span className='indicator-label'>
                              Evet
                                <KTSVG
                                    path='/media/icons/duotune/arrows/arr016.svg'
                                    className='svg-icon-3 ms-2 me-0'
                                />
                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {DeleteConfirm}
