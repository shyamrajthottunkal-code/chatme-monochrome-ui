import { useState } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageBubble } from "@/components/MessageBubble";
import { MessageInput } from "@/components/MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 300000),
    isUser: false,
  },
  {
    id: "2",
    text: "Hi! Can you help me with some questions?",
    timestamp: new Date(Date.now() - 240000),
    isUser: true,
  },
  {
    id: "3",
    text: "Of course! I'm here to help. What would you like to know?",
    timestamp: new Date(Date.now() - 180000),
    isUser: false,
  },
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! This is a demo response from the AI bot. In a real application, this would connect to an actual AI service.",
        timestamp: new Date(),
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
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
            />
          ))}
          {isTyping && (
            <MessageBubble
              message="Typing..."
              timestamp={new Date()}
              isUser={false}
              avatar="/placeholder.svg"
            />
          )}
        </div>
      </ScrollArea>

      <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default Index;
