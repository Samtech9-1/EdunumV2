import React, { useState } from 'react';
import { UserPlus, Loader as Spinner, CheckCircle, Mail, Phone, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { UserService } from '../../services/UserService';
import { NIVEAUURL } from '../../utils/urls';
import CustomSelect from '../common/CustomSelect';
import logoEduNum from '../common/Images/eduNum.png';

interface FormData {
  nom: string;
  prenom: string;
  grade: { value: string; label: string } | null;
  email: string;
  confirmEmail: string;
  telephone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

interface CreerUnCompteProps {
  isEmbedded?: boolean;
}

const CreerUnCompte: React.FC<CreerUnCompteProps> = ({ isEmbedded = false }) => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    grade: null,
    email: '',
    confirmEmail: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [compteHasError, setCompteHasError] = useState<boolean>(false);
  const [erreurCreationCompte, setErreurCreationCompte] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Validation functions
  const validateField = (name: string, value: string | { value: string; label: string } | null): void => {
    const newErrors = { ...errors };

    switch (name) {
      case 'nom':
        if (!value) {
          newErrors.nom = 'Veuillez renseigner votre Nom';
        } else if ((value as string).length > 20) {
          newErrors.nom = 'Le nom est trop long!';
        } else {
          delete newErrors.nom;
        }
        break;

      case 'prenom':
        if (!value) {
          newErrors.prenom = 'Veuillez renseigner votre Prénom';
        } else if ((value as string).length > 30) {
          newErrors.prenom = 'Le prénom est trop long!';
        } else {
          delete newErrors.prenom;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Veuillez renseigner votre email';
        } else if (!emailRegex.test(value as string)) {
          newErrors.email = 'Le mail n\'est pas valide';
        } else {
          delete newErrors.email;
        }
        break;

      case 'confirmEmail':
        if (!value) {
          newErrors.confirmEmail = 'Veuillez confirmer votre email';
        } else if (value !== formData.email) {
          newErrors.confirmEmail = 'Veuillez saisir la même adresse mail';
        } else {
          delete newErrors.confirmEmail;
        }
        break;

      case 'telephone':
        const phoneRegex = /^6\d{8}$/;
        if (!value) {
          newErrors.telephone = 'Veuillez saisir votre numéro de téléphone';
        } else if (!phoneRegex.test(value as string)) {
          newErrors.telephone = 'Le numéro doit commencer par 6 et contenir 9 chiffres';
        } else {
          delete newErrors.telephone;
        }
        break;

      case 'password':
        const passwordRegex = {
          minLength: /.{8,}/,
          hasNumber: /[0-9]/,
          hasLower: /[a-z]/,
          hasUpper: /[A-Z]/,
          hasSpecial: /[^\w]/
        };

        if (!value) {
          newErrors.password = 'Veuillez créer votre mot de passe';
        } else if (!passwordRegex.minLength.test(value as string)) {
          newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        } else if (!passwordRegex.hasNumber.test(value as string)) {
          newErrors.password = 'Le mot de passe doit contenir au moins un chiffre';
        } else if (!passwordRegex.hasLower.test(value as string)) {
          newErrors.password = 'Le mot de passe doit contenir au moins une lettre minuscule';
        } else if (!passwordRegex.hasUpper.test(value as string)) {
          newErrors.password = 'Le mot de passe doit contenir au moins une lettre majuscule';
        } else if (!passwordRegex.hasSpecial.test(value as string)) {
          newErrors.password = 'Le mot de passe doit contenir au moins un caractère spécial';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleGradeChange = (selectedGrade: { value: string; label: string } | null): void => {
    setFormData(prev => ({ ...prev, grade: selectedGrade }));
    if (selectedGrade) {
      const newErrors = { ...errors };
      delete newErrors.grade;
      setErrors(newErrors);
    }
  };

  const isFormValid = (): boolean => {
    const requiredFields = ['nom', 'prenom', 'email', 'confirmEmail', 'telephone', 'password', 'confirmPassword'];
    const hasAllFields = requiredFields.every(field => formData[field as keyof FormData]) && formData.grade;
    const hasNoErrors = Object.keys(errors).length === 0;
    return hasAllFields && hasNoErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!isFormValid()) return;

    const submitData = {
      ...formData,
      profil: 'Eleve',
      gradeId: formData.grade?.value
    };
    
    // Remove fields that shouldn't be sent to API
    const { grade, confirmEmail, confirmPassword, ...apiData } = submitData;

    setIsSubmitting(true);
    setCompteHasError(false);

    try {
      const response = await UserService.createUser(apiData);

      if (!response.data.success) {
        setCompteHasError(true);
        setErreurCreationCompte(response.data.message);
      } else {
        setShowOverlay(true);
        setTimeout(() => {
          // Navigate to login page
          window.location.href = '/login';
        }, 3000);
      }
    } catch (error: any) {
      setCompteHasError(true);
      setErreurCreationCompte('Une erreur est survenue lors de la création du compte');
      console.error('Erreur création compte:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = (): void => {
    window.location.href = '/login';
  };

  const handleHomeClick = (): void => {
    window.location.href = '/';
  };

  // If embedded, return only the form without the full page layout
  if (isEmbedded) {
    return (
      <div className="w-full">
        {/* Success Overlay */}
        {showOverlay && (
          <div className="overlay">
            <div className="modal">
              <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-guinea-green" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Compte créé avec succès!</h3>
              <p className="text-neutral-600 mb-4">Votre compte a été créé avec succès!</p>
              <p className="text-sm text-neutral-500">Redirection vers la page de connexion...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom et Prénom */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Nom"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-colors ${
                    errors.nom ? 'border-guinea-red' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.nom && <p className="text-guinea-red text-xs mt-1">{errors.nom}</p>}
            </div>

            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  placeholder="Prénom"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-colors ${
                    errors.prenom ? 'border-guinea-red' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.prenom && <p className="text-guinea-red text-xs mt-1">{errors.prenom}</p>}
            </div>
          </div>

          {/* Grade */}
          <div>
            <CustomSelect
              dataUrl={NIVEAUURL}
              placeholder="Sélectionnez votre Niveau"
              isClearable
              onChange={handleGradeChange}
              value={formData.grade}
              className={errors.grade ? 'border-guinea-red' : ''}
            />
            {errors.grade && <p className="text-guinea-red text-xs mt-1">{errors.grade}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                placeholder="Téléphone (ex: 623456789)"
                className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-colors ${
                  errors.telephone ? 'border-guinea-red' : 'border-neutral-300'
                }`}
              />
            </div>
            {errors.telephone && <p className="text-guinea-red text-xs mt-1">{errors.telephone}</p>}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-colors ${
                  errors.email ? 'border-guinea-red' : 'border-neutral-300'
                }`}
              />
            </div>
            {errors.email && <p className="text-guinea-red text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Confirm Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                placeholder="Confirmer Email"
                className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-colors ${
                  errors.confirmEmail ? 'border-guinea-red' : 'border-neutral-300'
                }`}
              />
            </div>
            {errors.confirmEmail && <p className="text-guinea-red text-xs mt-1">{errors.confirmEmail}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Créer un mot de passe"
                className={`w-full pl-3 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-colors ${
                  errors.password ? 'border-guinea-red' : 'border-neutral-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-guinea-red text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmer le mot de passe"
                className={`w-full pl-3 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-guinea-green focus:border-guinea-green transition-colors ${
                  errors.confirmPassword ? 'border-guinea-red' : 'border-neutral-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-guinea-red text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isFormValid() && !isSubmitting
                ? 'bg-gradient-guinea-green text-white hover:shadow-lg transform hover:scale-105'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Spinner className="h-4 w-4 animate-spin" />
                <span>Création en cours...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Créer mon compte</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {compteHasError && (
            <div className="bg-guinea-red/10 border border-guinea-red/20 rounded-lg p-3">
              <p className="text-guinea-red text-sm">{erreurCreationCompte}</p>
            </div>
          )}
        </form>
      </div>
    );
  }

  // Full page layout for standalone registration page
  return (
    <div className="min-h-screen bg-gradient-guinea py-12 px-4">
      {/* Success Overlay */}
      {showOverlay && (
        <div className="overlay">
          <div className="modal">
            <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-guinea-green" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Compte créé avec succès!</h3>
            <p className="text-neutral-600 mb-4">Votre compte a été créé avec succès!</p>
            <p className="text-sm text-neutral-500">Redirection vers la page de connexion...</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left side - Form */}
            <div className="p-8 lg:p-12">
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

                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Création de compte</h1>
                <p className="text-neutral-600">
                  Pour créer votre compte, veuillez renseigner les informations suivantes 
                  puis cliquer sur le bouton "Créer mon compte".
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom et Prénom */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="Nom"
                        className={`form-input-guinea pl-10 ${
                          errors.nom ? 'border-guinea-red' : ''
                        }`}
                      />
                    </div>
                    {errors.nom && <p className="text-guinea-red text-sm mt-1">{errors.nom}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        placeholder="Prénom"
                        className={`form-input-guinea pl-10 ${
                          errors.prenom ? 'border-guinea-red' : ''
                        }`}
                      />
                    </div>
                    {errors.prenom && <p className="text-guinea-red text-sm mt-1">{errors.prenom}</p>}
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <CustomSelect
                    dataUrl={NIVEAUURL}
                    placeholder="Sélectionnez votre Niveau"
                    isClearable
                    onChange={handleGradeChange}
                    value={formData.grade}
                    className={errors.grade ? 'border-guinea-red' : ''}
                  />
                  {errors.grade && <p className="text-guinea-red text-sm mt-1">{errors.grade}</p>}
                </div>

                {/* Téléphone */}
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      placeholder="Téléphone (ex: 623456789)"
                      className={`form-input-guinea pl-10 ${
                        errors.telephone ? 'border-guinea-red' : ''
                      }`}
                    />
                  </div>
                  {errors.telephone && <p className="text-guinea-red text-sm mt-1">{errors.telephone}</p>}
                </div>

                {/* Email */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className={`form-input-guinea pl-10 ${
                        errors.email ? 'border-guinea-red' : ''
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-guinea-red text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Confirm Email */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="email"
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleInputChange}
                      placeholder="Confirmer Email"
                      className={`form-input-guinea pl-10 ${
                        errors.confirmEmail ? 'border-guinea-red' : ''
                      }`}
                    />
                  </div>
                  {errors.confirmEmail && <p className="text-guinea-red text-sm mt-1">{errors.confirmEmail}</p>}
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Créer un mot de passe"
                      className={`form-input-guinea pr-12 ${
                        errors.password ? 'border-guinea-red' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-guinea-red text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirmer le mot de passe"
                      className={`form-input-guinea pr-12 ${
                        errors.confirmPassword ? 'border-guinea-red' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-guinea-red text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isFormValid() && !isSubmitting
                      ? 'bg-gradient-guinea-green text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="h-5 w-5 animate-spin" />
                      <span>Création en cours...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      <span>Créer mon compte</span>
                    </>
                  )}
                </button>

                {/* Error Message */}
                {compteHasError && (
                  <div className="bg-guinea-red/10 border border-guinea-red/20 rounded-lg p-4">
                    <p className="text-guinea-red text-sm">{erreurCreationCompte}</p>
                  </div>
                )}
              </form>

              {/* Back to Login */}
              <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
                <button
                  onClick={handleBackToLogin}
                  className="inline-flex items-center space-x-2 text-guinea-green hover:text-guinea-green-light font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Déjà un compte ? Se connecter</span>
                </button>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="bg-gradient-guinea p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                  <UserPlus className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Rejoignez EDU NUM</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Créez votre compte et accédez à des milliers de cours de qualité 
                  pour développer vos compétences et réussir vos études.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white/90">Accès à tous les cours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white/90">Certificats reconnus</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white/90">Support personnalisé</span>
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

export default CreerUnCompte;