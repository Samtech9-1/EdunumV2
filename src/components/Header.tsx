import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import logoEduNum from './common/Images/eduNum.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRegisterClick = () => {
    window.location.href = '/register';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  // Navigation function that works on all pages
  const handleNavigation = (target: string) => {
    // If we're on the home page, scroll to section
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home with hash
      window.location.href = `/#${target}`;
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const handleHomeClick = () => {
    window.location.href = '/';
    setIsMenuOpen(false);
  };

  const handleInscriptionClick = () => {
    // If we're on the home page, scroll to section
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const inscriptionSection = document.getElementById('inscription');
      if (inscriptionSection) {
        inscriptionSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home with hash
      window.location.href = '/#inscription';
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-guinea-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="logo-container cursor-pointer" onClick={handleHomeClick}>
            <img 
              src={logoEduNum} 
              alt="EDU NUM Logo" 
              className="logo-image"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleHomeClick}
              className="nav-link-guinea">
             🏠 Accueil
            </button>
            <button 
              onClick={() => handleNavigation('cours')}
              className="nav-link-guinea"
            >
              📖 Cours
            </button>
            <button 
              onClick={() => handleNavigation('abonnements')}
              className="nav-link-guinea"
            >
               💳 Abonnements
            </button>
            <button 
              onClick={() => handleNavigation('instructeurs')}
              className="nav-link-guinea"
            >
              ℹ️ Instructeurs
            </button>
            <button 
              onClick={handleContactClick}
              className="nav-link-guinea"
            >
              📧 Contact
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleInscriptionClick}
              className="flex items-center space-x-2 nav-link-guinea"
            >
              <User className="h-4 w-4" />
              <span>S'inscrire</span>
            </button>
            <button 
              onClick={handleLoginClick}
              className="flex items-center space-x-2 bg-gradient-guinea-green text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <LogIn className="h-4 w-4" />
              <span>Se Connecter</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-guinea-green hover:bg-guinea-green/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-guinea-yellow/20 rounded-b-lg">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={handleHomeClick}
                className="block w-full text-left nav-link-guinea py-2"
              >
                🏠 Accueil
              </button>
              <button 
                onClick={() => handleNavigation('cours')}
                className="block w-full text-left nav-link-guinea py-2"
              >
                📖 Cours
              </button>
              <button 
                onClick={() => handleNavigation('abonnements')}
                className="block w-full text-left nav-link-guinea py-2"
              >
                💳 Abonnements
              </button>
              <button 
                onClick={() => handleNavigation('instructeurs')}
                className="block w-full text-left nav-link-guinea py-2"
              >
                ℹ️ Instructeurs
              </button>
              <button 
                onClick={handleContactClick}
                className="block w-full text-left nav-link-guinea py-2"
              >
                📧 Contact
              </button>
              <div className="pt-4 border-t border-guinea-yellow/20 space-y-2">
                <button 
                  onClick={handleInscriptionClick}
                  className="w-full flex items-center justify-center space-x-2 nav-link-guinea py-2"
                >
                  <User className="h-4 w-4" />
                  <span>S'inscrire</span>
                </button>
                <button 
                  onClick={handleLoginClick}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-guinea-green text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Se Connecter</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;