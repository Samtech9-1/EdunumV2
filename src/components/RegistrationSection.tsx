import React from 'react';
import { Mail, Phone, CheckCircle, Rocket, BookOpen, Award, Users, GraduationCap, Star, Clock, UserPlus } from 'lucide-react';
import CreerUnCompte from './auth/CreerUnCompte';

const RegistrationSection = () => {
  return (
    <section id="inscription" className="section-education bg-white relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 opacity-5">
          <Rocket className="h-32 w-32 text-guinea-green animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-5">
          <div className="w-40 h-40 bg-guinea-yellow rounded-full blur-2xl"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5">
          <BookOpen className="h-24 w-24 text-guinea-green animate-bounce" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-5">
          <GraduationCap className="h-20 w-20 text-guinea-yellow" />
        </div>
      </div>

      <div className="content-section relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">
           🧑‍🎓 Créez votre compte gratuitement
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Rejoignez des milliers d’étudiants qui préparent avec succès les examens grâce à nos formations de qualité, accessibles où que vous soyez.
          </p>
        </div>

        <div className="content-grid-2 items-start">
          {/* Left content - Benefits */}
          <div className="text-neutral-800 space-y-8">
            {/* Key Benefits Grid */}
            {/* <div className="grid grid-cols-2 gap-6">
              <div className="bg-guinea-green/10 p-6 rounded-xl border border-guinea-green/20 text-center hover:bg-guinea-green/20 transition-all duration-300">
                <div className="w-12 h-12 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-guinea-green" />
                </div>
                <div className="text-2xl font-bold text-neutral-800 mb-1">12,000+</div>
                <div className="text-neutral-600 text-sm">Étudiants Actifs</div>
              </div>

              <div className="bg-guinea-yellow/10 p-6 rounded-xl border border-guinea-yellow/20 text-center hover:bg-guinea-yellow/20 transition-all duration-300">
                <div className="w-12 h-12 bg-guinea-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-guinea-yellow" />
                </div>
                <div className="text-2xl font-bold text-neutral-800 mb-1">50+</div>
                <div className="text-neutral-600 text-sm">Cours Disponibles</div>
              </div>

              <div className="bg-guinea-red/10 p-6 rounded-xl border border-guinea-red/20 text-center hover:bg-guinea-red/20 transition-all duration-300">
                <div className="w-12 h-12 bg-guinea-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-guinea-red" />
                </div>
                <div className="text-2xl font-bold text-neutral-800 mb-1">4.8/5</div>
                <div className="text-neutral-600 text-sm">Note Moyenne</div>
              </div>

              <div className="bg-neutral-100 p-6 rounded-xl border border-neutral-200 text-center hover:bg-neutral-200 transition-all duration-300">
                <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-neutral-700" />
                </div>
                <div className="text-2xl font-bold text-neutral-800 mb-1">95%</div>
                <div className="text-neutral-600 text-sm">Taux de Réussite</div>
              </div>
            </div> */}

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Création de compte simple et gratuite</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Accès illimité à tous les cours* </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Disponible partout sur le territoire 24/7</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Aucun engagement requis pour commencer</span>
              </div>
               <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Accessible sur tous supports PC, tablette, smartphone</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
              <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2 text-neutral-800">
                <Phone className="h-5 w-5 text-guinea-green" />
                <span>Besoin d'aide ?</span>
              </h3>
              <div className="space-y-3 text-neutral-600">
                <p className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-guinea-green" />
                  <span>+224 623 567 890</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-guinea-green" />
                  <span>info@edunum.gn</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-guinea-green" />
                  <span>Lun-Ven: 8h-18h</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right content - Registration form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
            <div className="bg-gradient-guinea-green p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Créer votre compte</h3>
              <p className="text-white/90">Commencez votre parcours d'apprentissage dès aujourd'hui</p>
            </div>
            
            {/* Embed the existing registration form */}
            <div className="p-8">
              <CreerUnCompte isEmbedded={true} />
            </div>

            {/* Trust indicators */}
            <div className="bg-neutral-50 px-8 py-4 border-t">
              <div className="flex items-center justify-center space-x-6 text-sm text-neutral-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-guinea-green" />
                  <span>Inscription gratuite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-guinea-green" />
                  <span>Données sécurisées</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-guinea-green" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;