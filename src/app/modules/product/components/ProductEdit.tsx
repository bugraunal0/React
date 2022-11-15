import {useEffect} from 'react'
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import * as actionTypes from "../redux/types/ProductDetailType";
import {Link, Redirect} from "react-router-dom";
import { Field, Form, Formik} from "formik";
import {KTSVG} from "../../../../_metronic/helpers";
import {ProductEditModel} from "../models/ProductDetailModel";
import {useIntl} from "react-intl";


const productDetailSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().nullable(),
    age: Yup.number().nullable(),
})
const addProductInitials: ProductEditModel = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
}

const ProductEdit = () => {
    const dispatch = useDispatch()
    const intl = useIntl();
    const urlParams = new URLSearchParams(window.location.search);
    const productIdParam = Number(urlParams.get('productId'));
    const isLoading = useSelector((state: RootState) => state.isLoading[actionTypes.GET_PRODUCT_EDIT])
    const onSave = useSelector((state: RootState) => state.isLoading[actionTypes.ADD_PRODUCT])
    const isError = useSelector((state: RootState) => state.isError)
    const productEditData = useSelector((state: RootState) => state.productEdit);
   


    useEffect(() => {
        if (productIdParam !== 0) {
           // dispatch(getProductEdit(productIdParam))
        }
    }, [productIdParam])
    
    
    /*if (isLoading === true || typeof isLoading === "undefined" && productIdParam !== 0) {
        return (<Spinner/>);
    }*/

    if (isError["productActionTypes/GET_PRODUCT_EDIT"]) {
        return (<Redirect to={`/error/500`}/>);
    }
    if(onSave===false && isError["productActionTypes/ADD_PRODUCT"]===null){
       productIdParam===0 ? window.location.replace("/product-list"):
           window.location.replace(`/product-list`);
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
                    <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'PRODUCT.LIST'}) + " " +
                        (productIdParam === 0 ? intl.formatMessage({id: 'COMMON.ADD'}) : intl.formatMessage({id: 'COMMON.EDIT'})) + " - (ProductEdit--Line_77) id=" + productIdParam}</h3>
                </div>
            </div>
            <Formik
                validationSchema={productDetailSchema}
                initialValues={productIdParam === 0 ? addProductInitials : productEditData}
                onSubmit={
                    (values: any) => {
                        
                        const formData = new FormData();
                        const json = JSON.stringify(values);
                        const title = String(values.title);
                        const category = String(values.category);
                        const price = String(values.price);
                        const blobJson = new Blob([json], {
                            type: 'application/json'
                        });

                        //console.log("typeof(values.name): " + typeof(values.name) + " /values.name.lenght: " + name2warn.length + " /values.name: " + values.name);
                        formData.append("product", blobJson);
                        if (title.length === 0){
                            //SweetAlert2Warning(intl.formatMessage({id: 'COMMON.WARNING'}),intl.formatMessage({id: 'SWEETALERT.PRODUCT.NAME_NULL'}));
                        }
                        if(title.length>0 && category.length>0){
                            //dispatch(getProductEdit(productIdParam))
                        }
                        
                        
                    }
                }
            >
                {(props) => (
                    <Form className='form' noValidate id='kt_user_detail'>
                        <div className='card-body border-top p-9'>

                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.TITLE'})}</label>
                                <div className='col-lg-8 fv-row'>
                                    <Field
                                        type='text'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'PRODUCT.TITLE'})})}
                                        name='title'
                                        autoComplete="off" autofill="off"
                                    />
                                </div>
                            </div>
                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.CATEGORY'})}</label>
                                <div className='col-lg-8 fv-row'>
                                    <Field
                                        type='text'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'PRODUCT.CATEGORY'})})}
                                        name='category'
                                        autoComplete="off" autofill="off"
                                    />
                                </div>
                            </div>
                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.PRICE'})}</label>
                                <div className='col-lg-8 fv-row'>
                                    <Field
                                        type='number'
                                        min='0'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'PRODUCT.PRICE'})})}
                                        name='price'
                                        autoComplete="off" autofill="off"
                                        
                                    />
                                </div>
                            </div>
                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.DESCRIPTION'})}</label>
                                <div className='col-lg-8 fv-row'>
                                    <Field
                                        type='text'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'PRODUCT.DESCRIPTION'})})}
                                        name='description'
                                        autoComplete="off" autofill="off"
                                    />
                                </div>
                            </div>
                            <div className='row mb-6'>
                                <label className='col-lg-4 col-form-label fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.IMAGE'})}</label>
                                <div className='col-lg-8 fv-row'>
                                    <Field
                                        type='text'
                                        className='form-control form-control-lg form-control-solid'
                                        placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'PRODUCT.IMAGE'})})}
                                        name='image'
                                        autoComplete="off" autofill="off"
                                    />
                                </div>
                            </div>
                            
                            
                            <div className='d-flex flex-stack pt-10'>
                                <div className='me-2'>
                                </div>

                                <div>
                                    <Link to= { `/product-list` } className='btn btn-lg btn-danger me-3'>
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

export default ProductEdit;