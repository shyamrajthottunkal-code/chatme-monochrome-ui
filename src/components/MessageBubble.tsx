import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FileText, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MessageBubbleProps {
  message: string;
  timestamp: Date;
  isUser: boolean;
  avatar?: string;
  userName?: string;
  type?: "text" | "voice" | "video" | "image" | "document";
  fileUrl?: string;
  metadata?: any;
}

export const MessageBubble = ({ 
  message, 
  timestamp, 
  isUser, 
  avatar, 
  userName = "AI Bot",
  type = "text",
  fileUrl,
  metadata
}: MessageBubbleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderContent = () => {
    switch (type) {
      case "voice":
        return (
          <div className="flex items-center gap-3 min-w-[200px]">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full h-8 w-8 shrink-0"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-foreground" style={{ width: isPlaying ? "100%" : "0%", transition: "width 1s linear" }} />
            </div>
            <span className="text-xs text-muted-foreground">
              {metadata?.duration ? `${Math.floor(metadata.duration / 60)}:${(metadata.duration % 60).toString().padStart(2, '0')}` : "0:00"}
            </span>
          </div>
        );

      case "video":
        return (
          <div className="relative">
            <div className="w-64 h-40 bg-muted rounded-lg flex items-center justify-center">
              <Play className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-sm mt-2">{message}</p>
          </div>
        );

      case "image":
        return (
          <div>
            <div className="w-64 h-48 bg-muted rounded-lg flex items-center justify-center mb-2">
              <span className="text-muted-foreground text-sm">Image: {message}</span>
            </div>
          </div>
        );

      case "document":
        return (
          <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg min-w-[200px]">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{message}</p>
              <p className="text-xs text-muted-foreground">Document</p>
            </div>
          </div>
        );

      default:
        return <p className="text-sm leading-relaxed break-words">{message}</p>;
    }
  };

  return (
    <div className={cn(
      "flex gap-2 mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={avatar} alt={userName} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[75%] sm:max-w-[65%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-4 py-2 rounded-2xl",
          isUser 
            ? "bg-[hsl(var(--chat-user-bubble))] text-[hsl(var(--chat-user-bubble-foreground))] rounded-tr-sm" 
            : "bg-[hsl(var(--chat-bot-bubble))] text-[hsl(var(--chat-bot-bubble-foreground))] rounded-tl-sm"
        )}>
          {renderContent()}
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {format(timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
};
