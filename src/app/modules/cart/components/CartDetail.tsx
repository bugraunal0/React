import {useEffect} from 'react'
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import * as actionTypes from "../redux/types/CartDetailType";
import {Spinner} from "../../errors/components/Spinner";
import {Link, Redirect} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {KTSVG} from "../../../../_metronic/helpers";
import {CartEditModel} from "../models/CartDetailModel";
import {getCartEdit} from "../redux/actions/CartDetailAction";
import {useIntl} from "react-intl";
import SweetAlert2Warning from '../../../../_metronic/partials/common/SweetAlert2Warning';


const cartDetailSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().nullable(),
    age: Yup.number().nullable(),
})
const addCartInitials: CartEditModel = {
    id: 0,
    name: "",
    age: 0,
}

const CartEdit = () => {
    const dispatch = useDispatch()
    const intl = useIntl();
    const urlParams = new URLSearchParams(window.location.search);
    const cartIdParam = Number(urlParams.get('id'));
    const isLoading = useSelector((state: RootState) => state.isLoading[actionTypes.GET_CART_EDIT])
    const onSave = useSelector((state: RootState) => state.isLoading[actionTypes.ADD_CART])
    const isError = useSelector((state: RootState) => state.isError)
    const cartEditData = useSelector((state: RootState) => state.cartEdit);
   


    useEffect(() => {
        if (cartIdParam !== 0) {
            dispatch(getCartEdit(cartIdParam))
        }
    }, [cartIdParam])
    
    
    if (isLoading === true || typeof isLoading === "undefined" && cartIdParam !== 0) {
        return (<Spinner/>);
    }

    if (isError["cartActionTypes/GET_CART_EDIT"]) {
        return (<Redirect to={`/error/500`}/>);
    }
    if(onSave===false && isError["cartActionTypes/ADD_CART"]===null){
       cartIdParam===0 ? window.location.replace("/cart-list"):
           window.location.replace(`/cart-list`);
    }
    return (
        <div className='card mb-5 mb-xl-10'>
            <div
                className='card-header border- cursor-pointer'
                role='button'
                data-bs-toggle='collapse'
                data-bs-target='#kt_user_details'
                aria-expanded='true'
                aria-controls='kt_user_details'
            >
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'COMMON.CART'}) + " " +
                        (cartIdParam === 0 ? intl.formatMessage({id: 'COMMON.ADD'}) : intl.formatMessage({id: 'COMMON.EDIT'})) + " - (CartEdit--Line_77) id=" + cartIdParam}</h3>
                </div>
            </div>
            <Formik
                validationSchema={cartDetailSchema}
                initialValues={cartIdParam === 0 ? addCartInitials : cartEditData}
                onSubmit={
                    (values: any) => {
                        
                        const formData = new FormData();
                        const json = JSON.stringify(values);
                        const name2warn = String(values.name);
                        const blobJson = new Blob([json], {
                            type: 'application/json'
                        });

                        //console.log("typeof(values.name): " + typeof(values.name) + " /values.name.lenght: " + name2warn.length + " /values.name: " + values.name);
                        formData.append("cart", blobJson);
                        if (name2warn.length === 0){
                            SweetAlert2Warning(intl.formatMessage({id: 'COMMON.WARNING'}),intl.formatMessage({id: 'SWEETALERT.CART.NAME_NULL'}));
                        }
                        
                        
                    }
                }
            >
                {(props) => (
                    <Form className='form' noValidate id='kt_user_detail'>
                        <div className='card-body border-top p-9'>

                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'CART.NAME'})}</label>
                                <div className='col-lg-8 fv-row'>
                                    <Field
                                        type='text'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'CART.NAME'})})}
                                        name='name'
                                        autoComplete="off" autofill="off"
                                    />
                                </div>
                            </div>

                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'CART.AGE'})}</label>
                                <div className='col-lg-8 fv-row'>
                                    <Field
                                        type='number'
                                        min='0'
                                        max='110'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'CART.AGE'})})}
                                        name='age'
                                        autoComplete="off" autofill="off"
                                        
                                    />
                                </div>
                            </div>
                            
                            <div className='d-flex flex-stack pt-10'>
                                <div className='me-2'>
                                </div>

                                <div>
                                    <Link to= { `/cart-list` } className='btn btn-lg btn-danger me-3'>
                                        <span className='indicator-label'>
                                            {intl.formatMessage({id: 'COMMON.CANCEL'})}
                                            <KTSVG path='/media/icons/duotune/arrows/arr011.svg' className='svg-icon-3 ms-2 me-0'/>
                                        </span>
                                    </Link>

                                    <button type='submit' className='btn btn-lg btn-success me-3'>
                                        <span className='indicator-label'>
                                        {intl.formatMessage({id: 'COMMON.SAVE'})}

                                            <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-3 ms-2 me-0'/>

                                        </span>
                                    </button>
                                </div>
                                
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CartEdit;