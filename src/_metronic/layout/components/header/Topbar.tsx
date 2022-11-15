import clsx from 'clsx'
import React from 'react'
import {HeaderUserMenu} from '../../../partials'
import './topbar.css';
type Props = {
  firstname: any,
  lastname: any
}
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: React.FC<Props> = ({firstname,lastname}) => {

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='topbar d-flex align-items-stretch flex-shrink-0'>
        

        {/* begin::User */}
        <div
          className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          {/* begin::Toggle */}
          <div
            className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >

          <div className="outlineFirtAndLastName">
            <div className="firtAndLastName">
              {firstname[0]}
            </div>
          </div>
          </div>
          <HeaderUserMenu firstname={firstname} lastname={lastname}/>
          {/* end::Toggle */}
        </div>
        {/* end::User */}
      </div>
    </div>
  )
}

export {Topbar}
