import { useLocation } from 'react-router-dom'

function Dashboard() {
    const location = useLocation()
    const email = location.state?.email

    return <div className="min-h-screen flex">
        <aside className="w-64 border-r p-4 flex flex-col gap-4 pt-30 text-xl gap-10 border border-black">

            <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Home </button>
            <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Dashboard</button>
            <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Profile</button>
            <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> Settings</button>
            <button className="border border-black p-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors"> logout</button>





        </aside>

        <header className="p-4 border-b font-bold text-xl">Welcome, {email}</header>
        <main className="p-4">
            {/* your dashboard content goes here */}
        </main>
    </div>

}

export default Dashboard
