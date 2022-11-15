import {useEffect, useRef, useState} from "react";
import {setPage} from "../../../../_metronic/partials/widgets/datatable/redux/MTDatatableParametersAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import {getProductList} from "../redux/actions/ProductListAction";
import {KTSVG} from "../../../../_metronic/helpers";
import "flatpickr/dist/themes/light.css";
import {useIntl} from "react-intl";
import { Link } from "react-router-dom";
var i = 0
const ProductListSearch = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const categoryArray = useSelector((state: RootState) => state.category)
    const categoryArr: { id: number; name: any; }[] = [];
    const [category4Search, setCategory4Search] = useState("");
    const [limit, setLimit] = useState(0);
    const firstRender = useRef(true);
    const cartList = useSelector((state: RootState) => state.cartList)
    const cartSize = Object.keys(cartList?.products)?.length
    if(i!==Object.keys(categoryArray).length){
        Object.values(categoryArray).forEach(item => {
            categoryArr.push({id:i,name:item})
            i++
            //console.log(i)
            //TODO: her seçimde çalışıyor
        });
    }
    useEffect(() => {
        if (firstRender.current) {firstRender.current = false; return;}
    }, []);
    let Data  = categoryArr,MakeItem = function(X:any) {
        return <option key={X.name}>{X.name}</option>;};
    const search = () => {
        dispatch(getProductList(category4Search,limit));
        setCategory4Search("")
        setLimit(0)
        dispatch(setPage(1))
    };

    return (
        <div className={`card card-xxl-stretch mb-5 mb-xxl-10`}>

            
            <div className='card-body'>
                <div className="">
                    <div className="row" onKeyPress={(e) => {if (e.key === "Enter") {search()}}}>
                        
                        <div className="col-4">
                            <label className="fs-6 form-label fw-bolder text-dark">{intl.formatMessage({id: 'PRODUCT.CATEGORY'})}</label>
                            <select
                                className="form-control form-control-solid custom-select pointer"
                                style={{width:257.5}}
                                onChange={(e) =>{
                                const selectedCategory= e.target.value;
                                setCategory4Search(selectedCategory)
                                }}>
                                {Data.map(MakeItem)}
                            </select>
                        </div>
                        <div className="col-3">
                            <label className="fs-6 form-label fw-bolder text-dark">{intl.formatMessage({id: 'PRODUCT.LIMIT'})}</label>
                            <input
                                type='number'
                                className='form-control form-control-lg form-control-solid'
                                placeholder={intl.formatMessage({id: 'COMMON.INPUT.PLACEHOLDER'},
                                {field: intl.formatMessage({id: 'PRODUCT.LIMIT'})})}
                                name='limit'
                                autoComplete="off"
                                onChange={(e) =>{
                                    //setLabel(selectedBill);
                                    setLimit(Number(e.target.value))
                                    //handleSearch;
                                    //setBillId(Number((billList.find(key => key?.label === selectedBill))?.id))
                                    //postShow(Number((billList.find(key => key?.label === selectedBill))?.id))
                                    }}
                                value={limit}
                            />
                        </div>
                        {<div className="col-4 mt-2">
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
                                <div style={{paddingLeft:10}}>
                                    <Link to={'/cart-list'} 
                                        className="btn btn-warning">
                                        <KTSVG path='UI_Docs/cart.svg' className='svg-icon-3' />
                                        {intl.formatMessage({id: 'CART.TITLE'})}
                                        {cartSize}
                                    </Link>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductListSearch;
