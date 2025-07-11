import React, { useState, useEffect, useCallback } from 'react';
import { UserService } from '../../services/UserService';
import logoEduNum from '../common/Images/eduNum.png';
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Menu,
  LogOut,
  BookOpen,
  CreditCard,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';
import { VILLEURL, REGIONURL, NIVEAUURL } from '../../utils/urls';
import CustomSelect from '../common/CustomSelect';

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

interface FormErrors {
  [key: string]: string;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick?: () => void;
}

interface StudentProfileProps {
  onBack: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ onBack, setSidebarOpen }) => {
  const initialProfileState: Profile = {
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
  };

  const [profile, setProfile] = useState<Profile>(initialProfileState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [sidebarOpen, setSidebarOpenLocal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

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
          setError("Erreur lors de la sauvegarde du profil. Veuillez réessayer.");
      }
    } else {
      setError("Une erreur s'est produite. Veuillez vérifier votre connexion.");
    }
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
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

      const response = await UserService.getUserById(currentUserProfileId);
      const fetchedProfile = response.data.data || {};
      
      setProfile(prevProfile => ({
        ...prevProfile,
        ...fetchedProfile,
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
      }));

      setCurrentUser(fetchedProfile);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Validation complète avec tous les champs obligatoires
  const validateForm = (values: Profile): FormErrors => {
    const errors: FormErrors = {};

    // Nom - obligatoire
    if (!values.nom || values.nom.trim() === '') {
      errors.nom = 'Le nom est obligatoire';
    } else if (values.nom.length > 20) {
      errors.nom = 'Le nom ne peut pas dépasser 20 caractères';
    }

    // Prénom - obligatoire
    if (!values.prenom || values.prenom.trim() === '') {
      errors.prenom = 'Le prénom est obligatoire';
    } else if (values.prenom.length > 30) {
      errors.prenom = 'Le prénom ne peut pas dépasser 30 caractères';
    }

    // Email - obligatoire
    if (!values.email || values.email.trim() === '') {
      errors.email = 'L\'adresse email est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Veuillez entrer une adresse email valide';
    }

    // Téléphone - obligatoire
    if (!values.telephone || values.telephone.trim() === '') {
      errors.telephone = 'Le numéro de téléphone est obligatoire';
    } else if (!/^6\d{8}$/.test(values.telephone)) {
      errors.telephone = 'Le numéro doit commencer par 6 et contenir exactement 9 chiffres';
    }

    // Établissement - obligatoire
    if (!values.etablissement || values.etablissement.trim() === '') {
      errors.etablissement = 'L\'établissement est obligatoire';
    }

    // Genre - obligatoire
    if (!values.genre || values.genre.trim() === '') {
      errors.genre = 'Le genre est obligatoire';
    } else if (!['Homme', 'Femme'].includes(values.genre)) {
      errors.genre = 'Veuillez sélectionner un genre valide';
    }

    // Niveau/Grade - obligatoire
    if (!values.gradeId || values.gradeId.trim() === '') {
      errors.gradeId = 'Le niveau d\'études est obligatoire';
    }

    // Région - obligatoire
    if (!values.regionId || values.regionId.trim() === '') {
      errors.regionId = 'La région est obligatoire';
    }

    // Ville - obligatoire
    if (!values.villeId || values.villeId.trim() === '') {
      errors.villeId = 'La ville est obligatoire';
    }

    return errors;
  };

  const handleEdit = () => setEditMode(true);
  
  const handleCancel = () => {
    setEditMode(false);
    setSaveSuccess(false);
    setFormErrors({});
    fetchUserProfile(); // Reset to original values
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSelectChange = (field: keyof Profile, selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setProfile(prev => ({ 
        ...prev, 
        [field]: selectedOption.value,
        [field.replace('Id', '')]: selectedOption.label
      }));
      
      // Clear error for this field
      if (formErrors[field]) {
        setFormErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
  };

  const handleSave = async () => {
    try {
      // Validate form
      const errors = validateForm(profile);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setLoading(true);
      setError(null);
      
      const currentUserProfileId = UserService.getUserId();
      const updateData = {
        ...profile,
        Id: currentUserProfileId
      };
      
      const response = await UserService.updateUserData(updateData);
      const updatedProfile = response.data.data || {};
      
      setProfile(prevProfile => ({
        ...prevProfile,
        ...updatedProfile
      }));
      
      setSaveSuccess(true);
      setTimeout(() => {
        setEditMode(false);
        setSaveSuccess(false);
      }, 1500);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await UserService.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      window.location.href = '/';
    }
  };

  const menuItems: MenuItem[] = [
    { icon: User, label: 'Mon profil', active: true, onClick: () => {} },
    { icon: BookOpen, label: 'Mes cours', active: false, onClick: onBack },
    { icon: CreditCard, label: 'Abonnements', active: false, onClick: () => window.location.href = '/subscription' },
    { icon: LogOut, label: 'Déconnexion', active: false, onClick: handleLogout }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-guinea-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpenLocal(!sidebarOpen)}
              className="lg:hidden text-white hover:text-guinea-green transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <img 
                src={logoEduNum}
                alt="EDU NUM Logo" 
                className="h-8 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
   <button
                onClick={onBack}
                className="flex items-center space-x-2 bg-guinea-green hover:bg-guinea-green-dark text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Retour à mes cours</span>
              </button>            

            <button className="text-white hover:text-guinea-green transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-guinea-green transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <span className="text-white text-sm">Mon Profil</span>
            <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick || (() => {})}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.active 
                      ? 'bg-guinea-green/20 text-guinea-green border border-guinea-green/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <ChevronRight className="h-4 w-4 ml-auto" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-guinea-green to-guinea-green-light rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profile.prenom.charAt(0)}{profile.nom.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {profile.prenom} {profile.nom}
                    </h1>
                    <p className="text-slate-300 mb-1">{profile.email}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-guinea-green/20 text-guinea-green rounded-full text-sm font-medium border border-guinea-green/30">
                      <School className="h-4 w-4 mr-2" />
                      {profile.grade || 'Niveau non spécifié'}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {!editMode ? (
                    <button 
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-guinea-green hover:bg-guinea-green-dark text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Edit3 className="h-5 w-5" />
                      <span>Modifier le profil</span>
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleSave}
                        disabled={loading}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                          saveSuccess 
                            ? 'bg-green-600 text-white' 
                            : 'bg-guinea-green hover:bg-guinea-green-dark text-white'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {saveSuccess ? (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            <span>Enregistré</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5" />
                            <span>Enregistrer</span>
                          </>
                        )}
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg transition-all duration-300"
                      >
                        <X className="h-5 w-5" />
                        <span>Annuler</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-guinea-green" />
                  Informations personnelles
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nom <span className="text-guinea-red">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={profile.nom}
                            onChange={(e) => handleInputChange('nom', e.target.value)}
                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-all ${
                              formErrors.nom ? 'border-red-500' : 'border-slate-600'
                            }`}
                            placeholder="Votre nom"
                          />
                          {formErrors.nom && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.nom}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.nom || 'Non spécifié'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Prénom <span className="text-guinea-red">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={profile.prenom}
                            onChange={(e) => handleInputChange('prenom', e.target.value)}
                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-all ${
                              formErrors.prenom ? 'border-red-500' : 'border-slate-600'
                            }`}
                            placeholder="Votre prénom"
                          />
                          {formErrors.prenom && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.prenom}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.prenom || 'Non spécifié'}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email <span className="text-guinea-red">*</span>
                    </label>
                    {editMode ? (
                      <div>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-all ${
                            formErrors.email ? 'border-red-500' : 'border-slate-600'
                          }`}
                          placeholder="votre@email.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.email || 'Non spécifié'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Téléphone <span className="text-guinea-red">*</span>
                    </label>
                    {editMode ? (
                      <div>
                        <input
                          type="tel"
                          value={profile.telephone}
                          onChange={(e) => handleInputChange('telephone', e.target.value)}
                          className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-all ${
                            formErrors.telephone ? 'border-red-500' : 'border-slate-600'
                          }`}
                          placeholder="6XXXXXXXX"
                        />
                        {formErrors.telephone && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.telephone}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.telephone || 'Non spécifié'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Genre <span className="text-guinea-red">*</span>
                    </label>
                    {editMode ? (
                      <div>
                        <select
                          value={profile.genre}
                          onChange={(e) => handleInputChange('genre', e.target.value)}
                          className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-all ${
                            formErrors.genre ? 'border-red-500' : 'border-slate-600'
                          }`}
                        >
                          <option value="">Sélectionnez votre genre</option>
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </select>
                        {formErrors.genre && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.genre}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.genre || 'Non spécifié'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic & Location Information */}
              <div className="space-y-8">
                {/* Academic Information */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <School className="h-6 w-6 mr-3 text-guinea-green" />
                    Informations académiques
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Niveau <span className="text-guinea-red">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <CustomSelect
                            dataUrl={NIVEAUURL}
                            placeholder="Sélectionnez votre niveau"
                            isClearable
                            onChange={(selectedOption) => handleSelectChange('gradeId', selectedOption)}
                            value={profile.grade ? { value: profile.gradeId || profile.grade, label: profile.grade } : null}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                          {formErrors.gradeId && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.gradeId}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.grade || 'Non spécifié'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Établissement <span className="text-guinea-red">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={profile.etablissement}
                            onChange={(e) => handleInputChange('etablissement', e.target.value)}
                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-all ${
                              formErrors.etablissement ? 'border-red-500' : 'border-slate-600'
                            }`}
                            placeholder="Nom de votre établissement"
                          />
                          {formErrors.etablissement && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.etablissement}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.etablissement || 'Non spécifié'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-guinea-green" />
                    Localisation
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Région <span className="text-guinea-red">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <CustomSelect
                            dataUrl={REGIONURL}
                            placeholder="Sélectionnez votre région"
                            isClearable
                            onChange={(selectedOption) => handleSelectChange('regionId', selectedOption)}
                            value={profile.regionId ? { value: profile.regionId, label: profile.region } : null}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                          {formErrors.regionId && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.regionId}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.region || 'Non spécifié'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Ville <span className="text-guinea-red">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <CustomSelect
                            dataUrl={VILLEURL}
                            placeholder="Sélectionnez votre ville"
                            isClearable
                            onChange={(selectedOption) => handleSelectChange('villeId', selectedOption)}
                            value={profile.villeId ? { value: profile.villeId, label: profile.ville } : null}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                          {formErrors.villeId && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.villeId}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-white bg-slate-700/30 px-4 py-3 rounded-lg">{profile.ville || 'Non spécifié'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={() => setSidebarOpenLocal(false)}
        />
      )}
    </div>
  );
};

export default StudentProfile;