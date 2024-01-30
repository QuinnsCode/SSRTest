import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
// import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { useAuthId } from 'src/contexts/AuthIdProvider'
import { useToast } from 'src/contexts/ToastProvider'
import useAbortController from 'src/hooks/useAbortController'

const LoginPage = () => {
  const { client: supabase, isAuthenticated, currentUser, logIn } = useAuth()
  const { updateID } = useAuthId()
  const { showToast } = useToast()
  const usernameRef = useRef<HTMLInputElement>(null)

  const { createAbortablePromise } = useAbortController()

  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  // useEffect(() => {

  //   if (isAuthenticated) {
  //     // showToast("Input1")
  //     // setTimeout(()=>{toast.dismiss()},200)
  //     // setTimeout(()=>{toast.success("Loading Account!")},300)
  //     setTimeout(()=>navigate(routes.home()),2000)

  //   }
  // }, [isAuthenticated])

  const onSubmit = async (data: Record<string, string>) => {
    // console.log(data.username, data.password, { data })

    // const response = await logIn({
    //   email: data.username,
    //   password: data.password,
    //   authMethod: 'password',
    // })

    const loginResponse = await createAbortablePromise(
      logIn({
        email: data.username,
        password: data.password,
        authMethod: 'password',
      }),
      3000
    )
    const { user, session } = loginResponse.data

    if (user) {
      // alert(JSON.stringify(updateId))
      showToast('Logged in!', 'success')
      updateID(user)
      navigate(routes.home())
    }
  }

  return (
    <>
      <Metadata title="Login" />

      <main className="rw-main">
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Login</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
