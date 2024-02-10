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

import { useAuth } from 'src/auth'
import { useAuthId } from 'src/contexts/AuthIdProvider'
import { useToast } from 'src/contexts/ToastProvider'
import useAbortController from 'src/hooks/useAbortController'

const SignupPage = () => {
  const { createAbortablePromise } = useAbortController()
  const { client: supabase, isAuthenticated, signUp } = useAuth()
  const { id, updateID } = useAuthId()
  const { showToast, hideToast } = useToast()
  const usernameRef = useRef<HTMLInputElement>(null)

  const [isWaitingForEmailConfirmation, setIsWaitingForEmailConfirmation] =
    useState(false)

  useEffect(() => {
    if (id) {
      usernameRef.current?.focus()
    }
  }, [id])

  useEffect(() => {
    if (id) {
      if (confirm('Already logged in, continue session?')) {
        navigate(routes.home())
      }
      if (isWaitingForEmailConfirmation) {
        showToast('Successfully logged in 2!', 'success')
        setTimeout(() => {
          navigate(routes.home())
        }, 100)
      }
      if (!isWaitingForEmailConfirmation) {
        showToast('Found Account!', 'success')
        setTimeout(() => {
          navigate(routes.home())
        }, 100)
      }

      // Optionally, hide the toast after a delay
      const timeout = setTimeout(() => {
        hideToast()
      }, 5000)

      // Optional: Navigate after a delay
      setTimeout(() => {
        navigate(routes.home())
      }, 2000)

      return () => {
        clearTimeout(timeout)
        hideToast()
      }
    }
  }, [isAuthenticated, isWaitingForEmailConfirmation])

  const onSubmit = async (data: Record<string, string>) => {
    // console.log(data.username, data.password, { data })

    // const response = await logIn({
    //   email: data.username,
    //   password: data.password,
    //   authMethod: 'password',
    // })

    const doSignUp = async () => {
      //wait three second to abort after logging in
      const ret = createAbortablePromise(
        signUp({
          email: data.username,
          password: data.password,
        }),
        3000
      )
      return ret
    }

    const response = await doSignUp()
    setIsWaitingForEmailConfirmation(true)
    if (!response) return
    if (response.error) {
      showToast(
        'ERROR:' +
          response.error.message +
          '\nCheck your email for confirmation!'
      )
      return
    }
    //responded
    if (!response.data) return
    if (!response.data.user) return
    if (response.data.user) {
      const updateId = response.data.user
      updateID(updateId)
    }

    //might want to update parts of user in future for now just alert
    // const updateId = response.data.user
    // showToast('Logged in!', 'success')
    // updateID(updateId)
    // navigate(routes.home())
    if (response.data.user.confirmation_sent_at) {
      showToast('Confirmation Email Sent!')
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
          <div className="flex w-full items-center justify-center text-center">
            {isWaitingForEmailConfirmation ? (
              <div className="-translate-y-4/5 rw-button fixed flex transform animate-pulse items-center bg-black text-center font-normal normal-case text-white transition-transform duration-[3000ms] hover:bg-slate-800">
                Email sent, Confirm email to continue
              </div>
            ) : null}
          </div>
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
