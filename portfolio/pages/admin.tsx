import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../components/form/input';
import { AuthLayout } from '../components/layout/login';
import { PasswordIcon, UserName } from '../components/svg';
import PasswordField from '../components/form/password';
import { HidePassword, ShowIcon } from '../components/svg'
import { ButtonSubmit } from '../components/form/btn-submit';
import { useLoginForm } from '../components/hook/useLoginForm';


const Admin = () => {

  const { control, onSubmit, loading } = useLoginForm()
  const [show, setShow] = useState(false)
  const changePasswordIcon = () => {
    setShow(!show)
  }






  return (
    <AuthLayout>
      <div className='form-field'>
        <h1 className=''>Login</h1>
        <form onSubmit={onSubmit}>
          <InputField name="email" classes={{ input: "input-field", root: '', label: "label" }} control={control} type="text" placeholder='Enter Email' label="Email" icon={<UserName height="2rem" width="2rem" />} />
          <PasswordField name="password" control={control} type={show ? "text" : "password"} classes={{ input: "input-field", root: '', label: "label" }} placeholder='Enter Password' label="Password" icon={<PasswordIcon height="2rem" width="2rem" />} iconEnd={show ? <ShowIcon onClick={changePasswordIcon} /> : <HidePassword onClick={changePasswordIcon} />} />
          <ButtonSubmit classNames={{ dock: "loading-dock", submit: `submit ${loading ? 'spin' : ''}` }}><span className={`spinner `}></span> Submit </ButtonSubmit>
        </form>
      </div>
    </AuthLayout>
  )
}
export default Admin;
