import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Send } from 'lucide-react';
import Header from '../Header';

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

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {/* Use Header component */}
        <Header />

        {/* Success Content */}
        <div className="flex items-center justify-center p-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-guinea-green/30">
                  <CheckCircle className="h-10 w-10 text-guinea-green" />
                </div>
                
                <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                  Email envoyé !
                </h1>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Nous avons envoyé un lien de réinitialisation à votre adresse email.
                </p>

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
                    className="w-full bg-guinea-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-guinea-green-dark transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Retour à la connexion</span>
                  </button>

                  <button
                    onClick={() => setIsEmailSent(false)}
                    className="w-full text-guinea-green py-2 px-6 rounded-xl font-medium hover:bg-guinea-green/10 transition-colors"
                  >
                    Renvoyer l'email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Use Header component */}
      <Header />

      {/* Main Content */}
      <div className="flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            {/* Header */}
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Mot de passe oublié ?</h1>
              <div className="flex items-center justify-center space-x-2 text-neutral-600 mb-8">
                <span>Vous vous souvenez de votre mot de passe?</span>
                <button
                  onClick={handleBackToLogin}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors underline"
                >
                  Connectez-vous
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Mail className="h-5 w-5" />
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Entrez votre adresse email"
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
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
                  className="w-full bg-guinea-green text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-guinea-green-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
                <h3 className="font-semibold text-neutral-800 mb-2">Comment ça marche ?</h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-start space-x-2">
                    <span className="text-guinea-green font-bold">1.</span>
                    <span>Entrez votre email</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-guinea-green font-bold">2.</span>
                    <span>Recevez le lien par email</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-guinea-green font-bold">3.</span>
                    <span>Créez un nouveau mot de passe</span>
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