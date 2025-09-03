import { login } from './actions'

interface LoginPageProps {
  searchParams?: {
    message?: string
  }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const errorMessage = searchParams?.message

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[800px] rounded-lg shadow-lg overflow-hidden">
        {/* Login Form */}
        <div className="w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Password"
                required
              />
            </div>

            {/* 👇 Error Message Displayed Here */}
            {errorMessage && (
              <p className="text-sm text-red-600">{decodeURIComponent(errorMessage)}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#e6ce6d] to-[#f5ab0b] text-white py-2 rounded-md hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Welcome Section */}
        <div className="w-1/2 bg-gradient-to-r from-[#4f5c77] to-[#050910] flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Login</h2>
        </div>
      </div>
    </div>
  )
}
