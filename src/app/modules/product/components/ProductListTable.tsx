/* eslint-disable jsx-a11y/anchor-is-valid */
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {useEffect, useState} from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap-v5';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers';
import SweetAlert2DeleteConfirm from '../../../../_metronic/partials/common/SweetAlert2DeleteConfirm';
import { DatatableSpinner } from '../../../../_metronic/partials/widgets/datatable/DatatableSpinner';
import { column } from '../../../../_metronic/partials/widgets/datatable/HelperModels';
import MTDatatable from '../../../../_metronic/partials/widgets/datatable/MTDatatable';
import { DTColumn } from '../../../../_metronic/partials/widgets/datatable/MTDatatableModel';
import { fillParams } from '../../../../_metronic/partials/widgets/datatable/redux/MTDatatableParametersAction';
import { ProductListModel } from '../models/ProductListModel';
import { deleteProductList, getCategoryList, getProductList } from '../redux/actions/ProductListAction';
import * as actionTypes from "../redux/types/ProductListType";
import { addProduct, editProduct } from "../redux/actions/ProductDetailAction";
import SweetAlert2Warning from "../../../../_metronic/partials/common/SweetAlert2Warning";
import { getUserList } from "../../users/redux/actions/UserAction";
import { HeaderWrapper } from "../../../../_metronic/layout/components/header/HeaderWrapper";
import Cookies from 'universal-cookie';
import { addToCart } from "../../cart/redux/actions/CartListAction";
import * as auth from '../../auth/redux/AuthRedux'
import ProductListSearch from "./ProductListSearch";
const addDetailSchema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
    price: Yup.number().typeError('COMMON.VALIDATION.REQUIRED_TYPE_FIELD'),
  })
var i = 0
const ProductListTable = () => {
    const cookies = new Cookies();
    const intl = useIntl();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.isLoading[actionTypes.GET_PRODUCT_LIST])

    //Current date(yyyy-MM-dd)
    const current = new Date();
    const cMonth = String(current.getMonth() + 1).padStart(2, "0");
    const date = `${current.getFullYear()}-${cMonth}-${String(current.getDate()).padStart(2, "0")}`;
    const productCreateTitle = useSelector((state: RootState) => state.productAdd.title)
    const productDeleteTitle = useSelector((state: RootState) => state.productDelete.title) 
    const productList = useSelector((state: RootState) => state.productList) //All products list
    //const addTCartSuccess = useSelector((state: RootState) => state.cartAdd.id) //Add to cart success?
    //const id = useSelector((state: RootState) => state.productList?.id)
    const products: { productId: number; quantity: number; }[] = [] //Products for post to cart
    const categoryArray = useSelector((state: RootState) => state.category)
    const categoryArr = [{id:0,name:"Bir kategori seçiniz"}]; //For category selectbox
    const {users} = useSelector((state: RootState) => state) //All users list for user's info
    var fname = "A"
    var lname = "A"
    const [showNew, setShowNew] = useState(false);
    const [productId, setProductId] = useState(0);
    const [category4add, setCategory4add] = useState("");
    const [title4add, setTitle4add] = useState("");
    const [price4add, setPrice4add] = useState(0);
    const [description4add, setDescription4add] = useState("");
    const [image4add, setImage4add] = useState("");

    var userList = Object.values(users)[0]
    var userName= localStorage.getItem('username') //username at login
    var userNameList = []
    var name: {
        firstname: any; lastname: any; 
    }[] = []
    //Product's datas for detail/edit
    const addBillInitials: ProductListModel = {
        id: productList?.id,
        title: productList?.title,
        price: productList?.price,
        description: productList?.description,
        category: productList?.category,
        image: "productList?.image",
        rating:  {rate:0,count:0}
    };
    //Sometimes login bug happens, so if token undefined then logout
    const token = useSelector((state: RootState) => state.auth.token) 
    if(token===undefined || userName===null){
        dispatch(auth.actions.logout());
    }
    
    //Finding current user's info from all users by "username" at login
    if(Object.values(userList)[3]!==undefined && userName!==null){
        for(i=0;i<Object.keys(users).length;i++){
            var list = Object.values(users)[i]
            userNameList[i] = Object.values(list)[3]
        }
        var userInfo = Object.values(users)[Number(userNameList?.indexOf(userName))];
        name.push({firstname:userInfo?.name?.firstname,lastname:userInfo?.name?.lastname} );
        cookies.set('lastname', name[0]?.lastname?.toUpperCase(), { path: '/' });
        fname = name[0]?.firstname
        lname = name[0]?.lastname
        localStorage.setItem('userId', userInfo?.id);
        localStorage.setItem('email', userInfo?.email);
    }
    
    useEffect(() => {
        dispatch(getUserList());
        dispatch(getProductList("",0));
        dispatch(getCategoryList());
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
            Order: [], CurrentPage: 1, PageSize: 20, SortOrder: "price DSC"}, Columns: columnSetterArray}))
    }, [dispatch]);
    
    useEffect(() => {
        if(productCreateTitle !== undefined && productCreateTitle !== ''){
            SweetAlert2Warning(productCreateTitle,intl.formatMessage({id: 'PRODUCT.CREATED'}));
        }
        
    }, [productCreateTitle,intl]);
    
    useEffect(() => {
        if(productDeleteTitle !== undefined && productDeleteTitle !== ''){
            SweetAlert2Warning(productDeleteTitle,intl.formatMessage({id: 'PRODUCT.DELETED'}));
        }
        
    }, [productDeleteTitle,intl]);
    //Pushing category selectbox items
    if(i!==Object.keys(categoryArray).length){
        Object.values(categoryArray).forEach(item => {
            categoryArr.push({id:i,name:item})
            i++
        });
    }

    const handleShowAdd = () => { //New product modal opener
        setShowNew(true);}
    const setProductIdAndShowModal = (id: any,title: string,price: number,description: string,image: string) => { //Product's detail modal, datas cames from datatable
        setProductId(id);
        setTitle4add(title);
        setPrice4add(price);
        setDescription4add(description);
        setImage4add(image);
        setShowNew(true);}
    const [quantity, setQuantity] = useState(1); 
    const addingProducts = (productId: number)   => {
        products.push({productId:productId,quantity:Number(quantity)} );
        dispatch(addToCart(Number(localStorage.getItem('userId')),date,products)) //Response içinde sadece id görünüyor
        var x=JSON.stringify( {
            userId: Number(localStorage.getItem('userId')),
            date: date,
            products: products
        })
        console.log(x)
        SweetAlert2Warning("Atılan post:",x);
        products.splice(0)
        setQuantity(1)
    };
    let Data  = categoryArr,MakeItem = function(X:any) {
        return <option key={X.name}>{X.name}</option>;};

    const handleCloseNew = () => {
        setProductId(0);
        setTitle4add("");
        setPrice4add(0);
        setDescription4add("");
        setImage4add("");
        setShowNew(false);} 
    //onClick={dispatch(addToCart(Number(localStorage.getItem('userId')),date,row.id))}
    
    //Filling datatable columns
    const columns: Array<column> = [
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
                                    <Dropdown.Item onClick={(e) => setProductIdAndShowModal(row.id,row.title,row.price,row.description,row.image)} className='menu-link px-3'>
                                        <KTSVG path='/media/icons/duotune/arrows/arr071.svg' className='svg-icon-5'/>
                                        <span className="px-2">{intl.formatMessage({id: 'COMMON.DETAIL'})}</span>
                                    </Dropdown.Item >
                                </div>
                                <div className="menu-item px-3">
                                    <Dropdown.Item  className='menu-link px-3' onClick={(e: any)=>addingProducts(row.id)}>
                                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-5'/>
                                        <span className="px-2">{intl.formatMessage({id: 'PRODUCT.ADD_TO_CART'})}</span>
                                    </Dropdown.Item >
                                </div>
                                <div className="menu-item px-3">
                                    <Dropdown.Item  onClick={() => {
                                        const result = SweetAlert2DeleteConfirm(intl.formatMessage({id: 'COMMON.WARNING'}),
                                            intl.formatMessage({id: 'PRODUCT.DELETE.CONFIRM'}));
                                        result.then((result) => {
                                            if (result.isConfirmed) {
                                                dispatch(deleteProductList(row.id));
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
        <div>
            {name[0]?.firstname.length>1 && <HeaderWrapper firstname={fname.toUpperCase()} lastname={lname.toUpperCase()}/>}
            <ProductListSearch/>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-12`}>
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bolder fs-3 mb-1'>{intl.formatMessage({id: 'PRODUCT.LIST'})}</span>
                </h3>
                <div className="card-toolbar">
                    <div
                        className='card-toolbar mx-2'
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        data-bs-trigger='hover'
                        title={intl.formatMessage({id: 'PRODUCT.ADD.HOVER'})}
                    >
                        <Button className='btn btn-sm btn-light-primary' onClick={handleShowAdd}>
                            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />{intl.formatMessage({id: 'PRODUCT.ADD'})}
                        </Button>
                        
                    </div>
                    
                </div>

            </div>

            <div className='card-body py-3'>
                {(isLoading === true || typeof isLoading === "undefined") ?
                    <DatatableSpinner/> :
                    <MTDatatable columns={columns} body={productList} totalPageCount={1} totalItemCount={20}/>}
            </div>

            <Modal show={showNew} onHide={handleCloseNew}>
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
                    <div className='card-title m-0'>
                        <h1>{intl.formatMessage({id: 'COMMON.EDIT'})}</h1>
                    </div>
                    </div>
                    <Formik
                        validationSchema={addDetailSchema}
                        initialValues={addBillInitials}
                        onSubmit={
                            (values: any) => {
                                values['category'] = category4add
                                values['title'] = title4add
                                values['price'] = Number(price4add)
                                values['description'] = description4add
                                values['image'] = image4add
                                //const formData = new FormData();
                                //const json = JSON.stringify(values);
                                //formData.append("billData", json);
                                if(category4add!=='' && title4add!=='' && price4add!==0 && description4add!=='' && image4add!==''){
                                    if(productId!==0){
                                        dispatch(editProduct(productId,title4add,price4add,description4add,image4add,category4add))
                                    }
                                    else{
                                        dispatch(addProduct(title4add,price4add,description4add,image4add,category4add))
                                    }
                                    
                                }
                                else{
                                    //TODO dile ekle
                                    SweetAlert2Warning(intl.formatMessage({id: 'WARNING'}),intl.formatMessage({id: 'PRODUCT.DETAIL.MISSING.INPUT'}));
                                }
                                
                                
                            }
                        }
                    >
                        {(props) => (
                            <Form className='form' noValidate id='kt_user_detail'>
                                <div className='card-body border-top p-9'>
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.CATEGORY'})}</label>
                                        {productId===0 && <div className='col-lg-8 fv-row'>
                                            <select
                                                className="badge badge-light text-gray-800 custom-select pointer"
                                                style={{width:257.5}}
                                                onChange={(e) =>{
                                                const selectedCategory= e.target.value;
                                                setCategory4add(selectedCategory)
                                                }}>
                                                {Data.map(MakeItem)}
                                            </select>
                                            
                                        </div>}
                                        {productId!==0 &&  <div className='col-lg-8 fv-row'>
                                        <select
                                            className="badge badge-light text-gray-800 custom-select pointer"
                                            style={{width:257.5}}
                                            placeholder={"a"}
                                            onChange={(e) =>{
                                            const selectedCategory= e.target.value;
                                            setCategory4add(selectedCategory)
                                            }}>
                                            {Data.map(MakeItem)}
                                        </select></div>}
                                        <div className='text-danger'>
                                            <ErrorMessage name='category2' render={errorMessage => intl.formatMessage({id: errorMessage},
                                            {field: intl.formatMessage({id: 'BILL_INDEX'}),type:intl.formatMessage({id: 'COMMON.NUMBER'})})}/>
                                        </div>
                                    </div>

                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.TITLE'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                        
                                            <Field
                                                type='text'
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'PRODUCT.TITLE'})})}
                                                name='title'
                                                autoComplete="off" autofill="off"
                                                onChange={(e: any)=>setTitle4add(e.target.value)}
                                                value={title4add}
                                            />
                                            <div className='text-danger'>
                                                <ErrorMessage name='title2' render={errorMessage => intl.formatMessage({id: errorMessage},
                                                    {field: intl.formatMessage({id: 'BILL_INDEX'}),type:intl.formatMessage({id: 'COMMON.NUMBER'})})}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.PRICE'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                        
                                            <Field
                                                type='number'
                                                min="0"
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'PRODUCT.PRICE'})})}
                                                name='price'
                                                autoComplete="off" autofill="off"
                                                onChange={(e: any)=>setPrice4add(e.target.value)}
                                                value={price4add}
                                            />
                                            <div className='text-danger'>
                                                <ErrorMessage name='price2' render={errorMessage => intl.formatMessage({id: errorMessage},
                                                    {field: intl.formatMessage({id: 'BILL_INDEX'}),type:intl.formatMessage({id: 'COMMON.NUMBER'})})}/>
                                            </div>
                                        </div>
                                    </div>      
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.DESCRIPTION'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                        
                                            <textarea 
                                            className='form-control form-control-lg form-control-solid'
                                            placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                            {field: intl.formatMessage({id: 'PRODUCT.DESCRIPTION'})})}
                                            name='description'
                                            autoComplete="off"
                                            onChange={(e: any)=>setDescription4add(e.target.value)}
                                            value={description4add}
                                            rows = {6} cols = {37}>
                                                {description4add}
                                            </textarea>

                                            <div className='text-danger'>
                                                <ErrorMessage name='description2' render={errorMessage => intl.formatMessage({id: errorMessage},
                                                    {field: intl.formatMessage({id: 'BILL_INDEX'}),type:intl.formatMessage({id: 'COMMON.NUMBER'})})}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-6'>
                                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'PRODUCT.IMAGE'})}</label>
                                        <div className='col-lg-8 fv-row'>
                                        
                                            <Field
                                                type='text'
                                                className='form-control form-control-lg form-control-solid'
                                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.SHORT_PLACEHOLDER'},
                                                {field: intl.formatMessage({id: 'PRODUCT.IMAGE'})})}
                                                name='image'
                                                autoComplete="off" autofill="off"
                                                onChange={(e: any)=>setImage4add(e.target.value)}
                                                value={image4add}
                                            />
                                            <div className='text-danger'>
                                                <ErrorMessage name='image2' render={errorMessage => intl.formatMessage({id: errorMessage},
                                                    {field: intl.formatMessage({id: 'BILL_INDEX'}),type:intl.formatMessage({id: 'COMMON.NUMBER'})})}/>
                                            </div>
                                        </div>
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
                                            
                                            <Button className='btn btn-warning me-3' onClick={handleCloseNew}>
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
        </div>
    </div>
    )
}
export default ProductListTable;