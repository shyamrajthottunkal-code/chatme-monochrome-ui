import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Mic, Smile, Image as ImageIcon, Video } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { toast } from "sonner";

interface MessageInputProps {
  onSendMessage: (message: string, type?: string, file?: File | Blob, metadata?: any) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, "text");
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size must be less than 20MB");
        return;
      }
      onSendMessage(file.name, "document", file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Image size must be less than 20MB");
        return;
      }
      onSendMessage(file.name, "image", file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Video size must be less than 20MB");
        return;
      }
      onSendMessage(file.name, "video", file);
    }
  };

  const handleVoiceRecordingComplete = (audioBlob: Blob, duration: number) => {
    onSendMessage("Voice message", "voice", audioBlob, { duration });
    setIsRecording(false);
  };

  if (isRecording) {
    return (
      <VoiceRecorder
        onRecordingComplete={handleVoiceRecordingComplete}
        onCancel={() => setIsRecording(false)}
      />
    );
  }

  return (
    <div className="sticky bottom-0 bg-[hsl(var(--chat-input-bg))] border-t border-border px-4 py-3">
      <div className="flex gap-2 max-w-4xl mx-auto items-end">
        <div className="flex gap-1">
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full shrink-0"
                disabled={disabled}
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 border-0" align="start">
              <EmojiPicker onEmojiClick={handleEmojiClick} width={320} height={400} />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full shrink-0"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full shrink-0"
            disabled={disabled}
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full shrink-0"
            disabled={disabled}
            onClick={() => videoInputRef.current?.click()}
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={disabled}
          className="flex-1 rounded-full bg-background border-border focus-visible:ring-1"
        />

        {message.trim() ? (
          <Button
            onClick={handleSend}
            disabled={disabled}
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setIsRecording(true)}
            disabled={disabled}
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 shrink-0"
          >
            <Mic className="h-4 w-4" />
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.txt,.zip"
        />
        <input
          ref={imageInputRef}
          type="file"
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
        />
        <input
          ref={videoInputRef}
          type="file"
          className="hidden"
          onChange={handleVideoUpload}
          accept="video/*"
        />
      </div>
    </div>
  );
};
