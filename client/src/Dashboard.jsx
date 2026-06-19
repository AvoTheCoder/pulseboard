import { useLocation } from 'react-router-dom'
import Checkin from './Checkin'
import { useState } from 'react'
import Chat from './Chat'

function Dashboard() {
    const location = useLocation()
    const email = location.state?.email
    const [checkinDone, setCheckinDone] = useState(false)

    return (
        <div className="h-screen flex bg-dark-900">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-800 border-r border-border p-6 flex flex-col gap-2 pt-8">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm">P</div>
                    <span className="text-text-primary font-semibold text-lg tracking-tight">PulseBoard</span>
                </div>

                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-dark-600 hover:text-text-primary transition-all duration-200 cursor-pointer text-sm text-left">
                    🏠 Home
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-dark-600 hover:text-text-primary transition-all duration-200 cursor-pointer text-sm text-left">
                    📊 Dashboard
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-dark-600 text-text-primary cursor-pointer text-sm text-left">
                    💬 Chat
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-dark-600 hover:text-text-primary transition-all duration-200 cursor-pointer text-sm text-left">
                    👤 Profile
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-dark-600 hover:text-text-primary transition-all duration-200 cursor-pointer text-sm text-left">
                    ⚙️ Settings
                </button>

                <div className="mt-auto">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 cursor-pointer text-sm w-full text-left">
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-0">
                <header className="px-6 py-4 border-b border-border bg-dark-800/50 backdrop-blur-sm">
                    <h1 className="text-text-primary font-semibold text-lg">Welcome, <span className="text-accent">{email}</span></h1>
                </header>
                <main className="flex-1 flex min-h-0">
                    {!checkinDone ? (
                        <Checkin onComplete={() => setCheckinDone(true)} />
                    ) : (
                        <Chat email={email} />
                    )}
                </main>
            </div>
        </div>
    )
}

export default Dashboard
