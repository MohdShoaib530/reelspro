'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(password !== confirmPassword){
      setError('password does not match')
    }

    const res = await fetch('/api/auth/register',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password})
    })
    const data = res.json()
    if(!res.ok){
      setError('Registration failed')
    }
    router.push('/login')
  }
  
  return <div>page</div>;
}

export default Page;
