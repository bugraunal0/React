import React, {FC} from 'react'

const Spinner: FC = () => {
    return (
        <>
          <span className='indicator-progress d-flex justify-content-center' style={{display: 'block', height: '200px', color: 'white'}}>
            Yükleniyor{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'/>
          </span>
        </>
    )
}

export {Spinner}
