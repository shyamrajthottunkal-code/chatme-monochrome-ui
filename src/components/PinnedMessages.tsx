import { Pin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface PinnedMessage {
  id: string;
  text: string;
  timestamp: Date;
}

interface PinnedMessagesProps {
  messages: PinnedMessage[];
  onUnpin: (id: string) => void;
  onClose: () => void;
}

export const PinnedMessages = ({ messages, onUnpin, onClose }: PinnedMessagesProps) => {
  if (messages.length === 0) return null;

  return (
    <Card className="border-b rounded-none bg-muted/50">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Pin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Pinned Messages ({messages.length})</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="max-h-32">
        <div className="px-4 py-2 space-y-2">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-2 text-sm group">
              <p className="flex-1 truncate">{message.text}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onUnpin(message.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
