/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {Header} from './Header'
import {DefaultTitle} from './page-title/DefaultTitle'
import {Topbar} from './Topbar'
type Props = {
  firstname: any,
  lastname: any
}
const HeaderWrapper: React.FC<Props> = ({firstname,lastname}) => {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config
  
  
  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      data-kt-sticky='true'
      data-kt-sticky-name='header'
      data-kt-sticky-offset="{default: '200px', lg: '300px'}"
      {...attributes.headerMenu}
    >
      <div className={clsx(classes.headerContainer.join(' '), 'd-flex align-items-center')}>
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}

        

        <div className='header-logo me-5 me-md-10 flex-grow-1 flex-lg-grow-0'>
         
          <Link to='/'>
              <img
                style={{
                  opacity: 0.9,
                  height: 120,
                  width: 80,
                }}
                alt='Logo'
                src='/UI_Docs/Logo/demo_project.png'
                className='logo-default h-50px'
              />
          </Link>
          
          </div>
          
          {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              <Header />
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              <DefaultTitle />
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar firstname={firstname} lastname={lastname}/>
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
export {HeaderWrapper}