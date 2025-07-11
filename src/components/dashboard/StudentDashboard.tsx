import React, { useState, useEffect, useCallback } from 'react';
import { UserService } from '../../services/UserService';
import StudentProfile from './StudentProfile';
import CourseDetailPage from './CourseDetailPage';
import SubscriptionPage from './SubscriptionPage';
import logoEduNum from '../common/Images/eduNum.png';
import { 
  Play, 
  BookOpen, 
  Clock, 
  Award, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Mail,
  Bell,
  Settings,
  Home,
  CreditCard,
  Users,
  TrendingUp,
  Calendar,
  Star,
  BarChart3,
  Download,
  Plus
} from 'lucide-react';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Vérification du token et redirection si nécessaire
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const isTokenValid = UserService.isTokenValid();
        if (!isTokenValid) {
          window.location.href = '/login';
          return;
        }

        const user = await UserService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Erreur de vérification du token :", error);
        window.location.href = '/login';
      }
    };

    verifyToken();
  }, []);

  const handleError = useCallback((error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/login';
          break;
        case 403:
          setError("Votre abonnement n'est plus valide. Veuillez vous réabonner pour accéder aux vidéos.");
          break;
        default:
          setError("Erreur lors de la récupération des cours. Veuillez réessayer.");
      }
    } else {
      setError("Une erreur s'est produite. Veuillez vérifier votre connexion.");
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const isTokenValid = UserService.isTokenValid();
      if (!isTokenValid) {
        window.location.href = '/login';
        return;
      }

      const currentUserProfileId = UserService.getUserId();
      if (!currentUserProfileId) {
        setError('Utilisateur non trouvé');
        return;
      }

      const response = await UserService.getModuleByUserId(currentUserProfileId);
      const fetchedModules = response.data || [];
      
      const coursesData = fetchedModules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        videoUrl: module.videoUrl || "test",
        duration: module.duration || "1500",
        level: module.level || "TSM",
        thumbnail: module.thumbnail || "https://images.pexels.com/photos/6256/mathematics-computation-math-blackboard.jpg?auto=compress&cs=tinysrgb&w=400",
        author: module.author || "EDU NUM",
        subject: module.subject || "Mathématiques"
      }));
      
      setCourses(coursesData);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleLogout = async () => {
    try {
      await UserService.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      window.location.href = '/';
    }
  };

  const handleSelectCourse = async (course) => {
    setSelectedCourseId(course.id);
    setCurrentView('course-detail');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: currentView === 'dashboard', onClick: () => setCurrentView('dashboard') },
    { icon: BookOpen, label: 'Mes cours', active: false, onClick: () => setCurrentView('dashboard') },
    { icon: User, label: 'Mon profil', active: currentView === 'profile', onClick: () => setCurrentView('profile') },
    { icon: CreditCard, label: 'Abonnements', active: currentView === 'subscription', onClick: () => setCurrentView('subscription') },
    { icon: BarChart3, label: 'Performance', active: false, onClick: () => {} },
    { icon: Settings, label: 'Paramètres', active: false, onClick: () => {} },
    { icon: LogOut, label: 'Déconnexion', active: false, onClick: handleLogout }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de vos cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-800 max-w-md mx-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <p className="text-red-600 mb-4">⚠️ {error}</p>
            {error.includes("abonnement") && (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                onClick={() => window.location.href = '/'}
              >
                Se réabonner
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show profile view
  if (currentView === 'profile') {
    return (
      <StudentProfile 
        onBack={() => setCurrentView('dashboard')}
        setSidebarOpen={setSidebarOpen}
      />
    );
  }

  // Show subscription view
  if (currentView === 'subscription') {
    return (
      <SubscriptionPage 
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  // Show course detail view
  if (currentView === 'course-detail' && selectedCourseId) {
    return (
      <CourseDetailPage 
        courseId={selectedCourseId}
        onBack={() => {
          setCurrentView('dashboard');
          setSelectedCourseId(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouveau cours</span>
            </button>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <h1 className="text-xl font-semibold text-gray-800">
              Salut {currentUser?.prenom || 'Étudiant'} - 
              <span className="text-gray-500 font-normal ml-2">voici ce qui se passe avec vos cours aujourd'hui</span>
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
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
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <img 
                src={logoEduNum} 
                alt="EDU NUM Logo" 
                className="h-8 w-auto"
              />            
            </div>
            
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick || (() => {})}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <ChevronRight className="h-4 w-4 ml-auto" />}
                </button>
              ))}
            </nav>

            {/* Support Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Support</h3>
              <div className="space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                  <Mail className="h-5 w-5" />
                  <span>Contact</span>
                  <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">15</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Cours du jour</h3>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+36%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total cours</h3>
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{courses.length}</p>
                  <p className="ml-2 text-sm font-medium text-red-600">-14%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Heures étudiées</h3>
                  <Clock className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">24.5</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+36%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Progression</h3>
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">78%</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+36%</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Courses Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Mes Cours</h2>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">12 Mois</button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">6 Mois</button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30 Jours</button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">7 Jours</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {courses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            onClick={() => handleSelectCourse(course)}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer group border border-gray-200"
                          >
                            <div className="relative mb-4">
                              <img 
                                src={course.thumbnail} 
                                alt={course.title}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Play className="h-8 w-8 text-white" />
                              </div>
                            </div>
                            
                            <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{course.subject}</p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{course.level}</span>
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun cours disponible</h3>
                        <p className="text-gray-600">Vous n'avez pas encore accès à des cours. Contactez votre administrateur.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Progress Overview */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Progression</h3>
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                      <option>7 derniers jours</option>
                      <option>30 derniers jours</option>
                      <option>3 derniers mois</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Mathématiques</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Physique</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Chimie</span>
                        <span className="font-medium">58%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Cours terminé</p>
                        <p className="text-xs text-gray-500">Mathématiques - Chapitre 3</p>
                      </div>
                      <span className="text-xs text-gray-400">2h</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Nouveau cours</p>
                        <p className="text-xs text-gray-500">Physique - Introduction</p>
                      </div>
                      <span className="text-xs text-gray-400">1j</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Exercice complété</p>
                        <p className="text-xs text-gray-500">Chimie - TP n°2</p>
                      </div>
                      <span className="text-xs text-gray-400">3j</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default StudentDashboard;