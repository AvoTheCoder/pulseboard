import { useState } from "react"

function Checkin() {

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
        <div className="flex flex-col justify-center items-center border border-black rounded-lg p-8 w-150 h-150">

            {step === 0 && (
                <>
                    <h2 className="text-xl font-bold mb-4">Daily Check-in</h2>
                    <button onClick={() => setStep(1)} className="text-white border border-black bg-blue-500 rounded-lg p-2 w-35 h-10 hover:bg-blue-600 transition-colors cursor-pointer mt-5">
                        Start Now
                    </button>
                </>
            )}

            {step === 1 && (
                <>
                    <h2 className="text-xl font-bold mb-4">What did you do yesterday?</h2>
                    <textarea
                        className="border p-2 w-full"
                        value={form.yesterday}
                        onChange={(e) => setForm({ ...form, yesterday: e.target.value })}
                    />
                    <button onClick={() => setStep(2)} className="text-white border border-black bg-blue-500 rounded-lg p-2 w-35 h-10 hover:bg-blue-600 transition-colors cursor-pointer mt-5">
                        Next
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className="text-xl font-bold mb-4">What are you doing today?</h2>
                    <textarea
                        className="border p-2 w-full"
                        value={form.today}
                        onChange={(e) => setForm({ ...form, today: e.target.value })}
                    />
                    <button onClick={() => setStep(3)} className="text-white border border-black bg-blue-500 rounded-lg p-2 w-35 h-10 hover:bg-blue-600 transition-colors cursor-pointer mt-5">
                        Next
                    </button>
                </>
            )}

            {step === 3 && (
                <>
                    <h2 className="text-xl font-bold mb-4">Any blockers?</h2>
                    <textarea
                        className="border p-2 w-full"
                        value={form.blockers}
                        onChange={(e) => setForm({ ...form, blockers: e.target.value })}
                    />
                    <button onClick={() => setStep(4)} className="text-white border border-black bg-blue-500 rounded-lg p-2 w-35 h-10 hover:bg-blue-600 transition-colors cursor-pointer mt-5">
                        Next
                    </button>
                </>
            )}

            {step === 4 && (
                <>
                    <h2 className="text-xl font-bold mb-4">Energy level (1-5)</h2>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="border p-2 w-20 text-center"
                        value={form.energy}
                        onChange={(e) => setForm({ ...form, energy: Number(e.target.value) })}
                    />
                    <button onClick={() => { sendDatatoServer(); setStep(step + 1); }} className="text-white border border-black bg-blue-500 rounded-lg p-2 w-35 h-10 hover:bg-blue-600 transition-colors cursor-pointer mt-5">
                        Submit
                    </button>
                </>
            )}
            {step === 5 && (
                <>
                    <h2 className="text-xl font-bold mb-4">Thank You!</h2>

                </>
            )}

        </div>
    )
}

export default Checkin