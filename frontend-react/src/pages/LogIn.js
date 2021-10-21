import React, { useEffect, useState } from 'react'
import styles from '../styles/logIn.module.css'

const LogIn = (props) => {
  useEffect(() => {
    props.history.push('/')
  }, [props.history])

  const [user, setUser] = useState({ name: '', email: '' })

  const inputHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value })

  const handleClick = (e) => {
    let empty = Object.values(user).some((v) => v === '')
    if (empty) return alert('Complete all fields')
    localStorage.setItem('user', JSON.stringify(user))
    props.history.push('/bands')
  }

  return (
    <div className={styles.loginContainer}>
      <input
        name='name'
        placeholder='Enter your name'
        onChange={inputHandler}
      />
      <input
        name='email'
        placeholder='Enter your email'
        onChange={inputHandler}
      />
      <button onClick={handleClick}>Ingresar</button>
    </div>
  )
}

export default LogIn
