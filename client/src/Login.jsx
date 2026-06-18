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
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()
        console.log(data)
        if (data.user) {
            navigate('/dashboard', { state: { email: data.user.email } })
        }


    }

    console.log(email)
    console.log(password)
    return (

        <div className="flex items-center justify-center min-h-screen">

            <div className="flex flex-col border border-black p-10 rounded-4xl ">
                <input type="email" placeholder="username" value={email} onChange={e => setEmail(e.target.value)} className="text-center" />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} className="text-center" />
                <div className="flex gap-4">

                    <button onClick={handleSignIn} className="border border-black rounded-p4 px-1.5 py-0.4 cursor-pointer mt-5 hover: bg-white hover:text-black transition-colors"> Sign In </button>
                    <button onClick={() => navigate('/signup')} className="border border-black rounded-p4 px-1.5 py-0.4 cursor-pointer mt-5 hover: bg-white hover:text-black transition-colors" > Sign Up</button>



                </div>


            </div>



        </div >
    )
}

export default Login