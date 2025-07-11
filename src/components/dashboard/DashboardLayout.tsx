import React, { useState } from 'react';
import { User, BookOpen, CreditCard, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import logoEduNum from '../common/Images/eduNum.png';
import { UserService } from '../../services/UserService';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick?: () => void;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  title?: string;
  headerActions?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  currentView, 
  onViewChange, 
  title = "Dashboard",
  headerActions 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async (): Promise<void> => {
    try {
      await UserService.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      window.location.href = '/';
    }
  };

  const menuItems: MenuItem[] = [
    { 
      icon: User, 
      label: 'Mon profil', 
      active: currentView === 'profile', 
      onClick: () => onViewChange('profile') 
    },
    { 
      icon: BookOpen, 
      label: 'Mes cours', 
      active: currentView === 'dashboard' || currentView === 'course-detail', 
      onClick: () => onViewChange('dashboard') 
    },
    { 
      icon: CreditCard, 
      label: 'Abonnements', 
      active: currentView === 'subscription', 
      onClick: () => onViewChange('subscription') 
    },
    { 
      icon: LogOut, 
      label: 'Déconnexion', 
      active: false, 
      onClick: handleLogout 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <img 
                src={logoEduNum}
                alt="EDU NUM Logo" 
                className="h-8 w-auto"
              />
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            {headerActions}
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick || (() => {})}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm group ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <ChevronRight className="h-4 w-4 ml-auto text-blue-600" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen bg-gray-50">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;