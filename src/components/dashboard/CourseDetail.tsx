import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle,
  Lock,
  Download,
  Share2
} from 'lucide-react';

const CourseDetail = ({ 
  course, 
  onBack, 
  onVideoSelect, 
  currentVideoUrl, 
  activeSection, 
  setActiveSection 
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = async (video) => {
    setSelectedVideo(video);
    await onVideoSelect(video.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-guinea-green transition-colors mb-4"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Retour aux cours</span>
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-slate-300">{course.description}</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </button>
              <button className="flex items-center space-x-2 bg-guinea-green hover:bg-guinea-green-dark text-white px-4 py-2 rounded-lg transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50">
            {currentVideoUrl ? (
              <video
                src={currentVideoUrl}
                controls
                className="w-full aspect-video"
                poster={course.thumbnail}
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            ) : (
              <div className="aspect-video bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Sélectionnez une vidéo pour commencer</p>
                </div>
              </div>
            )}
          </div>

          {selectedVideo && (
            <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
              <p className="text-slate-300 mb-4">{selectedVideo.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedVideo.duration || '15:30'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Leçon {selectedVideo.order || 1}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Contenu du cours</h3>
            
            {course.sections && course.sections.length > 0 ? (
              <div className="space-y-3">
                {course.sections.map((section, index) => (
                  <div key={section.id || index} className="border border-slate-700/50 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveSection(activeSection === index ? -1 : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-guinea-green/20 rounded-full flex items-center justify-center">
                          <span className="text-guinea-green text-sm font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{section.title || `Section ${index + 1}`}</h4>
                          <p className="text-slate-400 text-sm">{section.videoCount || 1} vidéo(s)</p>
                        </div>
                      </div>
                      <ChevronLeft className={`h-4 w-4 text-slate-400 transition-transform ${
                        activeSection === index ? 'rotate-90' : '-rotate-90'
                      }`} />
                    </button>
                    
                    {activeSection === index && (
                      <div className="border-t border-slate-700/50">
                        {section.videos ? section.videos.map((video, videoIndex) => (
                          <button
                            key={video.id || videoIndex}
                            onClick={() => handleVideoClick(video)}
                            className="w-full flex items-center space-x-3 p-4 text-left hover:bg-slate-700/30 transition-colors border-b border-slate-700/30 last:border-b-0"
                          >
                            <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                              {video.completed ? (
                                <CheckCircle className="h-4 w-4 text-guinea-green" />
                              ) : video.locked ? (
                                <Lock className="h-3 w-3 text-slate-400" />
                              ) : (
                                <Play className="h-3 w-3 text-slate-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className="text-white text-sm font-medium">{video.title}</h5>
                              <p className="text-slate-400 text-xs">{video.duration || '10:00'}</p>
                            </div>
                          </button>
                        )) : (
                          <button
                            onClick={() => handleVideoClick(section)}
                            className="w-full flex items-center space-x-3 p-4 text-left hover:bg-slate-700/30 transition-colors"
                          >
                            <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                              <Play className="h-3 w-3 text-slate-400" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-white text-sm font-medium">{section.title}</h5>
                              <p className="text-slate-400 text-xs">{section.duration || '15:30'}</p>
                            </div>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Aucun contenu disponible pour ce cours</p>
              </div>
            )}
          </div>

          {/* Course Progress */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Progression</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Progression du cours</span>
                <span className="text-guinea-green font-medium">0%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-guinea-green h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-slate-400 text-sm">0 sur {course.sections?.length || 1} sections terminées</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;