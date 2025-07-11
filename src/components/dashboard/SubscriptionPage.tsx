import React, { useState, useEffect, useCallback } from 'react';
import { UserService } from '../../services/UserService';
import { 
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Calendar,
  Crown,
  Star,
  Zap,
  ChevronDown,
  RefreshCw,
  Plus
} from 'lucide-react';

interface SubscriptionPageProps {
  onBack: () => void;
}

interface Profile {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  etablissement: string;
  genre: string;
  gradeId: string;
  grade: string;
  villeId: string;
  ville: string;
  regionId: string;
  region: string;
}

interface UserAbonnement {
  nom: string;
  startDate: string;
  endDate: string;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onBack }) => {
  const [profile, setProfile] = useState<Profile>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    etablissement: '',
    genre: '',
    gradeId: '',
    grade: '',
    villeId: '',
    ville: '',
    regionId: '',
    region: ''
  });
  
  const [userAbonnement, setUserAbonnement] = useState<UserAbonnement>({
    nom: '',
    startDate: '',
    endDate: ''
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nombreMois, setNombreMois] = useState<number>(1);
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);

  const handleError = useCallback((error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/login';
          break;
        case 403:
          setError("Vous n'avez pas les permissions nécessaires pour effectuer cette action.");
          break;
        default:
          setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } else {
      setError("Une erreur s'est produite. Veuillez vérifier votre connexion.");
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const isTokenValid = UserService.isTokenValid();
      if (!isTokenValid) {
        window.location.href = '/login';
        return;
      }

      const currentUserProfileId = UserService.getUserId();
      if (!currentUserProfileId) {
        setError('Utilisateur non trouvé');
        return;
      }

      // Récupérer le profil utilisateur
      const profileResponse = await UserService.getUserById(currentUserProfileId);
      const fetchedProfile = profileResponse.data.data || {};
      
      setProfile({
        nom: fetchedProfile.nom || '',
        prenom: fetchedProfile.prenom || '',
        email: fetchedProfile.email || '',
        telephone: fetchedProfile.telephone || '',
        etablissement: fetchedProfile.etablissement || '',
        genre: fetchedProfile.genre || '',
        gradeId: fetchedProfile.gradeId || '',
        grade: fetchedProfile.grade || '',
        villeId: fetchedProfile.villeId || '',
        ville: fetchedProfile.ville || '',
        regionId: fetchedProfile.regionId || '',
        region: fetchedProfile.region || ''
      });

      // Vérifier si l'utilisateur a un grade
      if (!fetchedProfile.gradeId) {
        setError('Vous devez renseigner votre niveau dans votre profil avant de pouvoir souscrire à un abonnement.');
        return;
      }

      // Récupérer les données d'abonnement
      try {
        const subscriptionResponse = await UserService.getStudentSubscriptionData();
        const subscriptionData = subscriptionResponse?.data;

        if (subscriptionData && subscriptionData.nom) {
          setUserAbonnement({
            nom: subscriptionData.nom || '',
            startDate: subscriptionData.startDate || '',
            endDate: subscriptionData.endDate || ''
          });
        }
      } catch (subscriptionError) {
        // Si pas d'abonnement, ce n'est pas une erreur
        console.log('Aucun abonnement actif trouvé');
      }

      setError(null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = async (): Promise<void> => {
    try {
      await UserService.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      window.location.href = '/';
    }
  };

  const abonnementMensuel = async (): Promise<void> => {
    try {
      setSubscribing(true);
      const isTokenValid = UserService.isTokenValid();
      if (!isTokenValid) {
        window.location.href = '/login';
        return;
      }

      const studentData = {
        GradeLevelId: profile.gradeId,
        SubscriptionType: 2, // 2 pour abonnement mensuel
        NumberOfMonths: nombreMois
      };

      const res = await UserService.StudentSubscription(studentData);
      if (res.status !== 204) {
        throw new Error("Échec de la souscription");
      }

      setSubscriptionSuccess(true);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Erreur lors de la souscription :", error);
      setError("Erreur lors de la souscription. Veuillez réessayer.");
    } finally {
      setSubscribing(false);
    }
  };

  const abonnementScolaire = async (): Promise<void> => {
    try {
      setSubscribing(true);
      const isTokenValid = UserService.isTokenValid();
      if (!isTokenValid) {
        window.location.href = '/login';
        return;
      }

      const studentData = {
        GradeLevelId: profile.gradeId,
        SubscriptionType: 1, // 1 pour abonnement scolaire
        NumberOfMonths: null
      };

      const res = await UserService.StudentSubscription(studentData);
      if (!res || !res.status || res.status !== 204) {
        throw new Error("Échec de la souscription");
      }

      setSubscriptionSuccess(true);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Erreur lors de la souscription :", error);
      setError("Erreur lors de la souscription. Veuillez réessayer.");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de vos abonnements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-300 mb-4">{error}</p>
            {error.includes("niveau") && (
              <button
                onClick={() => window.location.href = '/profile'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Compléter mon profil
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const hasActiveSubscription = userAbonnement.nom && userAbonnement.startDate && userAbonnement.endDate;
  const isMonthlySubscription = userAbonnement.nom.toLowerCase().includes('mensuel');

  return (
    <div className="p-6">
      {/* Success Overlay */}
      {subscriptionSuccess && (
        <div className="overlay">
          <div className="modal">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Souscription réussie!</h3>
            <p className="text-gray-600">Votre abonnement a été activé avec succès.</p>
          </div>
        </div>
      )}

          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Abonnements</h1>
              <p className="text-gray-600">Gérez vos abonnements et accédez à nos formations</p>
            </div>

            {hasActiveSubscription ? (
              /* Affichage de l'abonnement actuel */
              <div className="space-y-8">
                {/* Current Subscription Card */}
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-600/30">
                        <Crown className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Abonnement Actuel</h2>
                        <p className="text-gray-600">Votre abonnement est actif</p>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                      Actif
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600 text-sm">Type d'abonnement</span>
                      </div>
                      <p className="text-gray-900 font-semibold text-lg">{userAbonnement.nom}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-600 text-sm">Date de début</span>
                      </div>
                      <p className="text-gray-900 font-semibold text-lg">{userAbonnement.startDate}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="h-5 w-5 text-red-500" />
                        <span className="text-gray-600 text-sm">Date d'expiration</span>
                      </div>
                      <p className="text-gray-900 font-semibold text-lg">{userAbonnement.endDate}</p>
                    </div>
                  </div>

                  {isMonthlySubscription && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-yellow-600 font-medium">Abonnement mensuel actif</p>
                          <p className="text-gray-600 text-sm">Pensez à renouveler votre abonnement avant l'expiration</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <RefreshCw className="h-5 w-5" />
                      <span>Renouveler l'abonnement</span>
                    </button>
                    <button
                      onClick={onBack}
                      className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Accéder aux cours</span>
                    </button>
                  </div>
                </div>

                {/* Renewal Options */}
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Options de renouvellement</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Monthly Renewal */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <Clock className="h-6 w-6 text-yellow-500" />
                        <h4 className="text-lg font-semibold text-gray-900">Renouvellement mensuel</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Prolongez votre abonnement pour plusieurs mois</p>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de mois</label>
                        <div className="relative">
                          <select
                            value={nombreMois}
                            onChange={(e) => setNombreMois(Number(e.target.value))}
                            className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                          >
                            {Array.from({ length: 9 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1} mois</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-gray-900">70,000 GNF</div>
                        <div className="text-gray-600">par mois</div>
                      </div>

                      <button
                        onClick={abonnementMensuel}
                        disabled={subscribing}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {subscribing ? 'Souscription...' : 'Renouveler'}
                      </button>
                    </div>

                    {/* Yearly Renewal */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Renouvellement scolaire</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Abonnement annuel avec 10% de réduction</p>

                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-gray-900">800,000 GNF</div>
                        <div className="text-green-600 font-semibold">Économisez 10%</div>
                        <div className="text-gray-400 line-through text-sm">888,000 GNF</div>
                      </div>

                      <button
                        onClick={abonnementScolaire}
                        disabled={subscribing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {subscribing ? 'Souscription...' : 'Renouveler'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Affichage des options de souscription */
              <div className="space-y-8">
                {/* No Subscription Message */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-200">
                    <Plus className="h-10 w-10 text-yellow-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun abonnement actif</h2>
                  <p className="text-gray-600 mb-6">
                    Souscrivez à un abonnement pour accéder à tous nos cours et ressources pédagogiques
                  </p>
                </div>

                {/* Subscription Options */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Monthly Subscription */}
                  <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-200">
                        <Clock className="h-8 w-8 text-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Abonnement mensuel</h3>
                      <p className="text-gray-600">
                        Flexibilité maximale avec paiement mensuel. Choisissez le nombre de mois qui vous convient.
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de mois</label>
                      <div className="relative">
                        <select
                          value={nombreMois}
                          onChange={(e) => setNombreMois(Number(e.target.value))}
                          className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                        >
                          {Array.from({ length: 9 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} mois</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900">70,000 GNF</div>
                      <div className="text-gray-600">par mois</div>
                    </div>

                    <button
                      onClick={abonnementMensuel}
                      disabled={subscribing}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {subscribing ? 'Souscription...' : 'Souscrire'}
                    </button>
                  </div>

                  {/* Yearly Subscription */}
                  <div className="bg-white rounded-xl p-8 border-2 border-blue-200 relative">
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      POPULAIRE
                    </div>

                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                        <Shield className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Abonnement Scolaire</h3>
                      <p className="text-gray-600">
                        Abonnement annuel avec 10% de réduction. Idéal pour une année scolaire complète.
                      </p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900">800,000 GNF</div>
                      <div className="text-green-600 font-semibold">Économisez 10%</div>
                      <div className="text-gray-400 line-through text-sm">888,000 GNF</div>
                    </div>

                    <button
                      onClick={abonnementScolaire}
                      disabled={subscribing}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {subscribing ? 'Souscription...' : 'Souscrire'}
                    </button>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Avantages inclus</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Accès illimité</h4>
                      <p className="text-gray-600 text-sm">Tous les cours de votre niveau</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Certificats</h4>
                      <p className="text-gray-600 text-sm">Certificats reconnus</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                      <p className="text-gray-600 text-sm">Assistance pédagogique</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
    </div>
  );
};

export default SubscriptionPage;