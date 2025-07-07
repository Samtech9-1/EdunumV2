import React from 'react';
import { Rocket, TrendingUp, Users, Award, BookOpen, Star, Globe, Sparkles, Zap } from 'lucide-react';
import logoEduNum from './common/images/eduNum.png';

const Hero = () => {
  const handleInscriptionClick = () => {
    const inscriptionSection = document.getElementById('inscription');
    if (inscriptionSection) {
      inscriptionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCoursClick = () => {
    const coursSection = document.getElementById('cours');
    if (coursSection) {
      coursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50 to-guinea-green/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div className="absolute top-20 right-20 opacity-10">
          <div className="w-96 h-96 bg-gradient-to-br from-guinea-green to-guinea-yellow rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <div className="w-80 h-80 bg-gradient-to-br from-guinea-red to-guinea-yellow rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <div className="w-[600px] h-[600px] bg-gradient-to-br from-guinea-yellow to-guinea-green rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        {/* Floating icons */}
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-float">
          <BookOpen className="h-24 w-24 text-guinea-green" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-10 animate-bounce-slow">
          <Star className="h-20 w-20 text-guinea-yellow" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-16 w-16 text-guinea-red" />
        </div>
        <div className="absolute top-2/3 right-1/4 opacity-10 animate-bounce-slow" style={{ animationDelay: '2s' }}>
          <Zap className="h-18 w-18 text-guinea-green" />
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-40 left-40 opacity-5 animate-float">
          <div className="w-16 h-16 bg-guinea-green rotate-45 rounded-lg"></div>
        </div>
        <div className="absolute bottom-40 right-40 opacity-5 animate-bounce-slow">
          <div className="w-12 h-12 bg-guinea-yellow rounded-full"></div>
        </div>
        <div className="absolute top-60 right-60 opacity-5 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-8 h-8 bg-guinea-red rotate-12 rounded-sm"></div>
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(4, 120, 87, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative content-section py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="text-neutral-800 space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                {/* <img 
                  src={logoEduNum}
                  alt="EDU NUM Logo" 
                  className="h-12 w-auto"
                /> */}
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-neutral-800">
                Découvrez de nouveaux
                <span className="block text-guinea-green bg-gradient-to-r from-guinea-green to-guinea-green-light bg-clip-text text-transparent">
                  outils d'apprentissage
                </span>
              </h1>
              
              <p className="text-xl text-neutral-600 leading-relaxed">
                <strong className="text-guinea-red">Bien qu'une simple réussite !</strong><br />
                Éducation numérique de qualité pour la Guinée. 
                Apprenez avec nos experts et préparez vos examens avec succès.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleInscriptionClick}
                className="bg-gradient-to-r from-guinea-green to-guinea-green-light text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-guinea-green/25"
              >
                S'inscrire maintenant
              </button>
              <button 
                onClick={handleCoursClick}
                className="border-2 border-guinea-green text-guinea-green px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-guinea-green hover:text-white hover:shadow-lg"
              >
                Voir les cours
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="text-3xl font-bold text-guinea-green">12,000+</div>
                <div className="text-neutral-600">Étudiants</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="text-3xl font-bold text-guinea-yellow">50+</div>
                <div className="text-neutral-600">Cours</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <div className="text-3xl font-bold text-guinea-red">95%</div>
                <div className="text-neutral-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right content - Illustration */}
          <div className="relative animate-slide-in-right">
            <div className="relative z-10">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-guinea-green/10 to-guinea-green/20 p-6 rounded-2xl border border-guinea-green/20 hover:from-guinea-green/20 hover:to-guinea-green/30 transition-all duration-300 transform hover:scale-105">
                    <Users className="h-8 w-8 text-guinea-green mb-4" />
                    <h3 className="text-neutral-800 font-semibold mb-2">Formations de qualité</h3>
                    <p className="text-neutral-600 text-sm">Des cours réalisés par les meilleur(e)s prof de la GUINÉE</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-guinea-yellow/10 to-guinea-yellow/20 p-6 rounded-2xl border border-guinea-yellow/20 hover:from-guinea-yellow/20 hover:to-guinea-yellow/30 transition-all duration-300 transform hover:scale-105">
                    <Award className="h-8 w-8 text-guinea-yellow mb-4" />
                    <h3 className="text-neutral-800 font-semibold mb-2">Accès illimité</h3>
                    <p className="text-neutral-600 text-sm">Un service disponible 24/7* </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-guinea-red/10 to-guinea-red/20 p-6 rounded-2xl border border-guinea-red/20 hover:from-guinea-red/20 hover:to-guinea-red/30 transition-all duration-300 transform hover:scale-105">
                    <TrendingUp className="h-8 w-8 text-guinea-red mb-4" />
                    <h3 className="text-neutral-800 font-semibold mb-2">Progression maitrisée</h3>
                    <p className="text-neutral-600 text-sm">Suivez vos progrès en temps réel</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 p-6 rounded-2xl border border-neutral-200 hover:from-neutral-200 hover:to-neutral-300 transition-all duration-300 transform hover:scale-105">
                    <Rocket className="h-8 w-8 text-neutral-700 mb-4" />
                    <h3 className="text-neutral-800 font-semibold mb-2">Innovation</h3>
                    <p className="text-neutral-600 text-sm">Méthodes d'apprentissage modernes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-guinea-green/30 to-guinea-green/10 rounded-full animate-pulse backdrop-blur-sm border border-guinea-green/20"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-guinea-yellow/30 to-guinea-yellow/10 rounded-full animate-pulse delay-700 backdrop-blur-sm border border-guinea-yellow/20"></div>
            <div className="absolute top-1/2 -right-10 w-16 h-16 bg-gradient-to-br from-guinea-red/30 to-guinea-red/10 rounded-full animate-float backdrop-blur-sm border border-guinea-red/20"></div>
            
            {/* Sparkle effects */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-guinea-green rounded-full animate-ping"></div>
            <div className="absolute bottom-20 right-10 w-2 h-2 bg-guinea-yellow rounded-full animate-ping delay-1000"></div>
            <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-guinea-red rounded-full animate-ping delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;