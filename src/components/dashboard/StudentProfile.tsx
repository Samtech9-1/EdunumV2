import React, { useState, useEffect, useCallback } from 'react';
import { UserService } from '../../services/UserService';
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
  AlertCircle
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement du profil...</p>
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
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profile.prenom.charAt(0)}{profile.nom.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profile.prenom} {profile.nom}
                    </h1>
                    <p className="text-gray-600 mb-1">{profile.email}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium border border-green-200">
                      <School className="h-4 w-4 mr-2" />
                      {profile.grade || 'Niveau non spécifié'}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {!editMode ? (
                    <button 
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
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
                            ? 'bg-green-500 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
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
                        className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-300"
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
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-green-600" />
                  Informations personnelles
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={profile.nom}
                            onChange={(e) => handleInputChange('nom', e.target.value)}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                              formErrors.nom ? 'border-red-500' : 'border-slate-600'
                            }`}
                            placeholder="Votre nom"
                          />
                          {formErrors.nom && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.nom}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.nom || 'Non spécifié'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={profile.prenom}
                            onChange={(e) => handleInputChange('prenom', e.target.value)}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                              formErrors.prenom ? 'border-red-500' : 'border-slate-600'
                            }`}
                            placeholder="Votre prénom"
                          />
                          {formErrors.prenom && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.prenom}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.prenom || 'Non spécifié'}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email <span className="text-red-500">*</span>
                    </label>
                    {editMode ? (
                      <div>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                            formErrors.email ? 'border-red-500' : 'border-slate-600'
                          }`}
                          placeholder="votre@email.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.email || 'Non spécifié'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    {editMode ? (
                      <div>
                        <input
                          type="tel"
                          value={profile.telephone}
                          onChange={(e) => handleInputChange('telephone', e.target.value)}
                          className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                            formErrors.telephone ? 'border-red-500' : 'border-slate-600'
                          }`}
                          placeholder="6XXXXXXXX"
                        />
                        {formErrors.telephone && (
                          <p className="text-red-400 text-sm mt-1">{formErrors.telephone}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.telephone || 'Non spécifié'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Genre <span className="text-red-500">*</span>
                    </label>
                    {editMode ? (
                      <div>
                        <select
                          value={profile.genre}
                          onChange={(e) => handleInputChange('genre', e.target.value)}
                          className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
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
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.genre || 'Non spécifié'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic & Location Information */}
              <div className="space-y-8">
                {/* Academic Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <School className="h-6 w-6 mr-3 text-green-600" />
                    Informations académiques
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Niveau <span className="text-red-500">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <CustomSelect
                            dataUrl={NIVEAUURL}
                            placeholder="Sélectionnez votre niveau"
                            isClearable
                            onChange={(selectedOption) => handleSelectChange('gradeId', selectedOption)}
                            value={profile.grade ? { value: profile.gradeId || profile.grade, label: profile.grade } : null}
                            className="bg-white border-gray-300 text-gray-900"
                          />
                          {formErrors.gradeId && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.gradeId}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.grade || 'Non spécifié'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Établissement <span className="text-red-500">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <input
                            type="text"
                            value={profile.etablissement}
                            onChange={(e) => handleInputChange('etablissement', e.target.value)}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                              formErrors.etablissement ? 'border-red-500' : 'border-slate-600'
                            }`}
                            placeholder="Nom de votre établissement"
                          />
                          {formErrors.etablissement && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.etablissement}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.etablissement || 'Non spécifié'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-green-600" />
                    Localisation
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Région <span className="text-red-500">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <CustomSelect
                            dataUrl={REGIONURL}
                            placeholder="Sélectionnez votre région"
                            isClearable
                            onChange={(selectedOption) => handleSelectChange('regionId', selectedOption)}
                            value={profile.regionId ? { value: profile.regionId, label: profile.region } : null}
                            className="bg-white border-gray-300 text-gray-900"
                          />
                          {formErrors.regionId && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.regionId}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.region || 'Non spécifié'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      {editMode ? (
                        <div>
                          <CustomSelect
                            dataUrl={VILLEURL}
                            placeholder="Sélectionnez votre ville"
                            isClearable
                            onChange={(selectedOption) => handleSelectChange('villeId', selectedOption)}
                            value={profile.villeId ? { value: profile.villeId, label: profile.ville } : null}
                            className="bg-white border-gray-300 text-gray-900"
                          />
                          {formErrors.villeId && (
                            <p className="text-red-400 text-sm mt-1">{formErrors.villeId}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.ville || 'Non spécifié'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default StudentProfile;