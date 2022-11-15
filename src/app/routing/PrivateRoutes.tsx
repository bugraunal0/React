import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'



export function PrivateRoutes() {
  //const {roles}: UserModel = useSelector<RootState>(({auth}) => auth.user) as UserModel

  
  const ProductListPage = lazy(() => import('../modules/product/ProductListPage'))
  const CartListTable = lazy(() => import('../modules/cart/components/CartListTable'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>


        <Route path='/product-list' component={ProductListPage} />
        <Route path='/cart-list' component={CartListTable} />
        <Route path='/index' component={ProductListPage} />

        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/index' />
        <Redirect to='/error/404' />

       

      </Switch>
    </Suspense>
  )
}
