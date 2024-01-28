import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useToast } from 'src/contexts/ToastProvider'
import { useAuth } from 'src/auth'
import { toast } from '@redwoodjs/web/dist/toast'

const SignupPage = () => {
  const {
    client: supabase,
    isAuthenticated,
    signUp,
    logIn
  } = useAuth()

  const { showToast, hideToast } = useToast();
  const usernameRef = useRef<HTMLInputElement>(null);

  const [isWaitingForEmailConfirmation, setIsWaitingForEmailConfirmation] = useState(false)

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (isWaitingForEmailConfirmation) {
        showToast('Successfully logged in!');
        setTimeout(() => {
          navigate(routes.home());
        }, 100);
      }
      if (!isWaitingForEmailConfirmation) {
        showToast('Found Account!');
        setTimeout(() => {
          navigate(routes.home());
        }, 100);
      }


      // Optionally, hide the toast after a delay
      const timeout = setTimeout(() => {
        hideToast();
      }, 5000);

      // Optional: Navigate after a delay
      setTimeout(() => {
        navigate(routes.home());
      }, 2000);

      return () => {
        clearTimeout(timeout);
        hideToast();
      };

    }
  }, [isAuthenticated, isWaitingForEmailConfirmation]);

  const onSubmit = async (data: Record<string, string>) => {
    // console.log(data.username, data.password, { data })
    try {
      const response = await logIn({
      email: data.username,
      password: data.password,
      authMethod: 'password',
      })
      if (response.data) {

        if (response.data.user) {
          console.log(response.data.user)
          showToast("Found account!")
          navigate(routes.home())
        } else {
          try {
            const response = await signUp({
              email: data.username,
              password: data.password,
            })
            setIsWaitingForEmailConfirmation(true)
          } catch (e) {
            console.log("error2")
          }
        }
      } else {
        try {
          const response = await signUp({
            email: data.username,
            password: data.password,
          })
          setIsWaitingForEmailConfirmation(true)
        } catch (e) {
          console.log("error3")
        }
      }
    } catch (e) {
      console.log('error1')
    }




  }


  return (
    <>
      <Metadata title="Signup" />

      <main className="rw-main">



        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
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
                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>

              </div>
            </div>
          </div>
          <div className='w-full flex items-center justify-center text-center'>{isWaitingForEmailConfirmation ? <div className='fixed -translate-y-4/5 rw-button bg-black hover:bg-slate-800 text-white font-normal normal-case animate-pulse transform duration-[3000ms] text-center items-center flex transition-transform'>Email sent, Confirm email to continue</div> :null}</div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
