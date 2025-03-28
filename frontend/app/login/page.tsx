import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>
        <LoginForm />
        <div className="text-center">
          <Link 
            href="/signup" 
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Don&#39;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}