import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: string;
  timestamp: Date;
  isUser: boolean;
  avatar?: string;
  userName?: string;
}

export const MessageBubble = ({ 
  message, 
  timestamp, 
  isUser, 
  avatar, 
  userName = "AI Bot" 
}: MessageBubbleProps) => {
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
          <p className="text-sm leading-relaxed break-words">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {format(timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
};
