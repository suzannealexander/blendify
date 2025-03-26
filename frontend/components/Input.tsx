import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ 
  label, 
  className, 
  ...props 
}: InputProps) {
  return (
    <div>
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className={`block w-full px-3 py-2 border border-gray-300 
        rounded-md shadow-sm focus:outline-none focus:ring-purple-500 
        focus:border-purple-500 sm:text-sm ${className || ''}`}
      />
    </div>
  )
}