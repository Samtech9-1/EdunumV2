import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserService } from '../../services/UserService';
import DashboardLayout from './DashboardLayout';
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

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBack }) => {
  const [course, setCourse] = useState<CourseModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoSection | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleViewChange = (view: string) => {
    if (view === 'dashboard') {
      onBack();
    }
  };

  const loadCourseDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await UserService.getModuleVideosData(courseId);
      
      if (data && data.length > 0) {
        // Transform the data to match our expected structure
        const transformedCourse: CourseModule = {
          title: `Cours ${courseId}`,
          chapitres: data.map((item: any, index: number) => ({
            title: `Chapitre ${index + 1}`,
            sections: [{
              idSection: item.id || `section-${index}`,
              duration: item.duration || "00:00",
              title: item.title || `Vidéo ${index + 1}`,
              videoPath: item.videoPath || item.url || ""
            }]
          }))
        };
        
        setCourse(transformedCourse);
        
        // Auto-select first video if available
        if (transformedCourse.chapitres.length > 0 && transformedCourse.chapitres[0].sections.length > 0) {
          setSelectedVideo(transformedCourse.chapitres[0].sections[0]);
          setExpandedChapters(new Set([transformedCourse.chapitres[0].title]));
        }
      } else {
        setError("Aucun contenu disponible pour ce cours");
      }
    } catch (err) {
      console.error('Error loading course details:', err);
      setError("Erreur lors du chargement du cours");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadCourseDetails();
  }, [loadCourseDetails]);

  const toggleChapter = (chapterTitle: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterTitle)) {
      newExpanded.delete(chapterTitle);
    } else {
      newExpanded.add(chapterTitle);
    }
    setExpandedChapters(newExpanded);
  };

  const handleVideoSelect = (video: VideoSection) => {
    setSelectedVideo(video);
    setVideoError(false);
    setVideoLoading(true);
    setRetryCount(0);
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoLoading(false);
    setVideoError(true);
  };

  const retryVideo = () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      setVideoError(false);
      setVideoLoading(true);
      
      // Force reload the video
      if (selectedVideo) {
        const video = document.querySelector('video') as HTMLVideoElement;
        if (video) {
          video.load();
        }
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Disable common video download shortcuts
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
      e.key === 'F12'
    ) {
      e.preventDefault();
    }
  };

  if (loading) {
    return (
      <DashboardLayout 
        currentView="course-detail" 
        onViewChange={handleViewChange}
        title="Chargement..."
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Chargement du cours...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout 
        currentView="course-detail" 
        onViewChange={handleViewChange}
        title="Erreur"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <WifiOff className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadCourseDetails}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout 
        currentView="course-detail" 
        onViewChange={handleViewChange}
        title="Cours introuvable"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cours introuvable</h3>
            <p className="text-gray-600 mb-4">Le cours demandé n'existe pas ou n'est plus disponible.</p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retour aux cours
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      currentView="course-detail" 
      onViewChange={handleViewChange}
      title={course.title}
    >
      <div className="flex h-full bg-gray-50" onKeyDown={handleKeyDown} tabIndex={-1}>
        {/* Course Content Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Contenu du cours</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {course.chapitres.map((chapitre, chapterIndex) => (
              <div key={chapterIndex} className="border-b border-gray-100">
                <button
                  onClick={() => toggleChapter(chapitre.title)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900">{chapitre.title}</span>
                  {expandedChapters.has(chapitre.title) ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedChapters.has(chapitre.title) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {chapitre.sections.map((section, sectionIndex) => (
                        <button
                          key={section.idSection}
                          onClick={() => handleVideoSelect(section)}
                          className={`w-full px-6 py-3 text-left hover:bg-blue-50 flex items-center space-x-3 border-l-2 transition-colors ${
                            selectedVideo?.idSection === section.idSection
                              ? 'bg-blue-50 border-blue-600 text-blue-700'
                              : 'border-transparent text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          <Play className="w-4 h-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{section.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs text-gray-500">{section.duration}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player Area */}
        <div className="flex-1 flex flex-col">
          {selectedVideo ? (
            <div className="flex-1 bg-black relative">
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                  <div className="text-center text-white">
                    <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>Chargement de la vidéo...</p>
                  </div>
                </div>
              )}
              
              {videoError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                  <div className="text-center">
                    <WifiOff className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <h3 className="text-lg font-semibold mb-2">Erreur de lecture</h3>
                    <p className="text-gray-300 mb-4">
                      Impossible de charger la vidéo. Vérifiez votre connexion internet.
                    </p>
                    {retryCount < 3 && (
                      <button
                        onClick={retryVideo}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Réessayer ({3 - retryCount} tentatives restantes)
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <video
                    key={selectedVideo.idSection}
                    className="w-full h-full object-contain"
                    controls
                    onLoadStart={() => setVideoLoading(true)}
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    onContextMenu={handleContextMenu}
                    controlsList="nodownload"
                    disablePictureInPicture
                    style={{ outline: 'none' }}
                  >
                    <source src={selectedVideo.videoPath} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                  
                  {/* Security Watermark */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs pointer-events-none">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Contenu protégé
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sélectionnez une vidéo</h3>
                <p className="text-gray-600">Choisissez une vidéo dans le menu de gauche pour commencer</p>
              </div>
            </div>
          )}
          
          {/* Video Info */}
          {selectedVideo && (
            <div className="bg-white border-t border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedVideo.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Durée: {selectedVideo.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Cours: {course.title}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetailPage;