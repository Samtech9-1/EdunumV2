import React, { useState, useEffect } from 'react';
import { Play, Lock, CheckCircle, Clock, Users, Star, ChevronDown, ChevronUp, Download, Share2, Bookmark } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  videoUrl?: string;
}

interface Chapitre {
  id: string;
  title: string;
  sections: Section[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  totalStudents: number;
  duration: string;
  chapitres: Chapitre[];
  currentSection?: string;
}

const CourseDetailPage: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [expandedChapitres, setExpandedChapitres] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Données de démonstration
  useEffect(() => {
    const mockCourse: Course = {
      id: '1',
      title: 'Mathématiques Avancées',
      description: 'Cours complet de mathématiques pour le niveau avancé',
      instructor: 'Dr. Marie Dubois',
      rating: 4.8,
      totalStudents: 1250,
      duration: '12h 30min',
      chapitres: [
        {
          id: 'chapitre-1',
          title: 'Introduction aux fonctions',
          sections: [
            {
              id: 'section-1-1',
              title: 'Définition des fonctions',
              duration: '15:30',
              isCompleted: true,
              isLocked: false,
              videoUrl: 'https://example.com/video1'
            },
            {
              id: 'section-1-2',
              title: 'Types de fonctions',
              duration: '20:45',
              isCompleted: false,
              isLocked: false,
              videoUrl: 'https://example.com/video2'
            }
          ]
        },
        {
          id: 'chapitre-2',
          title: 'Dérivées et intégrales',
          sections: [
            {
              id: 'section-2-1',
              title: 'Calcul de dérivées',
              duration: '25:15',
              isCompleted: false,
              isLocked: true
            }
          ]
        }
      ]
    };

    setCourse(mockCourse);
    setCurrentVideo(mockCourse.chapitres[0]?.sections[0]?.videoUrl || '');
    setLoading(false);
  }, []);

  const toggleChapitre = (chapitreId: string) => {
    const newExpanded = new Set(expandedChapitres);
    if (newExpanded.has(chapitreId)) {
      newExpanded.delete(chapitreId);
    } else {
      newExpanded.add(chapitreId);
    }
    setExpandedChapitres(newExpanded);
  };

  const handleSectionClick = (section: Section) => {
    if (!section.isLocked && section.videoUrl) {
      setCurrentVideo(section.videoUrl);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-guinea-green"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cours non trouvé</h2>
          <p className="text-gray-600">Le cours demandé n'existe pas ou n'est plus disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 w-64 h-screen bg-white border-r border-gray-200">
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center mb-8 px-3">
            <img src="/logo.png" alt="EDU NUM" className="h-8 w-auto" />
          </div>

          {/* Navigation */}
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/mes-cours" className="flex items-center p-2 text-guinea-green bg-gray-50 rounded-lg border-r-2 border-guinea-green group">
                <span className="ms-3">Mes cours</span>
              </a>
            </li>
            <li>
              <a href="/profil" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <span className="ms-3">Mon profil</span>
              </a>
            </li>
            <li>
              <a href="/abonnements" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <span className="ms-3">Abonnements</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="EDU NUM" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-guinea-green transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-guinea-green transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-guinea-green transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Video Player */}
          <div className="flex-1 p-6">
            <div className="bg-black rounded-lg aspect-video mb-6 relative overflow-hidden">
              {currentVideo ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg">Lecteur vidéo</p>
                    <p className="text-sm opacity-60">Protection contre le téléchargement activée</p>
                  </div>
                  {/* Watermark */}
                  <div className="absolute top-4 right-4 text-white/50 text-sm font-mono">
                    EDU NUM - Protégé
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Lock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Sélectionnez une vidéo</p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.totalStudents} étudiants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Sidebar */}
          <div className="w-96 bg-white border-l border-gray-200 h-screen overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenu du cours</h3>
              
              <div className="space-y-2">
                {course.chapitres.map((chapitre, chapitreIndex) => (
                  <div key={chapitre.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleChapitre(chapitre.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-guinea-green/10 rounded-full flex items-center justify-center border border-guinea-green/20">
                          <span className="text-guinea-green text-xs lg:text-sm font-bold">{chapitreIndex + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-medium text-sm lg:text-base">{chapitre.title}</h4>
                          <p className="text-gray-500 text-xs">{chapitre.sections?.length || 0} vidéo(s)</p>
                        </div>
                      </div>
                      {expandedChapitres.has(chapitre.id) ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedChapitres.has(chapitre.id) && (
                      <div className="border-t border-gray-200">
                        {chapitre.sections.map((section, sectionIndex) => (
                          <button
                            key={section.id}
                            onClick={() => handleSectionClick(section)}
                            disabled={section.isLocked}
                            className={`w-full flex items-center justify-between p-3 text-left transition-colors ${
                              section.isLocked 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-gray-50 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {section.isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-guinea-green" />
                                ) : section.isLocked ? (
                                  <Lock className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <Play className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {section.title}
                                </p>
                                <p className="text-xs text-gray-500">{section.duration}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;