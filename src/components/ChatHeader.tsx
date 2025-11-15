import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface ChatHeaderProps {
  contactName: string;
  contactAvatar?: string;
  isOnline?: boolean;
}

export const ChatHeader = ({ contactName, contactAvatar, isOnline = true }: ChatHeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[hsl(var(--chat-header))] border-b border-border sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={contactAvatar} alt={contactName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {contactName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-foreground">{contactName}</h2>
          <p className="text-xs text-muted-foreground">
            {isOnline ? "online" : "offline"}
          </p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </header>
  );
};
