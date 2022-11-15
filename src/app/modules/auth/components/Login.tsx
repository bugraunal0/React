/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'
import {useIntl} from 'react-intl'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'COMMON.VALIDATION.MIN_LENGTH_FIELD')
    .max(50, 'COMMON.VALIDATION.MAX_LENGTH_FIELD')
    .required('COMMON.VALIDATION.REQUIRED_FIELD'),
  password: Yup.string()
    .min(3, 'COMMON.VALIDATION.MIN_LENGTH_FIELD')
    .max(50, 'COMMON.VALIDATION.MAX_LENGTH_FIELD')
    .required('COMMON.VALIDATION.REQUIRED_FIELD'),
})

const initialValues = {
  username: 'mor_2314',
  password: '83r5^_',
}

export function Login() {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        login(values.username, values.password)
          .then(({data: {token,refreshToken=token,user={
            id: 5,
            username: "values.username",
            firstName: "",
            lastName: "Admin",
            fullname: "Admin",
            roles: [
              "USER",
              "ADMIN",
            ],
          }}}) => {
            setLoading(false)
            //dispatch(getUserList());
            dispatch(auth.actions.login(token,refreshToken,user))
            localStorage.setItem('username', values.username);
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus(intl.formatMessage({id: 'AUTH.VALIDATION.INVALID_LOGIN'}))
          })
      }, 1000)
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'AUTH.LOGIN.TITLE'})}</h1>
      </div>

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>):(<></>)}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>{intl.formatMessage({id: 'COMMON.USERNAME'})}</label>
        <input
          placeholder={intl.formatMessage({id: 'COMMON.USERNAME'})}
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
          type='text'
          name='username'
          autoComplete='off'
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{ intl.formatMessage({id: formik.errors.username},
                {field: intl.formatMessage({id: 'COMMON.USERNAME'}),min:"3",max:"50"})}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>{intl.formatMessage({id: 'COMMON.PASSWORD'})}</label>
          </div>
        </div>
        <input
          type='password'
          placeholder={intl.formatMessage({id: 'COMMON.PASSWORD'})}
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{ intl.formatMessage({id: formik.errors.password},
                  {field: intl.formatMessage({id: 'COMMON.PASSWORD'}),min:"3",max:"50"})}</span>
              {/*<span role='alert'>{formik.errors.password}</span>*/}
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='text-center'>
        
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>{intl.formatMessage({id: 'AUTH.LOGIN.BUTTON'})}</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              {intl.formatMessage({id: 'AUTH.GENERAL.VALIDATING'})}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
