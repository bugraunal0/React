import {FC} from 'react'

const Error403: FC = () => {
  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Yetkisiz İşlem</h1>

      <div className='fw-bold fs-3 text-gray-400 mb-15'>
        Bu Sayfayı Görme Yetkiniz Yok!
      </div>
    </>
  )
}

export {Error403}
