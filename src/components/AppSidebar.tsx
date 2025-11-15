import { Home, MessageSquare, Users, Archive, Settings, Search } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatList } from "./ChatList";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Settings", url: "/settings", icon: Settings },
];

const mockChats = [
  { id: "1", name: "AI Bot", lastMessage: "How can I help you today?", timestamp: "2m", unread: 2, isPinned: true, isOnline: true },
  { id: "2", name: "Sarah Johnson", lastMessage: "See you tomorrow!", timestamp: "15m", unread: 0, isOnline: true },
  { id: "3", name: "Mike Chen", lastMessage: "Thanks for the update", timestamp: "1h", unread: 1, isOnline: false },
  { id: "4", name: "Emma Wilson", lastMessage: "Let's discuss the project", timestamp: "3h", unread: 0, isPinned: true, isOnline: true },
  { id: "5", name: "Alex Martinez", lastMessage: "Got it!", timestamp: "5h", unread: 0, isOnline: false },
];

const mockGroups = [
  { id: "g1", name: "Team Design", lastMessage: "John: Looking great!", timestamp: "10m", unread: 5, isGroup: true },
  { id: "g2", name: "Project Alpha", lastMessage: "Sarah: Meeting at 3pm", timestamp: "30m", unread: 0, isGroup: true },
  { id: "g3", name: "Family", lastMessage: "Mom: Dinner tonight?", timestamp: "2h", unread: 3, isGroup: true },
];

const mockArchived = [
  { id: "a1", name: "Old Client", lastMessage: "Thanks for everything", timestamp: "2d", unread: 0 },
  { id: "a2", name: "Former Team", lastMessage: "Good luck!", timestamp: "1w", unread: 0 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string>();

  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-80"} collapsible="icon">
      <SidebarHeader className="border-b p-4">
        {!isCollapsed && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Chat Me</h2>
            <SidebarTrigger />
          </div>
        )}
        {isCollapsed && <SidebarTrigger className="mx-auto" />}
      </SidebarHeader>

      <SidebarContent>
        {!isCollapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>

        {!isCollapsed && (
          <div className="flex-1 px-4">
            <Tabs defaultValue="chats" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="chats" className="text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Chats
                </TabsTrigger>
                <TabsTrigger value="groups" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  Groups
                </TabsTrigger>
                <TabsTrigger value="archived" className="text-xs">
                  <Archive className="h-3 w-3 mr-1" />
                  Archived
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-300px)] mt-4">
                <TabsContent value="chats" className="mt-0">
                  <ChatList
                    chats={mockChats}
                    activeChat={activeChat}
                    onSelectChat={(id) => {
                      setActiveChat(id);
                      window.location.href = `/chat/${id}`;
                    }}
                  />
                </TabsContent>

                <TabsContent value="groups" className="mt-0">
                  <ChatList
                    chats={mockGroups}
                    activeChat={activeChat}
                    onSelectChat={(id) => {
                      setActiveChat(id);
                      window.location.href = `/chat/${id}`;
                    }}
                  />
                </TabsContent>

                <TabsContent value="archived" className="mt-0">
                  <ChatList
                    chats={mockArchived}
                    activeChat={activeChat}
                    onSelectChat={(id) => {
                      setActiveChat(id);
                      window.location.href = `/chat/${id}`;
                    }}
                  />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
