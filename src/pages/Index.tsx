import { useState } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageBubble } from "@/components/MessageBubble";
import { MessageInput } from "@/components/MessageInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  type?: "text" | "voice" | "video" | "image" | "document";
  fileUrl?: string;
  metadata?: any;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 300000),
    isUser: false,
    type: "text",
  },
  {
    id: "2",
    text: "Hi! Can you help me with some questions?",
    timestamp: new Date(Date.now() - 240000),
    isUser: true,
    type: "text",
  },
  {
    id: "3",
    text: "Of course! I'm here to help. What would you like to know?",
    timestamp: new Date(Date.now() - 180000),
    isUser: false,
    type: "text",
  },
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string, type = "text", file?: File | Blob, metadata?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isUser: true,
      type: type as any,
      metadata,
    };

    setMessages((prev) => [...prev, newMessage]);
    
    // Show success toast for file uploads
    if (type !== "text") {
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
    }
    
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        voice: "I received your voice message! In a real app, this would be transcribed and processed.",
        video: "Great video! I can see what you shared. In a real app, this would be processed.",
        image: "Nice image! I can see what you shared. In a real app, this would be analyzed.",
        document: "I received your document. In a real app, this would be processed and analyzed.",
        text: "Thanks for your message! This is a demo response from the AI bot."
      };

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[type] || responses.text,
        timestamp: new Date(),
        isUser: false,
        type: "text",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background">
      <ChatHeader 
        contactName="AI Bot" 
        contactAvatar="/placeholder.svg"
        isOnline={true}
      />
      
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              timestamp={message.timestamp}
              isUser={message.isUser}
              avatar={message.isUser ? undefined : "/placeholder.svg"}
              type={message.type}
              metadata={message.metadata}
            />
          ))}
          {isTyping && (
            <TypingIndicator avatar="/placeholder.svg" />
          )}
        </div>
      </ScrollArea>

      <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default Index;
