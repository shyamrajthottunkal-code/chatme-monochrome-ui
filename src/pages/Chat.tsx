import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageBubble } from "@/components/MessageBubble";
import { MessageInput } from "@/components/MessageInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { PinnedMessages } from "@/components/PinnedMessages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Video, Phone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  type?: "text" | "voice" | "video" | "image" | "document";
  fileUrl?: string;
  metadata?: any;
}

interface PinnedMessage {
  id: string;
  text: string;
  timestamp: Date;
}

const backgroundStyles = {
  default: "bg-background",
  "gradient-blue": "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
  "gradient-purple": "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900",
  "gradient-green": "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
  "pattern-dots": "bg-background bg-[radial-gradient(circle_at_1px_1px,hsl(var(--muted))_1px,transparent_0)] bg-[size:24px_24px]",
  "pattern-waves": "bg-background bg-[linear-gradient(135deg,hsl(var(--muted))_25%,transparent_25%,transparent_50%,hsl(var(--muted))_50%,hsl(var(--muted))_75%,transparent_75%,transparent)] bg-[size:20px_20px]",
};

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

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [pinnedMessages, setPinnedMessages] = useState<PinnedMessage[]>([
    { id: "p1", text: "Welcome message: Please be respectful", timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPinned, setShowPinned] = useState(true);
  const [background, setBackground] = useState<keyof typeof backgroundStyles>("default");

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
    
    if (type !== "text") {
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
    }
    
    setIsTyping(true);

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

  const handleUnpin = (id: string) => {
    setPinnedMessages((prev) => prev.filter((msg) => msg.id !== id));
    toast.success("Message unpinned");
  };

  const handleVideoCall = () => {
    toast.success("Starting video call...");
  };

  const handleVoiceCall = () => {
    toast.success("Starting voice call...");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(var(--chat-header))] border-b">
        <ChatHeader 
          contactName={`Chat ${chatId || "1"}`}
          contactAvatar="/placeholder.svg"
          isOnline={true}
        />
        <div className="flex gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVoiceCall}
            className="rounded-full"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVideoCall}
            className="rounded-full"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {showPinned && (
        <PinnedMessages
          messages={pinnedMessages}
          onUnpin={handleUnpin}
          onClose={() => setShowPinned(false)}
        />
      )}
      
      <ScrollArea className={cn("flex-1 px-4 py-6", backgroundStyles[background])}>
        <div className="space-y-1 max-w-4xl mx-auto">
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

export default Chat;
