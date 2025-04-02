"use client"

import { useAuthStore } from '@/store/Auth'
import React, { FormEvent } from 'react'

function LoginPage() {

  const {login} = useAuthStore()
  const[loading,setLoading] = React.useState(false)
  const [error,setError] = React.useState("")

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    if(!email || !password){
       setError(()=> "Please fill out all the fields")
       return
    }

    setLoading(()=> true)
    setError(()=> "")

    const loginResponse = await login(email.toString(),password.toString())

    if(loginResponse.error){
      setError(()=> loginResponse.error!.message)
    }

    setLoading(()=> false)
  }

  return (
    <div>LoginPage</div>
  )
}

export default LoginPage