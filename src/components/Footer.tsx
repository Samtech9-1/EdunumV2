import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logoEduNum from './common/Images/eduNum.png';

const Footer = () => {
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="content-section py-12">
        <div className="content-grid-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="logo-container">
              <img 
                src={logoEduNum}
                alt="EDU NUM Logo" 
                className="h-10 w-auto"
              />
              <div className="logo-text text-white">
                <span className="text-guinea-red">EDU</span>
                <span className="text-guinea-green"> NUM</span>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              <strong>Bien qu'une simple réussite !</strong><br />
              Plateforme d'éducation numérique leader en Guinée, offrant des formations 
              de qualité pour préparer les professionnels de demain.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-lg hover:bg-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-lg hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-lg hover:bg-blue-900 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleScrollToSection('accueil')}
                  className="nav-link-guinea text-neutral-300 hover:text-guinea-green"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection('cours')}
                  className="nav-link-guinea text-neutral-300 hover:text-guinea-green"
                >
                  Nos Cours
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection('abonnements')}
                  className="nav-link-guinea text-neutral-300 hover:text-guinea-green"
                >
                  Abonnements
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection('instructeurs')}
                  className="nav-link-guinea text-neutral-300 hover:text-guinea-green"
                >
                  Instructeurs
                </button>
              </li>
              <li>
                <button 
                  onClick={handleContactClick}
                  className="nav-link-guinea text-neutral-300 hover:text-guinea-green"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Formations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-guinea-green transition-colors">Mathématiques</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-guinea-green transition-colors">Physique</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-guinea-green transition-colors">Chimie</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-guinea-green transition-colors">Français</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-guinea-green transition-colors">Anglais</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-guinea-green mt-1" />
                <div>
                  <p className="text-neutral-300">Quartier Almamya</p>
                  <p className="text-neutral-300">Conakry, Guinée</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-guinea-green" />
                <p className="text-neutral-300">+224 623 567 890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-guinea-green" />
                <p className="text-neutral-300">info@edunum.gn</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-l-lg focus:outline-none focus:border-guinea-green"
                />
                <button className="bg-gradient-guinea-green px-4 py-2 rounded-r-lg hover:shadow-lg transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2025 EDU NUM. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-guinea-green text-sm transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-neutral-400 hover:text-guinea-green text-sm transition-colors">
                Conditions d'Utilisation
              </a>
              <a href="#" className="text-neutral-400 hover:text-guinea-green text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;