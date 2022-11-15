import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {useLayout} from '../../../core/LayoutProvider'
import {usePageData} from '../../../core/PageData'

const DefaultTitle: FC = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs} = usePageData()
  const {config, attributes} = useLayout()
  return (
    // className='page-title d-flex flex-column'
    <div {...attributes.pageTitle} className='page-title d-flex'>
      {/* begin::Title */}

      
      {pageTitle && (
        <div>
        <h1 className='d-flex text-white fw-bolder my-1 fs-3'>
          {pageTitle}
          {pageDescription && config.pageTitle && config.pageTitle.description && (
            <>
              <span className='h-20px border-gray-200 border-start ms-3 mx-2'></span>
              <small className='text-muted fs-7 fw-bold my-1 ms-1'>{pageDescription}</small>
            </>
          )}
        </h1></div>
      )}
      {/* end::Title */}

      {pageBreadcrumbs &&
        pageBreadcrumbs.length > 0 &&
        config.pageTitle &&
        config.pageTitle.breadCrumbs && (
          <div className='px-5 my-1'>
          <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
            {Array.from(pageBreadcrumbs).map((item, index) => (
              <li className={'breadcrumb-item text-white opacity-75'} key={`${item.path}${index}`}>
                {!item.isSeparator ? (
                  <Link className='text-white text-hover-primary' to={item.path}>
                    {item.title}
                  </Link>
                ) : (
                  <span className='bullet bg-white opacity-75 w-5px h-2px'></span>
                )}
              </li>
            ))}
            <li className='text-white '>{pageTitle}</li>
          </ul></div>
        )}
        
    </div>
  )
}

export {DefaultTitle}
