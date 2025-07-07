import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';
import logoEduNum from '../common/images/eduNum.png';
import { UserService } from '../../services/UserService';
import { PROFILE } from '../../utils/constants';

interface Credentials {
  Email: string;
  Password: string;
}

interface MonthsMap {
  [key: string]: number;
}

const Connexion: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    Email: '',
    Password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Réinitialiser le message d'erreur quand l'utilisateur commence à taper
    setServerMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await UserService.login(credentials);
      const profil = response.data.profil;
      const token = response.data.data;
      const userId = response.data.userId;

      UserService.saveProfil(profil);
      UserService.saveToken(token);
      UserService.saveUserId(userId);

      switch (profil) {
        case PROFILE.ELEVE:
          await checkStudentProfileAndSubscription(userId);
          break;
        case PROFILE.PROF:
          window.location.href = '/prof';
          break;
        case PROFILE.ADMIN:
          window.location.href = '/admin';
          break;
        default:
          window.location.href = '/';
          break;
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setServerMessage(error.response.data.message || 'Une erreur est survenue.');
      } else {
        setServerMessage('Une erreur est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkStudentProfileAndSubscription = async (userId: string) => {
    try {
      // 1. Vérifier que l'utilisateur a un profil complet
      const profileResponse = await UserService.getUserById(userId);
      const userProfile = profileResponse.data.data || {};

      // Vérifier si l'utilisateur a un niveau (grade) renseigné
      if (!userProfile.gradeId) {
        setServerMessage('Veuillez compléter votre profil en renseignant votre niveau avant d\'accéder aux cours.');
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
        return;
      }

      // 2. Vérifier le statut d'abonnement
      try {
        const subscriptionResponse = await UserService.getStudentSubscriptionData();
        const subscriptionData = subscriptionResponse?.data;

        // Si l'utilisateur a un abonnement actif
        if (subscriptionData && subscriptionData.nom && subscriptionData.endDate) {
          // Vérifier si l'abonnement n'est pas expiré
          const months: MonthsMap = {
            janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
            juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11
          };

          const [dayStr, monthStrRaw, yearStr] = subscriptionData.endDate.split(' ');
          const day = parseInt(dayStr);
          const monthStr = monthStrRaw.toLowerCase();
          const month = months[monthStr];
          const year = parseInt(yearStr);
          const endDate = new Date(year, month, day);
          const currentDate = new Date();

          if (endDate > currentDate) {
            // Abonnement actif - rediriger vers les cours
            setServerMessage('Connexion réussie ! Redirection vers vos cours...');
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1500);
          } else {
            // Abonnement expiré - rediriger vers la page d'abonnement
            setServerMessage('Votre abonnement a expiré. Redirection vers la page d\'abonnement...');
            setTimeout(() => {
              window.location.href = '/subscription';
            }, 2000);
          }
        } else {
          // Pas d'abonnement - rediriger vers la page d'abonnement
          setServerMessage('Aucun abonnement actif. Redirection vers la page d\'abonnement...');
          setTimeout(() => {
            window.location.href = '/subscription';
          }, 2000);
        }
      } catch (subscriptionError) {
        // Erreur lors de la récupération de l'abonnement ou pas d'abonnement
        console.log('Aucun abonnement trouvé ou erreur:', subscriptionError);
        setServerMessage('Aucun abonnement actif. Redirection vers la page d\'abonnement...');
        setTimeout(() => {
          window.location.href = '/subscription';
        }, 2000);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du profil:', error);
      setServerMessage('Erreur lors de la vérification de votre profil. Redirection vers le tableau de bord...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  const handleCreateAccountClick = () => {
    window.location.href = '/register';
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-guinea flex items-center justify-center p-4">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="overlay">
          <div className="modal">
            <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="loading-spinner h-8 w-8 border-guinea-green"></div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Connexion en cours...</h3>
            <p className="text-neutral-600">Veuillez patienter</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left side - Login Form */}
            <div className="bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 p-8 lg:p-12 flex flex-col justify-center">
              {/* Header with Logo */}
              <div className="text-center mb-8">
                <button
                  onClick={handleHomeClick}
                  className="inline-flex items-center space-x-3 mb-6 text-white/80 hover:text-white transition-colors"
                >
                  <img
                    src={logoEduNum}
                    alt="EDU NUM Logo"
                    className="h-12 w-auto"
                  />                  
                </button>

                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                  Bienvenue sur la<br />
                  plateforme EDUNUM
                </h1>

                {/* User Icon */}
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border border-white/30">
                  <User className="h-10 w-10 text-white" />
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="form-label-guinea text-white">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="email"
                      id="email"
                      name="Email"
                      value={credentials.Email}
                      onChange={onChange}
                      required
                      placeholder="Entrez votre email"
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border-0 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-guinea-green focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="form-label-guinea text-white">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="Password"
                      value={credentials.Password}
                      onChange={onChange}
                      required
                      placeholder="Entrez votre mot de passe"
                      className="w-full pl-10 pr-12 py-3 bg-white/90 border-0 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-guinea-green focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {serverMessage && (
                  <div className={`rounded-lg p-3 flex items-center space-x-2 ${serverMessage.includes('réussie') || serverMessage.includes('Redirection vers vos cours')
                    ? 'bg-guinea-green/20 border border-guinea-green/30'
                    : serverMessage.includes('abonnement') || serverMessage.includes('profil')
                      ? 'bg-guinea-yellow/20 border border-guinea-yellow/30'
                      : 'bg-guinea-red/20 border border-guinea-red/30'
                    }`}>
                    {serverMessage.includes('réussie') || serverMessage.includes('Redirection vers vos cours') ? (
                      <CheckCircle className="h-5 w-5 text-guinea-green flex-shrink-0" />
                    ) : serverMessage.includes('abonnement') || serverMessage.includes('profil') ? (
                      <AlertCircle className="h-5 w-5 text-guinea-yellow flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-guinea-red flex-shrink-0" />
                    )}
                    <p className={`text-sm ${serverMessage.includes('réussie') || serverMessage.includes('Redirection vers vos cours')
                      ? 'text-guinea-green'
                      : serverMessage.includes('abonnement') || serverMessage.includes('profil')
                        ? 'text-guinea-yellow'
                        : 'text-guinea-red'
                      }`}>
                      {serverMessage}
                    </p>
                  </div>
                )}

                {/* Forgot Password Link */}
                <div className="text-center">
                  <a
                    href="/reset-password"
                    className="text-white/80 hover:text-white text-sm underline transition-colors"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-neutral-800 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Se Connecter</span>
                </button>
              </form>

              {/* Create Account Link */}
              <div className="mt-8 pt-6 border-t border-white/20 text-center">
                <p className="text-white/80 text-sm mb-3">
                  Première visite ?
                </p>
                <button
                  onClick={handleCreateAccountClick}
                  className="text-white font-medium hover:text-guinea-green transition-colors underline text-lg"
                >
                  Créer un compte
                </button>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="bg-gradient-guinea p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/30">
                  <LogIn className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Connectez-vous</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Accédez à votre espace personnel et continuez votre parcours
                  d'apprentissage avec EDU NUM.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90">Accès à vos cours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90">Suivi de progression</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90">Certificats personnalisés</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90">Support pédagogique</span>
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

export default Connexion;