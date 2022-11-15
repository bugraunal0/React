import {FC} from 'react'

const Error500: FC = () => {
  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Sistem Hatası</h1>

      <div className='fw-bold fs-3 text-gray-400 mb-15'>
        Bir sorun oluştu <br /> Lütfen daha sonra tekrar deneyin.
      </div>
    </>
  )
}

export {Error500}
