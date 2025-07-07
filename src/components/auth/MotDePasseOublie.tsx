import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Send } from 'lucide-react';
import logoEduNum from '../common/Images/eduNum.png';

const MotDePasseOublie = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll always show success
      setIsEmailSent(true);
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-guinea flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-guinea-green p-8 text-center">
              <button 
                onClick={handleHomeClick}
                className="inline-flex items-center space-x-3 mb-6 text-white/80 hover:text-white transition-colors"
              >
                <img 
                  src={logoEduNum} 
                  alt="EDU NUM Logo" 
                  className="h-10 w-auto"
                />
              </button>

              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-4">
                Email envoyé !
              </h1>
              <p className="text-white/90 leading-relaxed">
                Nous avons envoyé un lien de réinitialisation à votre adresse email.
              </p>
            </div>

            <div className="p-8 text-center">
              <div className="bg-guinea-green/10 border border-guinea-green/20 rounded-lg p-4 mb-6">
                <p className="text-guinea-green text-sm">
                  <strong>Email envoyé à :</strong><br />
                  {email}
                </p>
              </div>

              <div className="space-y-4 text-sm text-neutral-600 mb-8">
                <p>• Vérifiez votre boîte de réception</p>
                <p>• Consultez également vos spams</p>
                <p>• Le lien expire dans 24 heures</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-gradient-guinea-green text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Retour à la connexion</span>
                </button>

                <button
                  onClick={() => setIsEmailSent(false)}
                  className="w-full text-guinea-green py-2 px-6 rounded-lg font-medium hover:bg-guinea-green/10 transition-colors"
                >
                  Renvoyer l'email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-guinea flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left side - Reset Form */}
            <div className="p-8 lg:p-12">
              {/* Header */}
              <div className="mb-8">
                <button 
                  onClick={handleHomeClick}
                  className="inline-flex items-center space-x-3 mb-6 text-neutral-600 hover:text-guinea-green transition-colors"
                >
                  <img 
                    src={logoEduNum}
                    alt="EDU NUM Logo" 
                    className="h-10 w-auto"
                  />                 
                </button>

                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                  Mot de passe oublié ?
                </h1>
                <p className="text-neutral-600 leading-relaxed">
                  Pas de problème ! Entrez votre adresse email et nous vous 
                  enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="form-label-guinea">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Entrez votre adresse email"
                      className="form-input-guinea pl-10"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-guinea-red/10 border border-guinea-red/20 rounded-lg p-3 flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-guinea-red flex-shrink-0" />
                    <p className="text-guinea-red text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-guinea-green text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner h-5 w-5 border-white"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Envoyer le lien</span>
                    </>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
                <button
                  onClick={handleBackToLogin}
                  className="inline-flex items-center space-x-2 text-guinea-green hover:text-guinea-green-light font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retour à la connexion</span>
                </button>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="bg-gradient-guinea p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/30">
                  <Mail className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Récupération sécurisée</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Nous prenons la sécurité de votre compte au sérieux. 
                  Le processus de récupération est simple et sécurisé.
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h3 className="font-semibold text-lg mb-4">Comment ça marche ?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-guinea-green text-sm font-bold">1</span>
                      </div>
                      <span className="text-white/90 text-sm">Entrez votre email</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-guinea-green text-sm font-bold">2</span>
                      </div>
                      <span className="text-white/90 text-sm">Recevez le lien par email</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-guinea-green text-sm font-bold">3</span>
                      </div>
                      <span className="text-white/90 text-sm">Créez un nouveau mot de passe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotDePasseOublie;