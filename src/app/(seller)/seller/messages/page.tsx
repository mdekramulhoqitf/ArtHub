"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  body: string;
  createdAt: string;
  readAt: string | null;
  sender: { id: string; name: string | null };
}

interface Conversation {
  id: string;
  lastMessageAt: string;
  buyer: { id: string; name: string | null; email: string; avatar: string | null };
  messages: Message[];
}

export default function SellerMessagesPage() {
  const [convs, setConvs] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [sellerId, setSellerId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/session").then(r => r.json()).then(s => setSellerId((s?.user as any)?.id ?? null));

    fetch("/api/seller/messages")
      .then(r => r.json())
      .then(data => {
        setConvs(data);
        if (data.length > 0) setActiveId(data[0].id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, convs]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !activeId) return;
    setSending(true);
    try {
      const res = await fetch("/api/seller/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: activeId, body: input }),
      });
      if (!res.ok) throw new Error();
      const msg = await res.json();
      setConvs(prev => prev.map(c =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, msg], lastMessageAt: msg.createdAt }
          : c
      ));
      setInput("");
    } catch {
      alert("Failed to send.");
    } finally {
      setSending(false);
    }
  }

  const active = convs.find(c => c.id === activeId);

  if (loading) return (
    <div className="flex items-center justify-center h-full py-24 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading messages…
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-0px)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r border-gray-100 bg-white flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="font-heading text-lg font-bold text-gray-900">Messages</h1>
          <p className="text-xs text-gray-400 mt-0.5">{convs.length} conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {convs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <MessageCircle className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">No messages yet.</p>
            </div>
          )}
          {convs.map(c => {
            const last = c.messages[c.messages.length - 1];
            const unread = c.messages.filter(m => !m.readAt && m.sender.id !== sellerId).length;
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",
                  activeId === c.id && "bg-rose-50 border-l-2 border-rose-500"
                )}
              >
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-sm font-bold shrink-0 overflow-hidden">
                  {c.buyer.avatar
                    ? <img src={c.buyer.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                    : (c.buyer.name ?? c.buyer.email).slice(0, 1).toUpperCase()
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 truncate">{c.buyer.name ?? c.buyer.email}</p>
                    {unread > 0 && (
                      <span className="w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">{unread}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{last?.body ?? "No messages yet"}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {!active ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Select a conversation</p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-sm font-bold shrink-0 overflow-hidden">
                {active.buyer.avatar
                  ? <img src={active.buyer.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                  : (active.buyer.name ?? active.buyer.email).slice(0, 1).toUpperCase()
                }
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{active.buyer.name ?? "Buyer"}</p>
                <p className="text-xs text-gray-400">{active.buyer.email}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
              {active.messages.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">No messages yet. Start the conversation.</p>
              )}
              {active.messages.map(msg => {
                const isMine = msg.sender.id === sellerId;
                return (
                  <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm",
                      isMine
                        ? "bg-rose-600 text-white rounded-br-sm"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                    )}>
                      <p>{msg.body}</p>
                      <p className={cn("text-[10px] mt-1", isMine ? "text-rose-200" : "text-gray-400")}>
                        {new Date(msg.createdAt).toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="bg-white border-t border-gray-100 px-5 py-4 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="w-10 h-10 bg-rose-600 hover:bg-rose-700 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 shrink-0"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
