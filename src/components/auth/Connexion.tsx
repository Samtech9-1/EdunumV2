import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../Header';
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
  const [rememberMe, setRememberMe] = useState<boolean>(false);

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

  const handleForgotPasswordClick = () => {
    window.location.href = '/reset-password';
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Use Header component */}
      <Header />

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

      {/* Main Content */}
      <div className="flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            {/* Header */}
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Connexion</h1>
              <div className="flex items-center justify-center space-x-2 text-neutral-600 mb-8">
                <span>Vous n'avez pas de compte?</span>
                <button
                  onClick={handleCreateAccountClick}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors underline"
                >
                  Créez votre compte
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    <Mail className="h-5 w-5" />
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="Email"
                      value={credentials.Email}
                      onChange={onChange}
                      required
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                      <Lock className="h-5 w-5" />
                      Mot de passe
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPasswordClick}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors underline"
                    >
                      mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="Password"
                      value={credentials.Password}
                      onChange={onChange}
                      required
                      placeholder="mot de passe (min. 8 caractères)"
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all pr-12"
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

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-neutral-900 focus:ring-neutral-900 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                    Se souvenir de moi
                  </label>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-guinea-green text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-guinea-green-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner h-5 w-5 border-white"></div>
                      <span>Connexion...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Connexion</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;