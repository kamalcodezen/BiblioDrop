"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Send,
  X,
  Trash2,
  Minimize2,
  User,
  Truck,
  BookOpen,
  RotateCcw,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { sendChatMessage } from "@/lib/api/ai";

export default function BiblioBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [providerBadge, setProviderBadge] = useState("BiblioBot");
  const [messages, setMessages] = useState([
    {
      id: "welcome-msg",
      sender: "bot",
      text: "👋 Hi there! I'm **BiblioBot**, your smart library assistant. How can I help you today?",
      time: "Just now",
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const quickPrompts = [
    { label: "Doorstep Delivery", icon: Truck, prompt: "How does doorstep book delivery work?" },
    { label: "Book Suggestions", icon: BookOpen, prompt: "Can you recommend top books to read?" },
    { label: "Return Policy", icon: RotateCcw, prompt: "What is the book return policy and duration?" },
    { label: "Borrowing Fees", icon: CreditCard, prompt: "How are book borrowing fees and payments handled?" },
  ];

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Build conversation history excluding errors
      const history = messages
        .filter((m) => m.id !== "welcome-msg")
        .map((m) => ({
          sender: m.sender,
          text: m.text,
        }));

      const res = await sendChatMessage(query, history);

      if (res.provider) {
        setProviderBadge(res.provider);
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: res.reply,
        provider: res.provider,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "⚠️ Sorry, I had trouble answering that right now. Please try again!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-msg",
        sender: "bot",
        text: "👋 Chat cleared! How can I assist your reading journey today?",
        time: "Just now",
      },
    ]);
  };

  // Simple clean markdown formatter for bullets and bold text
  const renderFormattedText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let formatted = line;
      // Bold syntax **text**
      const parts = formatted.split(/(\*\*.*?\*\*)/g);

      return (
        <div key={idx} className={line.startsWith("- ") ? "ml-3 flex items-start gap-1.5 my-1" : "my-0.5"}>
          {line.startsWith("- ") && <span className="text-primary font-bold">•</span>}
          <span>
            {parts.map((p, pIdx) => {
              if (p.startsWith("**") && p.endsWith("**")) {
                return <strong key={pIdx} className="font-bold text-foreground">{p.slice(2, -2)}</strong>;
              }
              return line.startsWith("- ") ? p.replace(/^- /, "") : p;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button - ONLY a sleek Book icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="BiblioDrop AI Assistant"
          title="BiblioDrop AI Assistant"
          className="w-14 h-14 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(196,132,74,0.5)] dark:hover:shadow-[0_0_30px_rgba(0,245,212,0.5)] border border-primary/30 transition-all cursor-pointer relative"
        >
          {isOpen ? (
            <X size={26} className="transition-transform duration-200" />
          ) : (
            <BookOpen size={26} className="transition-transform duration-200" />
          )}
        </motion.button>
      </div>

      {/* Expandable Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] rounded-[24px] border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden select-text"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/60 bg-card-soft/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary relative">
                  <BookOpen size={20} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-poppins text-foreground flex items-center gap-1.5">
                    BiblioBot
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                      AI 2.0
                    </span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Online • Powered by {providerBadge}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area - with full scroll support */}
            <div
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 min-h-0 p-4 overflow-y-auto overscroll-contain space-y-3.5 text-sm font-sans"
              style={{
                scrollbarWidth: "thin",
                overscrollBehavior: "contain",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                      <BookOpen size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-background font-medium rounded-br-xs"
                        : "bg-card-soft border border-border text-foreground rounded-bl-xs"
                    }`}
                  >
                    {renderFormattedText(msg.text)}

                    <div
                      className={`text-[10px] mt-1.5 flex items-center justify-end gap-1.5 opacity-60`}
                    >
                      {msg.provider && msg.sender === "bot" && (
                        <span className="text-[9px] uppercase tracking-wider font-semibold">
                          via {msg.provider}
                        </span>
                      )}
                      <span>{msg.time}</span>
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-1">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <BookOpen size={14} />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-card-soft border border-border flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2 bg-card-soft/30 border-t border-border/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {quickPrompts.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(item.prompt)}
                    disabled={loading}
                    className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Icon size={12} className="text-primary" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3.5 border-t border-border/60 bg-card flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask BiblioBot anything..."
                disabled={loading}
                className="flex-1 bg-card-soft border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-primary text-background hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
