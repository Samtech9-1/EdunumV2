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
import DashboardLayout from './DashboardLayout';

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
  icon: any;
  label: string;
  active: boolean;
  onClick?: () => void;
}

// Composant d'erreur avec menu
const ErrorPageWithMenu: React.FC<{ error: string; onBack: () => void; onLogout: () => void }> = ({ error, onBack, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Erreur</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Retour aux cours</span>
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <WifiOff className="h-4 w-4" />
              <span>Mode hors connexion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBack }) => {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<VideoSection | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());
  const [videoProgress, setVideoProgress] = useState<{ [key: string]: number }>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchCourseDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await UserService.getModuleVideosData(courseId);
      const courseData = response.data;
      
      if (!courseData || !Array.isArray(courseData) || courseData.length === 0) {
        throw new Error("Aucun contenu disponible pour ce cours");
      }

      // Transform the data to match expected structure
      const transformedCourse = {
        title: `Cours ${courseId}`,
        description: "Cours de formation",
        modules: [{
          title: "Module principal",
          chapitres: [{
            title: "Chapitre 1",
            sections: courseData.map((video, index) => ({
              idSection: video.id || `section-${index}`,
              title: video.title || `Vidéo ${index + 1}`,
              duration: video.duration || "15:00",
              videoPath: video.videoUrl || video.videoPath || ""
            }))
          }]
        }]
      };
      
      setCourse(transformedCourse);
      
      // Définir la première vidéo comme vidéo actuelle
      const firstModule = transformedCourse.modules[0];
      if (firstModule && firstModule.chapitres && firstModule.chapitres.length > 0) {
        const firstChapter = firstModule.chapitres[0];
        if (firstChapter && firstChapter.sections && firstChapter.sections.length > 0) {
          setCurrentVideo(firstChapter.sections[0]);
          setExpandedChapters(new Set([0])); // Expand first chapter
        }
      }
      
    } catch (err) {
      console.error("Erreur lors du chargement du cours:", err);
      setError(err instanceof Error ? err.message : "Erreur lors du chargement du cours");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const handleVideoSelect = useCallback(async (section: VideoSection) => {
    try {
      setIsVideoLoading(true);
      setVideoError(null);
      setCurrentVideo(section);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (err) {
      console.error("Erreur lors du chargement de la vidéo:", err);
      setVideoError("Erreur lors du chargement de la vidéo");
    } finally {
      setIsVideoLoading(false);
    }
  }, []);

  const toggleChapter = useCallback((chapterIndex: number) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterIndex)) {
        newSet.delete(chapterIndex);
      } else {
        newSet.add(chapterIndex);
      }
      return newSet;
    });
  }, []);

  const handleVideoProgress = useCallback((sectionId: string, progress: number) => {
    setVideoProgress(prev => ({
      ...prev,
      [sectionId]: progress
    }));

    // Marquer comme complété si plus de 90% regardé
    if (progress > 0.9) {
      setCompletedSections(prev => new Set([...prev, sectionId]));
    }
  }, []);

  const handleLogout = useCallback(() => {
    UserService.logout();
    window.location.href = '/';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement du cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorPageWithMenu error={error} onBack={onBack} onLogout={handleLogout} />;
  }

  if (!course) {
    return <ErrorPageWithMenu error="Cours non trouvé" onBack={onBack} onLogout={handleLogout} />;
  }

  return (
    <DashboardLayout currentPage="courses">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Retour aux cours</span>
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {currentVideo ? (
                <div className="relative">
                  {isVideoLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <div className="text-center text-white">
                        <Loader className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>Chargement de la vidéo...</p>
                      </div>
                    </div>
                  )}
                  
                  {videoError ? (
                    <div className="aspect-video bg-red-50 flex items-center justify-center">
                      <div className="text-center text-red-600">
                        <X className="h-12 w-12 mx-auto mb-4" />
                        <p>{videoError}</p>
                        <button
                          onClick={() => handleVideoSelect(currentVideo)}
                          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Réessayer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-black relative">
                      <video
                        key={currentVideo.idSection}
                        className="w-full h-full"
                        controls
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        onProgress={(e) => {
                          const video = e.target as HTMLVideoElement;
                          const progress = video.currentTime / video.duration;
                          handleVideoProgress(currentVideo.idSection, progress);
                        }}
                      >
                        <source src={currentVideo.videoPath} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                      
                      {/* Watermark de protection */}
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm pointer-events-none">
                        EDU NUM - Protégé
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PlayCircle className="h-16 w-16 mx-auto mb-4" />
                    <p>Sélectionnez une vidéo pour commencer</p>
                  </div>
                </div>
              )}

              {/* Video Info */}
              {currentVideo && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{currentVideo.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{currentVideo.duration}</span>
                    </div>
                    {completedSections.has(currentVideo.idSection) && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Terminé</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  {videoProgress[currentVideo.idSection] && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progression</span>
                        <span>{Math.round(videoProgress[currentVideo.idSection] * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${videoProgress[currentVideo.idSection] * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Contenu du cours</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {course.modules.map((module: CourseModule, moduleIndex: number) => (
                  <div key={moduleIndex} className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">{module.title}</h4>
                      
                      {module.chapitres.map((chapitre: Chapitre, chapterIndex: number) => {
                        const globalChapterIndex = moduleIndex * 100 + chapterIndex;
                        const isExpanded = expandedChapters.has(globalChapterIndex);
                        
                        return (
                          <div key={chapterIndex} className="mb-3 last:mb-0">
                            <button
                              onClick={() => toggleChapter(globalChapterIndex)}
                              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <span className="font-medium text-gray-800">{chapitre.title}</span>
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 space-y-1">
                                    {chapitre.sections.map((section: VideoSection, sectionIndex: number) => {
                                      const isActive = currentVideo?.idSection === section.idSection;
                                      const isCompleted = completedSections.has(section.idSection);
                                      const progress = videoProgress[section.idSection] || 0;
                                      
                                      return (
                                        <button
                                          key={sectionIndex}
                                          onClick={() => handleVideoSelect(section)}
                                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                                            isActive 
                                              ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                                              : 'hover:bg-gray-50 text-gray-700'
                                          }`}
                                        >
                                          <div className="flex items-center space-x-3">
                                            {isCompleted ? (
                                              <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : isActive ? (
                                              <Play className="h-4 w-4 text-blue-600" />
                                            ) : (
                                              <PlayCircle className="h-4 w-4 text-gray-400" />
                                            )}
                                            <div className="text-left">
                                              <p className="text-sm font-medium">{section.title}</p>
                                              <p className="text-xs text-gray-500">{section.duration}</p>
                                            </div>
                                          </div>
                                          
                                          {progress > 0 && !isCompleted && (
                                            <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                                              <div 
                                                className="h-full bg-blue-600 transition-all duration-300"
                                                style={{ width: `${progress * 100}%` }}
                                              />
                                            </div>
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetailPage;