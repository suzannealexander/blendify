'use client'

import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import PasswordRequirements from '@/components/PasswordReqs'

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  const validatePassword = (password: string) => {
    const errors: string[] = []
    if (password.length < 8) errors.push('Must be at least 8 characters')
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Must contain one special character')
    }
    setPasswordErrors(errors)
    return errors.length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'password') {
      validatePassword(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePassword(formData.password)) {
      // TODO: Implement actual signup logic
      console.log('Form submitted', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input 
        type="text"
        name="name"
        label="Name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input 
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div>
        <Input 
          type="password"
          name="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <PasswordRequirements errors={passwordErrors} />
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={passwordErrors.length > 0}
      >
        Get started
      </Button>
    </form>
  )
}