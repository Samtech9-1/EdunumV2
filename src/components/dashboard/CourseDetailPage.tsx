import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserService } from '../../services/UserService';
import logoEduNum from '../common/Images/eduNum.png';
import { 
  ChevronLeft, 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle,
  Lock,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Mail,
  Bell,
  CreditCard,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  PauseCircle,
  Loader,
  WifiOff,
  Home,
  Shield
} from 'lucide-react';

interface CourseDetailPageProps {
  courseId: string;
  onBack: () => void;
}

interface VideoSection {
  idSection: string;
  duration: string;
  title: string;
  videoPath: string;
}

interface Chapitre {
  title: string;
  sections: VideoSection[];
}

interface CourseModule {
  title: string;
  chapitres: Chapitre[];
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick?: () => void;
}

// Composant d'erreur avec menu
const ErrorPageWithMenu: React.FC<{ error: string; onBack: () => void; onLogout: () => void }> = ({ error, onBack, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: User, label: 'Mon profil', active: false, onClick: () => window.location.href = '/profile' },
    { icon: BookOpen, label: 'Mes cours', active: true, onClick: onBack },
    { icon: CreditCard, label: 'Abonnements', active: false, onClick: () => window.location.href = '/subscription' },
    { icon: LogOut, label: 'Déconnexion', active: false, onClick: onLogout }
  ];

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
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-guinea-green hover:bg-guinea-green-dark text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Retour aux cours</span>
            </button>
            <button className="text-white hover:text-guinea-green transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-guinea-green transition-colors">
              <Bell className="h-5 w-5" />
            </button>
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
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-56 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick || (() => {})}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    item.active 
                      ? 'bg-guinea-green/20 text-guinea-green border border-guinea-green/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <ChevronRight className="h-3 w-3 ml-auto" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-white max-w-md mx-4">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-8">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Erreur</h2>
              <p className="text-red-300 mb-6">{error}</p>
              <div className="space-y-3">
                <button
                  onClick={onBack}
                  className="w-full bg-guinea-green hover:bg-guinea-green-dark text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Retour aux cours</span>
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <WifiOff className="h-4 w-4" />
                  <span>Mode hors connexion</span>
                </button>
              </div>
            </div>
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

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBack }) => {
  const [course, setCourse] = useState<CourseModule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoSection | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [expandedChapitres, setExpandedChapitres] = useState<Set<string>>(new Set());

  // Sécurité : Désactiver les outils de développement et les actions de téléchargement
  useEffect(() => {
    // Désactiver F12, Ctrl+Shift+I, Ctrl+U, etc.
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+Shift+I (Outils de développement)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+U (Code source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+Shift+C (Inspecteur)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+S (Sauvegarder)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+A (Sélectionner tout)
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+P (Imprimer)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Désactiver le clic droit
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Désactiver la sélection de texte
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Désactiver le glisser-déposer
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Désactiver l'impression
    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Ajouter les écouteurs d'événements
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('dragstart', handleDragStart, true);
    window.addEventListener('beforeprint', handleBeforePrint, true);

    // Désactiver la console
    const originalConsole = window.console;
    window.console = {
      ...originalConsole,
      log: () => {},
      warn: () => {},
      error: () => {},
      info: () => {},
      debug: () => {},
      trace: () => {},
      dir: () => {},
      dirxml: () => {},
      table: () => {},
      group: () => {},
      groupCollapsed: () => {},
      groupEnd: () => {},
      clear: () => {},
      count: () => {},
      countReset: () => {},
      time: () => {},
      timeEnd: () => {},
      timeLog: () => {},
      assert: () => {},
      profile: () => {},
      profileEnd: () => {},
    };

    // Détection des outils de développement
    let devtools = {
      open: false,
      orientation: null
    };

    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          // Rediriger ou masquer le contenu si les outils de développement sont ouverts
          document.body.style.display = 'none';
          alert('Les outils de développement ne sont pas autorisés sur cette page.');
          window.location.href = '/';
        }
      } else {
        devtools.open = false;
        document.body.style.display = 'block';
      }
    }, 500);

    // Nettoyage
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      window.removeEventListener('beforeprint', handleBeforePrint, true);
      window.console = originalConsole;
    };
  }, []);

  const handleError = useCallback((error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/login';
          break;
        case 403:
          setError("Votre abonnement n'est plus valide. Veuillez vous réabonner pour accéder aux vidéos.");
          break;
        default:
          setError("Erreur lors de la récupération du cours. Veuillez réessayer.");
      }
    } else {
      setError("Une erreur s'est produite. Veuillez vérifier votre connexion.");
    }
  }, []);

  const fetchCourseDetails = useCallback(async () => {
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

      // Récupérer les détails du cours
      const response = await UserService.getModuleVideosData(courseId);
      const fetchedData = response.data || [];
      
      // Prendre le premier module (selon la structure JSON fournie)
      if (fetchedData.length > 0) {
        const courseData = fetchedData[0];
        setCourse(courseData);
        
        // Ouvrir automatiquement le premier chapitre
        if (courseData.chapitres && courseData.chapitres.length > 0) {
          const firstChapitreKey = `chapitre-0`;
          setExpandedChapitres(new Set([firstChapitreKey]));
          setActiveSection(0);
          
          // Sélectionner automatiquement la première vidéo du premier chapitre
          if (courseData.chapitres[0].sections && courseData.chapitres[0].sections.length > 0) {
            const firstVideo = courseData.chapitres[0].sections[0];
            setSelectedVideo(firstVideo);
            await loadVideo(firstVideo.idSection);
          }
        }
      } else {
        setError('Aucun contenu trouvé pour ce cours');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [courseId, handleError]);

  const loadVideo = async (videoId: string): Promise<void> => {
    try {
      setVideoLoading(true);
      setVideoError(null);
      
      const videoUrl = await UserService.getVideoStream(videoId);
      if (videoUrl) {
        setCurrentVideoUrl(videoUrl);
      } else {
        setVideoError("Impossible de charger la vidéo");
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la vidéo:', error);
      setVideoError("Erreur lors du chargement de la vidéo");
    } finally {
      setVideoLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, fetchCourseDetails]);

  const handleVideoClick = async (video: VideoSection): Promise<void> => {
    setSelectedVideo(video);
    await loadVideo(video.idSection);
  };

  const toggleChapitre = (chapitreIndex: number): void => {
    const chapitreKey = `chapitre-${chapitreIndex}`;
    const newExpanded = new Set(expandedChapitres);
    
    if (newExpanded.has(chapitreKey)) {
      newExpanded.delete(chapitreKey);
    } else {
      newExpanded.add(chapitreKey);
    }
    
    setExpandedChapitres(newExpanded);
    setActiveSection(chapitreIndex);
  };

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
    { icon: User, label: 'Mon profil', active: false, onClick: () => window.location.href = '/profile' },
    { icon: BookOpen, label: 'Mes cours', active: true, onClick: onBack },
    { icon: CreditCard, label: 'Abonnements', active: false, onClick: () => window.location.href = '/subscription' },
    { icon: LogOut, label: 'Déconnexion', active: false, onClick: handleLogout }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-guinea-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement du cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorPageWithMenu error={error} onBack={onBack} onLogout={handleLogout} />;
  }

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
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
                style={{ 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  pointerEvents: 'none'
                }}
              />              
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden md:inline">Retour aux cours</span>
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <WifiOff className="h-4 w-4" />
              <span className="hidden md:inline">Mode hors connexion</span>
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <span className="text-gray-800 text-sm hidden lg:block">{course?.title}</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Taille adaptée */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-56 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
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
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <ChevronRight className="h-3 w-3 ml-auto" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="grid lg:grid-cols-3 gap-0 h-full">
            {/* Video Player Section - Sécurisé */}
            <div className="lg:col-span-2 bg-black flex flex-col">
              {/* Video Player - Protégé contre le téléchargement */}
              <div className="flex-1 relative bg-black min-h-[50vh] lg:min-h-[70vh] rounded-lg overflow-hidden">
                {videoLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-center">
                      <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                      <p className="text-white">Chargement de la vidéo...</p>
                    </div>
                  </div>
                ) : videoError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-center text-white">
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
                        <p className="text-red-300 mb-4">⚠️ {videoError}</p>
                        <button
                          onClick={() => selectedVideo && loadVideo(selectedVideo.idSection)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Réessayer
                        </button>
                      </div>
                    </div>
                  </div>
                ) : currentVideoUrl ? (
                  <div className="relative w-full h-full">
                    {/* Overlay de protection invisible */}
                    <div 
                      className="absolute inset-0 z-10 bg-transparent"
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        pointerEvents: 'none'
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    
                    <video
                      src={currentVideoUrl}
                      className="w-full h-full object-contain"
                      controls
                      controlsList="nodownload nofullscreen noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        aspectRatio: '16/9',
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onSelectStart={(e) => e.preventDefault()}
                      // Désactiver les raccourcis clavier du lecteur vidéo
                      onKeyDown={(e) => {
                        // Autoriser seulement les contrôles de base
                        const allowedKeys = ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
                        if (!allowedKeys.includes(e.code)) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                    
                    {/* Watermark de protection */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-2 pointer-events-none">
                      <Shield className="h-4 w-4" />
                      <span>EDU NUM - Contenu protégé</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Sélectionnez une vidéo pour commencer</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info - Sans boutons télécharger/partager */}
              {selectedVideo && (
                <motion.div 
                  className="bg-white border-t border-gray-200 p-4 lg:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                  }}
                >
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{course?.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">Contenu protégé</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Course Content Sidebar */}
            <div className="bg-white border-l border-gray-200 flex flex-col max-h-screen">
              {/* Course Header */}
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base lg:text-lg font-bold text-gray-900 flex items-center">
                    <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                    Contenu du cours
                  </h2>
                  <button
                    onClick={onBack}
                    className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{course?.title}</h3>
                
                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progression</span>
                    <span className="text-blue-600 font-medium">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <motion.div 
                className="course-content flex-1 overflow-y-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ 
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                <motion.div variants={itemVariants}>
                  <div className="custom-accordion p-3 lg:p-4 space-y-2">
                    {course?.chapitres && course.chapitres.length > 0 ? (
                      course.chapitres.map((chapitre, chapitreIndex) => (
                        <div key={chapitreIndex} className="accordion-item border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleChapitre(chapitreIndex)}
                            className="accordion-header w-full flex items-center justify-between p-3 lg:p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                                <span className="text-blue-600 text-xs lg:text-sm font-bold">{chapitreIndex + 1}</span>
                              </div>
                              <div>
                                <h4 className="text-gray-900 font-medium text-sm lg:text-base">{chapitre.title}</h4>
                                <p className="text-gray-500 text-xs">{chapitre.sections?.length || 0} vidéo(s)</p>
                              </div>
                            </div>
                            {expandedChapitres.has(`chapitre-${chapitreIndex}`) ? (
                              <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {expandedChapitres.has(`chapitre-${chapitreIndex}`) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-gray-200"
                              >
                                <ul className="video-list">
                                  {chapitre.sections?.map((section, sectionIndex) => {
                                    const isItemSelected = selectedVideo?.idSection === section.idSection;
                                    
                                    return (
                                      <li key={section.idSection} className="video-item-wrapper">
                                        <motion.div
                                          className={`video-item flex items-center space-x-3 p-3 lg:p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer ${
                                            isItemSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                                          }`}
                                          onClick={() => handleVideoClick(section)}
                                          whileHover={{ x: 5 }}
                                          transition={{ duration: 0.2 }}
                                          style={{ 
                                            userSelect: 'none',
                                            WebkitUserSelect: 'none'
                                          }}
                                        >
                                          <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                            {isItemSelected ? (
                                              <PauseCircle className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                                            ) : (
                                              <Play className="h-3 w-3 lg:h-4 lg:w-4 text-gray-500 video-icon" />
                                            )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <span className={`video-title text-xs lg:text-sm font-medium truncate block ${
                                              isItemSelected ? 'text-blue-600' : 'text-gray-900'
                                            }`}>
                                              {section.title}
                                            </span>
                                            <span className="video-duration text-gray-500 text-xs">{section.duration}</span>
                                          </div>
                                        </motion.div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))
                    ) : (
                      <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">Aucun contenu disponible</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
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

export default CourseDetailPage;