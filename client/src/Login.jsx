import { useState } from "react"
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async () => {
        const response = await fetch('http://localhost:3001/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        console.log(data)
        if (data.user) {
            navigate('/dashboard', { state: { email: data.user.email } })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-dark-900">
            <div className="flex flex-col items-center gap-6 bg-dark-800 border border-border rounded-2xl p-12 w-96 shadow-2xl shadow-accent-glow/10">
                <div className="flex flex-col items-center gap-1 mb-2">
                    <h1 className="text-3xl font-bold text-text-primary tracking-tight">PulseBoard</h1>
                    <p className="text-text-muted text-sm">Sign in to your workspace</p>
                </div>

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-dark-700 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:border-accent transition-colors"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSignIn() }}
                    className="w-full bg-dark-700 border border-border rounded-lg px-4 py-3 text-text-primary text-sm focus:border-accent transition-colors"
                />

                <button
                    onClick={handleSignIn}
                    className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-accent-glow/20 active:scale-[0.98]"
                >
                    Sign In
                </button>

                <p className="text-text-muted text-sm">
                    Don't have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                        className="text-accent hover:text-accent-hover cursor-pointer transition-colors"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login