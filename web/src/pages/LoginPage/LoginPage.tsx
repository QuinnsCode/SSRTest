import { useRef } from 'react'
import { useEffect } from 'react'
import { useToast } from 'src/contexts/ToastProvider';
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

const LoginPage = () => {
  const {
    client: supabase,
    currentUser,
    logOut,
    isAuthenticated,
    logIn,
  } = useAuth()

  const { showToast, hideToast } = useToast();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      showToast('Successfully logged in!');

      // Optionally, hide the toast after a delay
      const timeout = setTimeout(() => {
        hideToast();
      }, 5000);

      // Optional: Navigate after a delay
      setTimeout(() => {
        navigate(routes.home());
      }, 200);

      return () => {
        clearTimeout(timeout);
        hideToast();
      };

    }
  }, [isAuthenticated]);

  // const usernameRef = useRef<HTMLInputElement>(null)
  // useEffect(() => {
  //   usernameRef.current?.focus()
  // }, [])

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

    const response = await logIn({
      email: data.username,
      password: data.password,
      authMethod: 'password',
    })

    if (response.data) {
      // toast(JSON.stringify(response.data))
      if (response.data.user === null) {
        // toast.error('Invalid Login! 2')
      } else if (response.data.user) {
        // toast.error(JSON.stringify(response))


        // console.log(response.data)
      } else {
        // toast.error('Invalid Login!')
        console.log(response.data)
      }
    } else if (response.error) {
      // toast.error(JSON.stringify(response.error))
    } else {
      // toast.success('Welcome back!')
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
