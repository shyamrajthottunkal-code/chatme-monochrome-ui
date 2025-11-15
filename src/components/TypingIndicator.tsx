import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TypingIndicatorProps {
  avatar?: string;
  userName?: string;
}

export const TypingIndicator = ({ avatar, userName = "AI Bot" }: TypingIndicatorProps) => {
  return (
    <div className="flex gap-2 mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={avatar} alt={userName} />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
          AI
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center px-4 py-3 rounded-2xl rounded-tl-sm bg-[hsl(var(--chat-bot-bubble))]">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};
