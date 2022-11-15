import {useEffect, useRef, useState} from "react";
import {setPage} from "../../../../_metronic/partials/widgets/datatable/redux/MTDatatableParametersAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import {getCartList} from "../redux/actions/CartListAction";
import {KTSVG} from "../../../../_metronic/helpers";
import "flatpickr/dist/themes/light.css";
import {useIntl} from "react-intl"; 
import { isInteger } from "formik";
import { number } from "yup";

const CartListSearch = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const dTParameters = useSelector((state: RootState) => state.datatableParameters)
    const [searchParams, setSearchParams] = useState({});
    const token = useSelector((state: RootState) => state.auth.token)
    const firstRender = useRef(true);
    const userId = 1;
    useEffect(() => {
        if (firstRender.current) {firstRender.current = false; return;}
        if (Object.keys(dTParameters.Columns).length = 0) {
            dispatch(getCartList(userId));
        }
    }, [dTParameters]);

    const search = () => {
        dispatch(setPage(1))
    };

    const handleSearch = (e: any,name:string) => {

        if (dTParameters.Columns.filter((f)=>f.Data.includes(e.target.name))[0].Searchable){
            setSearchParams({...searchParams, [e.target.name]:e.target.value})
        }
    }

    return (
        <div className={`card card-xxl-stretch mb-5 mb-xxl-10`}>

            
            <div className='card-body'>
                <div className="">
                    <div className="row col-12" onKeyPress={(e) => {if (e.key === "Enter") {search()}}}>
                        <div className="col-4">
                            <label className="fs-6 form-label fw-bolder text-dark">{intl.formatMessage({id: 'CART.TITLE'})}</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                    {field: intl.formatMessage({id: 'CART.TITLE'})})}
                                name={"title"}
                                maxLength={11}
                                
                            />
                        </div>
                        <div className="col-5 row">
                            <label className="fs-6 form-label fw-bolder text-dark">{intl.formatMessage({id: 'CART.CATEGORY'})}</label>
                            <div className="col-6">
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                    {field: intl.formatMessage({id: 'CART.CATEGORY'})})}
                                name={'category'}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        search()
                                    }
                                }}
                            />
                            </div>
                            <div className="col-6">
                            
                            </div>
                        </div>
                        <div className="col-2 mt-2">
                            <label className="fs-6 form-label fw-bolder text-dark"/>
                            <div className="d-flex justify-content-end">
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={search}
                                    >
                                        <KTSVG path='media/icons/duotune/general/gen021.svg' className='svg-icon-3' />
                                        {intl.formatMessage({id: 'COMMON.SEARCH'})}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartListSearch;
