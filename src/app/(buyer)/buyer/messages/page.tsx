"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MessageCircle, Send, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  body: string;
  createdAt: string;
  sender: { id: string; name: string | null };
}

interface Conversation {
  id: string;
  lastMessageAt: string;
  seller: {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
    shop: { displayName: string; slug: string; logoUrl: string | null } | null;
  };
  messages: Message[];
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const day = Math.floor(h / 24);
  if (day > 0) return `${day}d`;
  if (h > 0) return `${h}h`;
  if (m > 0) return `${m}m`;
  return "now";
}

export default function BuyerMessagesPage() {
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/buyer/messages")
      .then((r) => r.json())
      .then((d) => {
        const list = Array.isArray(d) ? d : [];
        setConvos(list);
        if (list.length > 0) setActive(list[0]);
      })
      .finally(() => setLoading(false));

    fetch("/api/buyer/profile")
      .then((r) => r.json())
      .then((p) => setMyId(p?.id ?? null));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages.length]);

  async function send() {
    if (!input.trim() || !active || sending) return;
    setSending(true);
    const res = await fetch("/api/buyer/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: active.id, body: input.trim() }),
    });
    if (res.ok) {
      const msg = await res.json();
      const updated = {
        ...active,
        messages: [...active.messages, msg],
        lastMessageAt: msg.createdAt,
      };
      setActive(updated);
      setConvos((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setInput("");
    }
    setSending(false);
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading messages…
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className={cn("w-full sm:w-72 border-r border-gray-100 flex flex-col bg-white", active ? "hidden sm:flex" : "flex")}>
        <div className="p-5 border-b border-gray-100">
          <h1 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-rose-500" /> Messages
          </h1>
        </div>

        {convos.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <MessageCircle className="w-12 h-12 text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm">No conversations yet.</p>
            <Link href="/shops" className="text-rose-600 text-xs mt-2 hover:underline">Browse artists to message</Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {convos.map((conv) => {
              const shop = conv.seller.shop;
              const name = shop?.displayName ?? conv.seller.name ?? conv.seller.email;
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isActive = active?.id === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => setActive(conv)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-gray-50",
                    isActive && "bg-rose-50"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
                    {shop?.logoUrl ? (
                      <Image src={shop.logoUrl} alt="" width={40} height={40} className="object-cover" />
                    ) : (
                      name[0].toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={cn("text-sm font-semibold truncate", isActive ? "text-rose-700" : "text-gray-900")}>{name}</p>
                      <span className="text-[10px] text-gray-400 shrink-0">{timeAgo(conv.lastMessageAt)}</span>
                    </div>
                    {lastMsg && (
                      <p className="text-xs text-gray-400 truncate mt-0.5">{lastMsg.body}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat */}
      {active ? (
        <div className={cn("flex-1 flex flex-col bg-gray-50 overflow-hidden", !active && "hidden sm:flex")}>
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-3">
            <button onClick={() => setActive(null)} className="sm:hidden p-1 text-gray-500 hover:text-black">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {(active.seller.shop?.displayName ?? active.seller.name ?? "A")[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {active.seller.shop?.displayName ?? active.seller.name ?? active.seller.email}
              </p>
              {active.seller.shop && (
                <Link href={`/shop/${active.seller.shop.slug}`} className="text-xs text-rose-600 hover:underline">
                  View shop
                </Link>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
            {active.messages.map((msg) => {
              const isMe = msg.sender.id === myId;
              return (
                <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    isMe ? "bg-rose-600 text-white rounded-br-sm" : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
                  )}>
                    <p>{msg.body}</p>
                    <p className={cn("text-[10px] mt-1", isMe ? "text-rose-200" : "text-gray-400")}>
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-100 px-4 py-4">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-center gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="w-10 h-10 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden sm:flex items-center justify-center text-gray-400 bg-gray-50">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-sm">Select a conversation</p>
          </div>
        </div>
      )}
    </div>
  );
}
