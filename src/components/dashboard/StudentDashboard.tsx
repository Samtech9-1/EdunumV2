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
  Users
} from 'lucide-react';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'profile'
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

        // Récupérer les informations de l'utilisateur
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
    { icon: User, label: 'Mon profil', active: currentView === 'profile', onClick: () => setCurrentView('profile') },
    { icon: BookOpen, label: 'Mes cours', active: currentView === 'dashboard', onClick: () => setCurrentView('dashboard') },
    { icon: CreditCard, label: 'Abonnements', active: currentView === 'subscription', onClick: () => setCurrentView('subscription') },
    { icon: LogOut, label: 'Déconnexion', active: false, onClick: handleLogout }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-guinea-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement de vos cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 mb-4">
            <p className="text-red-300 mb-4">⚠️ {error}</p>
            {error.includes("abonnement") && (
              <button
                className="bg-guinea-green hover:bg-guinea-green-dark text-white px-6 py-2 rounded-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:text-guinea-green transition-colors"
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

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-guinea-green transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-guinea-green transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <span className="text-white text-sm">Contactez-nous</span>
            <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick || (() => {})}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.active 
                      ? 'bg-guinea-green/20 text-guinea-green border border-guinea-green/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <ChevronRight className="h-4 w-4 ml-auto" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Mes Cours</h1>
              <p className="text-slate-300">Accédez à vos cours et continuez votre apprentissage</p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course)}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-guinea-green/50 transition-all duration-300 cursor-pointer group hover:transform hover:scale-105"
                >
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Subject Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center justify-center min-w-[60px] min-h-[60px]">
                        <span className="text-2xl font-bold">A</span>
                      </div>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Course Info Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg mb-1">{course.title}</h3>
                      <p className="text-white/80 text-sm">{course.subject}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.level}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-guinea-green h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {course.description || `Cours de ${course.subject} de la Terminale Sciences`}
                    </p>
                    
                    <p className="text-slate-400 text-sm mt-2">{course.subject}</p>
                  </div>
                </div>
              ))}
            </div>

            {courses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Aucun cours disponible</h3>
                <p className="text-slate-400">Vous n'avez pas encore accès à des cours. Contactez votre administrateur.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;