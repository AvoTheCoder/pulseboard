import { useState } from "react"

function Checkin({ onComplete }) {
    const [form, setForm] = useState({
        yesterday: '',
        today: '',
        blockers: '',
        energy: 3
    })
    const [step, setStep] = useState(0)

    const sendDatatoServer = async () => {
        const response = await fetch('http://localhost:3001/api/checkins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                yesterday: form.yesterday,
                today: form.today,
                blockers: form.blockers,
                energy: form.energy
            })
        })
    }

    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-dark-800 border border-border rounded-2xl p-12 w-[500px] shadow-2xl shadow-accent-glow/5">

                {step === 0 && (
                    <>
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl mb-6">✨</div>
                        <h2 className="text-2xl font-bold text-text-primary mb-2">Daily Check-in</h2>
                        <p className="text-text-muted text-sm mb-8">How's your day going?</p>
                        <button
                            onClick={() => setStep(1)}
                            className="bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-accent-glow/20 active:scale-[0.98]"
                        >
                            Start Now
                        </button>
                    </>
                )}

                {step === 1 && (
                    <>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs text-text-muted bg-dark-600 px-2 py-1 rounded-full">1 of 4</span>
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-4">What did you do yesterday?</h2>
                        <textarea
                            className="w-full bg-dark-700 border border-border rounded-lg p-3 text-text-primary text-sm min-h-[120px] resize-none focus:border-accent transition-colors"
                            value={form.yesterday}
                            onChange={(e) => setForm({ ...form, yesterday: e.target.value })}
                            placeholder="Describe your progress..."
                        />
                        <button
                            onClick={() => setStep(2)}
                            className="mt-6 bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-accent-glow/20 active:scale-[0.98]"
                        >
                            Next →
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs text-text-muted bg-dark-600 px-2 py-1 rounded-full">2 of 4</span>
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-4">What are you doing today?</h2>
                        <textarea
                            className="w-full bg-dark-700 border border-border rounded-lg p-3 text-text-primary text-sm min-h-[120px] resize-none focus:border-accent transition-colors"
                            value={form.today}
                            onChange={(e) => setForm({ ...form, today: e.target.value })}
                            placeholder="What's on your plate?"
                        />
                        <button
                            onClick={() => setStep(3)}
                            className="mt-6 bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-accent-glow/20 active:scale-[0.98]"
                        >
                            Next →
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs text-text-muted bg-dark-600 px-2 py-1 rounded-full">3 of 4</span>
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-4">Any blockers?</h2>
                        <textarea
                            className="w-full bg-dark-700 border border-border rounded-lg p-3 text-text-primary text-sm min-h-[120px] resize-none focus:border-accent transition-colors"
                            value={form.blockers}
                            onChange={(e) => setForm({ ...form, blockers: e.target.value })}
                            placeholder="Anything blocking your progress?"
                        />
                        <button
                            onClick={() => setStep(4)}
                            className="mt-6 bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-accent-glow/20 active:scale-[0.98]"
                        >
                            Next →
                        </button>
                    </>
                )}

                {step === 4 && (
                    <>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs text-text-muted bg-dark-600 px-2 py-1 rounded-full">4 of 4</span>
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-4">Energy level</h2>
                        <div className="flex gap-3 mb-6">
                            {[1, 2, 3, 4, 5].map(level => (
                                <button
                                    key={level}
                                    onClick={() => setForm({ ...form, energy: level })}
                                    className={`w-12 h-12 rounded-xl font-bold text-lg cursor-pointer transition-all duration-200 ${
                                        form.energy === level
                                            ? 'bg-accent text-white shadow-lg shadow-accent-glow/30 scale-110'
                                            : 'bg-dark-700 text-text-secondary border border-border hover:border-accent/50'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={async () => { await sendDatatoServer(); onComplete(); }}
                            className="bg-success hover:brightness-110 text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                        >
                            Submit ✓
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Checkin