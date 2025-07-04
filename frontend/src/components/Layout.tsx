import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scissors, User, Calendar, Settings, LogOut } from "lucide-react";

interface LayoutProps {
  userRole?: 'client' | 'admin' | null;
  userName?: string;
}

const Layout = ({ userRole, userName }: LayoutProps) => {
  const location = useLocation();

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  const clientNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Calendar },
    { path: '/book', label: 'Book Appointment', icon: Scissors },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Admin Dashboard', icon: Calendar },
    { path: '/admin/barbers', label: 'Manage Barbers', icon: User },
    { path: '/admin/specialties', label: 'Manage Specialties', icon: Settings },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : clientNavItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ClickBeard
              </span>
            </Link>

            {userRole && (
              <nav className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            )}

            {userRole ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {userName}
                </span>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="golden" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;