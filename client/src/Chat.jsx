import { useState, useEffect, useRef } from "react";

function Chat({ email }) {
    const [messages, setMessages] = useState([])
    const [inputText, setinputText] = useState('')
    const messagesEndRef = useRef(null)

    const handleSend = async () => {
        if (!inputText.trim()) return
        const response = await fetch('http://localhost:3001/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: inputText, email: email })
        })
        const data = await response.json()
        await getMessages()
    }

    const getMessages = async () => {
        const response = await fetch("http://localhost:3001/api/messages", {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
        const data = await response.json()
        setMessages(data)
    }

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages()
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex w-full h-full">
            {/* Contacts panel */}
            <aside className="w-72 bg-dark-800 border-r border-border p-4 flex flex-col">
                <h3 className="font-semibold text-text-primary mb-4 px-2 text-sm uppercase tracking-wider">Messages</h3>

                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-3 rounded-lg bg-dark-600 text-text-primary cursor-pointer text-left transition-all duration-200">
                        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">T</div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Team Chat</span>
                            <span className="text-xs text-text-muted">Everyone</span>
                        </div>
                    </button>
                </div>

                <div className="mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success text-xs font-bold">
                            {email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-text-primary font-medium truncate max-w-[160px]">{email}</span>
                            <span className="text-xs text-success flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block"></span>
                                Online
                            </span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Chat area */}
            <div className="flex-1 flex flex-col min-h-0 bg-dark-900">
                {/* Chat header */}
                <div className="px-6 py-3 border-b border-border bg-dark-800/50 backdrop-blur-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">T</div>
                    <div>
                        <h3 className="text-text-primary font-semibold text-sm">Team Chat</h3>
                        <p className="text-text-muted text-xs">{messages.length} messages</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3">
                    {messages.map((msg, index) => {
                        const isMine = msg.user_email === email
                        return (
                            <div key={index} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] ${isMine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                    <span className="text-[10px] text-text-muted px-1">
                                        {isMine ? 'You' : msg.user_email}
                                    </span>
                                    <div
                                        style={{ padding: '12px 24px', borderRadius: '16px', fontSize: '16px', lineHeight: '1.6' }}
                                        className={`${isMine
                                        ? 'bg-accent text-white'
                                        : 'bg-dark-600 text-text-primary'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-6 py-4 border-t border-border bg-dark-800/50 backdrop-blur-sm">
                    <div className="flex gap-3 items-center">
                        <input
                            onKeyDown={(e) => { if (e.key === 'Enter') { handleSend(); setinputText('') } }}
                            onChange={e => setinputText(e.target.value)}
                            value={inputText}
                            placeholder="Type a message..."
                            className="flex-1 bg-dark-700 border border-border rounded-xl px-4 py-3 text-text-primary text-sm focus:border-accent transition-colors"
                        />
                        <button
                            onClick={() => { handleSend(); setinputText('') }}
                            className="bg-accent hover:bg-accent-hover text-white px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-accent-glow/20 active:scale-[0.95] font-medium text-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
