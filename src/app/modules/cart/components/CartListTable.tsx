/* eslint-disable jsx-a11y/anchor-is-valid */
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { useEffect, useState} from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap-v5';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../../setup';
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers';
import SweetAlert2DeleteConfirm from '../../../../_metronic/partials/common/SweetAlert2DeleteConfirm';
import SweetAlert2Warning from '../../../../_metronic/partials/common/SweetAlertSuccess';
import { DatatableSpinner } from '../../../../_metronic/partials/widgets/datatable/DatatableSpinner';
import { column } from '../../../../_metronic/partials/widgets/datatable/HelperModels';
import MTDatatable from '../../../../_metronic/partials/widgets/datatable/MTDatatable';
import { DTColumn } from '../../../../_metronic/partials/widgets/datatable/MTDatatableModel';
import { fillParams } from '../../../../_metronic/partials/widgets/datatable/redux/MTDatatableParametersAction';
import { ProductListModel } from '../../product/models/ProductListModel';
import { CartListModel, CartProductsModel } from '../models/CartListModel';
import { deleteCartList, deleteFromCart, getCartList } from '../redux/actions/CartListAction';
import * as actionTypes from "../redux/types/CartListType";

const addDetailSchema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
    price: Yup.number().typeError('COMMON.VALIDATION.REQUIRED_TYPE_FIELD'),
  })
const CartListTable = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.isLoading[actionTypes.GET_CART_LIST])
    
    const cartList = useSelector((state: RootState) => state.cartList)
    const cartProductsArray = []
    for(var i=0;i<Object.keys(cartList?.products).length;i++){
        cartProductsArray.push(cartList.products[i].productId)
    }
    //const id = useSelector((state: RootState) => state.cartList?.id)
    const [showPayment, setShowPayment] = useState(false);
    const [showUpdateChart, setShowUpdateChart] = useState(false);
    const [CartId, setCartId] = useState(0);
    const [category4add, setCategory4add] = useState("");
    const [title4add, setTitle4add] = useState("");
    const [price4pay, setPrice4add] = useState(0);
    const [description4add, setDescription4add] = useState("");
    const [cardNo, setCardNo] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [date, setDate] = useState("");
    const [expireDate, setCardDate] = useState("");
    const [quantity, setQuantity] = useState(1); 
    var products = [{productId:1,quantity:1}]
    useEffect(() => {
        const columnSetterArray: Array<DTColumn> = [];
        columns.forEach((c, index) => {
            if (c.orderable === undefined) {
                c.orderable = true
            }
            if (c.searchable === undefined) {
                c.searchable = true
            }
            columnSetterArray.push({
                Data: c.accessor,
                Orderable: c.orderable,
                Searchable: c.searchable
            })
        })

        dispatch(fillParams({...{
            Order: [], CurrentPage: 1, PageSize: 15, SortOrder: "name ASC"}, Columns: columnSetterArray})) 
        dispatch(getCartList(Number(localStorage.getItem('userId'))));
    }, []);
  

    const addBillInitials: ProductListModel = {
        id: 0,
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating:  {rate:0,count:0}
    };
    const setPaymentAndShowModal = (id: number,date: string,products: CartProductsModel[]) => { //Payment modal, datas cames from datatable
        setCartId(id);
        setDate(date);
        setShowPayment(true);}
    const ClosePayment = () => {
        setShowPayment(false);}     
    const setUpdateCartAndShowModal = (id: number,date: string) => { //Cart detail modal
        setCartId(id)
        setDate(date);
        setShowUpdateChart(true);}
    const CloseUpdateChart = () => {
        setShowUpdateChart(false);}     


    const columns: Array<column> = [

        {
            header: intl.formatMessage({id: 'CART.ID'}),
            accessor: 'id',
            width: '140px',
            render: (row: CartListModel, data: string) => {
                return(<>{data} 
                </>)}
        },
        {
            header: intl.formatMessage({id: 'CART.DATE'}),
            accessor: 'date',
            width: '140px',
            render: (row: CartListModel, data: string) => {
                return(<>{row.date} 
                </>)}
        },
        {
            header: intl.formatMessage({id: 'CART.PRODUCT'}),
            accessor: 'products',
            width: '140px',
            render: (row: CartListModel, data: string) => {
                return(<>{row.products[0].productId} 
                </>)}
        },
        
        {
            header: intl.formatMessage({id: 'COMMON.ACTIONS'}),
            accessor: 'id',
            width: '100px',
            orderable: false,
            searchable: false,
            render: (row: CartListModel,data: string) => {
                return(<>
                        <Dropdown style={{ position: 'static' }}>
                            <Dropdown.Toggle variant="" id="dropdown-basic" className='btn btn-sm btn-light btn-active-light-primary'>
                                {intl.formatMessage({id: 'COMMON.ACTIONS'})}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                                data-kt-menu="true">
                                <div className="menu-item px-3">
                                    <Dropdown.Item onClick={(e) => setUpdateCartAndShowModal(row.id,row.date)} className='menu-link px-3'>
                                        <KTSVG path='/media/icons/duotune/arrows/arr071.svg' className='svg-icon-5'/>
                                        <span className="px-2">{intl.formatMessage({id: 'COMMON.DETAIL'})}</span>
                                    </Dropdown.Item >
                                </div>
                                <div className="menu-item px-3">
                                    <Dropdown.Item onClick={(e) => setPaymentAndShowModal(row.id,row.date,row.products)} className='menu-link px-3'>
                                        <KTSVG path='/media/icons/duotune/arrows/arr071.svg' className='svg-icon-5'/>
                                        <span className="px-2">{intl.formatMessage({id: 'CART.DONE'})}</span>
                                    </Dropdown.Item >
                                </div>
                                <div className="menu-item px-3">
                                    <Dropdown.Item  onClick={() => {
                                        const result = SweetAlert2DeleteConfirm(intl.formatMessage({id: 'COMMON.WARNING'}),
                                            intl.formatMessage({id: 'CART.DELETE.CONFIRM'}));
                                        result.then((result) => {
                                            if (result.isConfirmed) {
                                                dispatch(deleteCartList(row.id));
                                            }
                                        });
                                    }}
                                                    className='menu-link px-3'>
                                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-5'/>
                                        <span className="px-2">{intl.formatMessage({id: 'COMMON.DELETE'})}</span>
                                    </Dropdown.Item >
                                </div>
                            </Dropdown.Menu >
                        </Dropdown>
                </>)}
        },
    ]

    const columns4edit: Array<column> = [
        {
            header: intl.formatMessage({id: 'PRODUCT.IMAGE'}),
            accessor: 'image',
            width: '40px',
            render: (row: ProductListModel, data: string) => {
                return(<><img height="40" src={toAbsoluteUrl(row.image)} alt='img' /> 
                </>)}
        },
        {
            header: intl.formatMessage({id: 'PRODUCT.TITLE'}),
            accessor: 'title',
            width: '140px',
        },

        {
            header: intl.formatMessage({id: 'PRODUCT.PRICE'}),
            accessor: 'price',
            width: '140px',
            render: (row: ProductListModel, data: string) => {
                return(<>{data} 
                </>)}
        },
        {
            header: intl.formatMessage({id: 'PRODUCT.DESCRIPTION'}),
            accessor: 'description',
            width: '140px',
            render: (row: ProductListModel, data: string) => {
                return(<>{row.description} 
                </>)}
        },
        {
            header: intl.formatMessage({id: 'PRODUCT.CATEGORY'}),
            accessor: 'category',
            width: '140px',
            render: (row: ProductListModel, data: string) => {
                return(<>{row.category} 
                </>)}
        },
        {
            header: intl.formatMessage({id: 'PRODUCT.SELECT'}),
            accessor: 'checkb',
            width: '100px',
            render: (row: ProductListModel, data: string) => {
                return(<>
                    <input
                        className="w-100px"
                        type='number'
                        min="1"
                        placeholder={intl.formatMessage({id: 'PRODUCT.SELECT'})}
                        name='quantity'
                        autoComplete="off"
                        onChange={(e: any)=>setQuantity(e.target.value)}
                    />
                </>)}
        },
        {
            header: intl.formatMessage({id: 'COMMON.ACTIONS'}),
            accessor: 'id',
            width: '100px',
            orderable: false,
            searchable: false,
            render: (row: ProductListModel,data: string) => {
                return(<>
                        <Dropdown style={{ position: 'static' }}>
                            <Dropdown.Toggle variant="" id="dropdown-basic" className='btn btn-sm btn-light btn-active-light-primary'>
                                {intl.formatMessage({id: 'COMMON.ACTIONS'})}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                style={{ offset: 0 }}
                                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-125px"
                                data-kt-menu="true">
                                <div className="menu-item px-3">
                                    <Dropdown.Item  onClick={() => {
                                        const result = SweetAlert2DeleteConfirm(intl.formatMessage({id: 'COMMON.WARNING'}),
                                            intl.formatMessage({id: 'PRODUCT.DELETE.CONFIRM'}));
                                        result.then((result) => {
                                            if (result.isConfirmed) {
                                                dispatch(deleteFromCart(row.id));
                                            }
                                        });
                                    }}
                                                    className='menu-link px-3'>
                                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-5'/>
                                        <span className="px-2">{intl.formatMessage({id: 'COMMON.DELETE'})}</span>
                                    </Dropdown.Item >
                                </div>
                            </Dropdown.Menu >
                        </Dropdown>
                </>)}
        },
    ]
    return (
        <div className={`card card-xxl-stretch mb-5 mb-xxl-12`}>
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>{intl.formatMessage({id: 'CART.LIST'})}</span>
                </h3>

            </div>
            <Modal show={showPayment} onHide={ClosePayment}>
                <Modal.Body>
                <div className='card mb-5 mb-xl-10'>
                    <div
                        className='card-header border-0 cursor-pointer'
                        role='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_user_details'
                        aria-expanded='true'
                        aria-controls='kt_user_details'
                    >
                    </div>
                    <Formik
                        validationSchema={addDetailSchema}
                        initialValues={addBillInitials}
                        onSubmit={
                            (values: any) => {
                                values['category'] = category4add
                                values['title'] = title4add
                                values['price'] = Number(price4pay)
                                values['description'] = description4add
                                values['cvc'] = cardCvc
                                
                                SweetAlert2Warning(intl.formatMessage({id: 'WARNING'}),intl.formatMessage({id: 'PRODUCT.DETAIL.MISSING.INPUT'}));
                                
                            }
                        }
                    >
                        {(props) => (
                            <Form className='form' noValidate id='kt_user_detail'>
                                <h1>{intl.formatMessage({id: 'CART.PAY'})}</h1>
                                <div className='card-body border-top p-9'>
                                    

                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label fw-bold fs-6'>{intl.formatMessage({id: 'CART.ID'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                        
                                            <label className='form-control form-control-lg form-control-solid'>{CartId}</label>
                                        </div>
                                    </div>
                                    
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.PRICE'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                            <label className='form-control form-control-lg form-control-solid'>{price4pay}</label>
                                        </div>
                                    </div> 
                                    <h2>{intl.formatMessage({id: 'SHIPPING.INFO'})}</h2>
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'SHIPPING.NAME'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                            <Field
                                                type='text'
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'SHIPPING.NAME'})})}
                                                name='name'
                                                autoComplete="off" autofill="off"
                                                onChange={(e: any)=>setTitle4add(e.target.value)}
                                                value={title4add}
                                            />
                                        </div>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'SHIPPING.EMAIL'})}</label>
                                        <div className='col-lg-8 fv-row' style={{paddingTop:8}}>
                                            <Field
                                                type='text'
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'SHIPPING.EMAIL'})})}
                                                name='email'
                                                autoComplete="off" autofill="off"
                                                onChange={(e: any)=>setTitle4add(e.target.value)}
                                                value={title4add}
                                            />
                                        </div>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'SHIPPING.ADRESS'})}</label>
                                        <div className='col-lg-8 fv-row' style={{paddingTop:8}}>
                                            <textarea 
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'SHIPPING.ADRESS'})})}
                                                name='adress'
                                                autoComplete="off"
                                                onChange={(e: any)=>setDescription4add(e.target.value)}
                                                value={description4add}
                                                rows = {3} cols = {30}>
                                                    {description4add}
                                            </textarea>
                                        </div>
                                    </div>     

                                    <h2>{intl.formatMessage({id: 'CARD.INFO'})}</h2>
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'CARD.NO'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                            <Field
                                                type='number'
                                                max={16}
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'CARD.NO'})})}
                                                name='cardNo'
                                                autoComplete="off" autofill="off"
                                                onChange={(e: any)=>setCardNo(e.target.value)}
                                            />
                                            <i className="fa fa-cc-visa" style={{color:"blue"}}></i>
                                        </div>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'CARD.DATE'})}</label>
                                        <div className='col-lg-8 fv-row' style={{paddingTop:8}}>
                                            <input className='form-control form-control-lg form-control-solid' type="date" name="expireDate" onChange={(e: any)=>setCardDate(e)}/>
                                        </div>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'CARD.CVC'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                            <Field
                                                type='number'
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'CARD.CVC'})})}
                                                name='cvc'
                                                autoComplete="off" autofill="off"
                                                onChange={(e: any)=>setCardCvc(e.target.value)}
                                            />
                                        </div>
                                    </div> 
                                    
                                    <div className='row mb-6'>
                                        <div className='col-lg-4'>
                                            
                                        </div>
                                        <div className='col-lg-8 fv-row'>
                                            <Button type='submit' className='btn btn-success me-3'>
                                                <span className='indicator-label'>
                                                {intl.formatMessage({id: 'CART.DONE'})}
                                                    <KTSVG
                                                        path='/media/icons/duotune/arrows/arr064.svg'
                                                        className='svg-icon-3 ms-2 me-0'
                                                    />
                                                </span>
                                            </Button>
                                            <Button className='btn btn-warning me-3' onClick={ClosePayment}>
                                            {intl.formatMessage({id: 'COMMON.CANCEL'})}
                                            </Button>
                                        </div>
                                    </div>       
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                    
                </Modal.Body>
                </Modal>


                <Modal show={showUpdateChart} onHide={CloseUpdateChart}>
                <Modal.Body>
                <div className='card mb-5 mb-xl-10'>
                    <div
                        className='card-header border-0 cursor-pointer'
                        role='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_user_details'
                        aria-expanded='true'
                        aria-controls='kt_user_details'
                    >
                    </div>
                    <Formik
                        validationSchema={addDetailSchema}
                        initialValues={addBillInitials}
                        onSubmit={
                            (values: any) => {
                                values['category'] = category4add
                                values['price'] = Number(price4pay)
                                values['expireDate'] = expireDate
                                values['cardNo'] = cardNo
                                values['cvc'] = cardCvc
                                
                                SweetAlert2Warning(intl.formatMessage({id: 'WARNING'}),intl.formatMessage({id: 'PRODUCT.DETAIL.MISSING.INPUT'}));
                                
                            }
                        }
                    >
                        {(props) => (
                            <Form className='form' noValidate id='kt_user_detail'>
                                <h1>{intl.formatMessage({id: 'CART.TITLE'})}</h1>
                                <div className='card-body border-top p-9'>
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label fw-bold fs-6'>{intl.formatMessage({id: 'CART.ID'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                            <label className='form-control form-control-lg form-control-solid'>{CartId}</label>
                                        </div>
                                    </div>
                                    
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.PRICE'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                            <label className='form-control form-control-lg form-control-solid'>{date}</label>
                                        </div>
                                    </div> 
                                    <div className='card-body py-3'>
                                        {(isLoading === true || typeof isLoading === "undefined") ?
                                            <DatatableSpinner/> :
                                            <MTDatatable columns={columns4edit} body={products} totalPageCount={1} totalItemCount={5}/>}
                                    </div>
                                    <div className='row mb-6'>
                                        <div className='col-lg-4'>
                                            
                                        </div>
                                        <div className='col-lg-8 fv-row'>
                                            <Button type='submit' className='btn btn-success me-3'>
                                                <span className='indicator-label'>
                                                {intl.formatMessage({id: 'COMMON.SAVE'})}
                                                    <KTSVG
                                                        path='/media/icons/duotune/arrows/arr064.svg'
                                                        className='svg-icon-3 ms-2 me-0'
                                                    />
                                                </span>
                                            </Button>
                                            <Button className='btn btn-warning me-3' onClick={CloseUpdateChart}>
                                            {intl.formatMessage({id: 'COMMON.CANCEL'})}
                                            </Button>
                                        </div>
                                    </div>       
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                    
                </Modal.Body>
                </Modal>
            <div className='card-body py-3'>
                {(isLoading === true || typeof isLoading === "undefined") ?
                    <DatatableSpinner/> :
                    <MTDatatable columns={columns} body={cartList} totalPageCount={1} totalItemCount={20}/>}
                <Button as={Link} to={`/index`}>{intl.formatMessage({id: 'GO.BACK'})}</Button>
            </div>
            
        </div>
    )
}
export default CartListTable;