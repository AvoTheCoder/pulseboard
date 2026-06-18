import { useLocation } from 'react-router-dom'
import Checkin from './Checkin'

function Dashboard() {
    const location = useLocation()
    const email = location.state?.email

    return (
        <div className="min-h-screen flex">

            <aside className="w-64 border-r p-4 flex flex-col gap-10 pt-30 text-xl border border-black">
                <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Home </button>
                <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Dashboard</button>
                <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Profile</button>
                <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Settings</button>
                <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> logout</button>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="p-4 border-b font-bold text-xl">Welcome, {email}</header>
                <main className="flex-1 p-4 flex justify-center items-center border">
                    <Checkin />
                </main>
            </div>

        </div>
    )
}

export default Dashboard
