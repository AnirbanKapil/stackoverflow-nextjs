import { useAuthStore } from '@/store/Auth'
import React from 'react'

function RegisterPage() {
  const {createAccount} = useAuthStore()
  const[loading,setLoading] = React.useState(false)
  const [error,setError] = React.useState("")

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     
    const formData = new FormData(e.currentTarget)
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    
    if(!firstname || !lastname || !email || !password){
       setError(()=>"Please fill out all the fields")
    }
    
    setLoading(true);
    setError("");
    

  }
  
  return (
    <div>RegisterPage</div>
  )
}

export default RegisterPage