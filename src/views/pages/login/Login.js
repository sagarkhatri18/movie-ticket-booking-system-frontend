import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/Services'
import { isLoggedIn } from 'src/helpers/IsLoggedIn'

// For Toastr
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Validator Packages
import SimpleReactValidator from 'simple-react-validator'

const Login = (props) => {
  const dispatch = useDispatch()

  // Validator Imports
  const validator = useRef(new SimpleReactValidator()).current
  const [, forceUpdate] = useState()

  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (isLoggedIn()) {
      props.history.push('/dashboard')
    }
  }, [props])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validator.allValid()) {
      const email = state.email
      const password = state.password

      login(email, password)
        .then((res) => {
          const response = res.data

          if (response.success === true) {
            const token = response.token
            localStorage.setItem('token', token)
            //props.history.push('/dashboard')
          } else {
            toast.error('Invalid email or Password')
          }
        })
        .catch((error) => {
          toast.error('Failed to communicate with API. Please try again later!')
        })
    } else {
      validator.showMessages()
      forceUpdate(1)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h4>Movie Ticket Booking System</h4>
                    <p className="text-muted text-center">Sign in to your account</p>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend input-icon">
                        <span className="input-group-text">
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        value={state.email}
                        className={`form-control`}
                        placeholder="Email"
                        autoComplete="off"
                        name="email"
                        onChange={handleChange}
                      />
                      {validator.message('email', state.email, 'required')}
                    </div>
                    <div className="input-group mb-4">
                      <div className="input-group-prepend input-icon">
                        <span className="input-group-text">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        value={state.password}
                        className={`form-control`}
                        placeholder="Password"
                        autoComplete="off"
                        name="password"
                        onChange={handleChange}
                      />
                      {validator.message('password', state.password, 'required')}
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary px-4 btn-block">
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
