import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Pin } from "lucide-react";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  isGroup?: boolean;
  isPinned?: boolean;
  isOnline?: boolean;
}

interface ChatListProps {
  chats: Chat[];
  activeChat?: string;
  onSelectChat: (chatId: string) => void;
}

export const ChatList = ({ chats, activeChat, onSelectChat }: ChatListProps) => {
  return (
    <div className="space-y-1">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent relative",
            activeChat === chat.id && "bg-accent"
          )}
        >
          {chat.isPinned && (
            <Pin className="absolute top-2 right-2 h-3 w-3 text-primary" />
          )}
          
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {chat.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="font-semibold truncate">{chat.name}</p>
              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
          </div>

          {chat.unread > 0 && (
            <Badge className="bg-primary text-primary-foreground rounded-full h-5 min-w-5 px-1.5 text-xs">
              {chat.unread}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};
