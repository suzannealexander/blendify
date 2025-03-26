'use client'

import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Link from 'next/link'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual login logic
    console.log('Login submitted', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input 
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input 
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input 
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label 
            htmlFor="rememberMe" 
            className="ml-2 block text-sm text-gray-900"
          >
            Remember for 30 days
          </label>
        </div>
        <div className="text-sm">
          <Link 
            href="/forgot-password" 
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Forgot password
          </Link>
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full"
      >
        Sign in
      </Button>
    </form>
  )
}