/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {Languages} from './Languages'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'
import {useIntl} from "react-intl";
import { toAbsoluteUrl } from '../../../helpers'
import Cookies from 'universal-cookie';
type Props = {
  firstname: any,
  lastname: any
}
const HeaderUserMenu: React.FC<Props> = ({firstname,lastname}) => {
  const cookies = new Cookies();
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
    localStorage.clear();
  }
  const Email = localStorage.getItem('email');
  //const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const intl = useIntl()

 

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
             <img alt='Logo' src={toAbsoluteUrl('https://picsum.photos/200')} />
          </div>

          <div className='d-flex flex-column' style={{wordBreak:"break-word"}}>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {firstname} {cookies.get('lastname')}
              {<span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>{intl.formatMessage({id: 'TYPE.USER'})}</span>}
            </div>
            <div style={{fontWeight:400,fontSize:12}}>
              {Email}
            </div>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          {intl.formatMessage({id: 'HEADER.DROPDOWN.LOGOUT'})}
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
