import { MessageSquare, Users, Archive, Settings, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Chats", value: "12", icon: MessageSquare, color: "text-blue-600" },
    { title: "Groups", value: "5", icon: Users, color: "text-green-600" },
    { title: "Archived", value: "8", icon: Archive, color: "text-orange-600" },
    { title: "Active Today", value: "7", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome to Chat Me</h1>
            <p className="text-muted-foreground">Your personal messaging dashboard</p>
          </div>
          <Button onClick={() => navigate("/settings")} variant="outline" size="lg">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/chat/1")}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Chat {i}</p>
                      <p className="text-sm text-muted-foreground">Latest message preview...</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2m ago</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/chat/new")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Start New Chat
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/groups")}>
                <Users className="mr-2 h-4 w-4" />
                Create Group
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/archived")}>
                <Archive className="mr-2 h-4 w-4" />
                View Archived
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
