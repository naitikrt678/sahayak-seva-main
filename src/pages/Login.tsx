import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-government flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-government">
        <CardHeader className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/logo.jpg" 
              alt="Sahayak Portal Logo" 
              className="h-20 w-auto object-contain"
              onError={(e) => {
                // Fallback to placeholder if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback placeholder (hidden by default) */}
            <div className="hidden h-20 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">LOGO PLACEHOLDER</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-government text-primary">SAHAYAK PORTAL</h1>
            <p className="text-muted-foreground">Government of Jharkhand</p>
            <p className="text-sm text-muted-foreground">Admin Login</p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
              Login
            </Button>
          </form>
          
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Demo credentials: admin / admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;