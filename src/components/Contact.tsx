import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare } from 'lucide-react';
import logoEduNum from './common/images/eduNum.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-guinea">
      {/* Success Overlay */}
      {isSubmitted && (
        <div className="overlay">
          <div className="modal">
            <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-guinea-green" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Message envoyé!</h3>
            <p className="text-neutral-600">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left side - Contact Info */}
              <div className="bg-gradient-guinea p-8 lg:p-12 text-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-10 right-10 opacity-20">
                  <div className="w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>
                <div className="absolute bottom-10 left-10 opacity-10">
                  <div className="w-24 h-24 bg-white rounded-full blur-xl"></div>
                </div>

                {/* Header */}
                <div className="relative z-10">
                  <button 
                    onClick={handleHomeClick}
                    className="inline-flex items-center space-x-3 mb-8 text-white/80 hover:text-white transition-colors"
                  >
                    <img 
                      src={logoEduNum} 
                      alt="EDU NUM Logo" 
                      className="h-10 w-auto"
                    />                   
                  </button>

                  <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Registration
                  </h1>

                  {/* Contact Information */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Téléphone</p>
                        <p className="text-white font-semibold text-lg">P: +1 234 567 8901</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Email</p>
                        <p className="text-white font-semibold text-lg">E: info@demolink.org</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Adresse</p>
                        <p className="text-white font-semibold text-lg">Quartier Almamya, Conakry</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <h3 className="font-semibold text-lg mb-4">Horaires d'ouverture</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Lundi - Vendredi</span>
                        <span>8h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samedi</span>
                        <span>9h00 - 15h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimanche</span>
                        <span>Fermé</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Contact Form */}
              <div className="bg-neutral-50 p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                    Contactez-nous
                  </h2>
                  <p className="text-neutral-600 text-center mb-8">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="form-label-guinea">
                        First name <span className="text-guinea-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="form-input-guinea pl-10"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="form-label-guinea">
                        Last name <span className="text-guinea-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="form-input-guinea pl-10"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label-guinea">
                        Email address <span className="text-guinea-red">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input-guinea pl-10"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="form-label-guinea">
                        Phone <span className="text-guinea-red">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input-guinea pl-10"
                          placeholder="+224 XXX XXX XXX"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="form-label-guinea">
                        Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="form-input-guinea pl-10 resize-none"
                          placeholder="Votre message..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-guinea text-white py-4 px-6 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="loading-spinner h-5 w-5 border-white"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Register now!</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Additional Info */}
                  <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
                    <p className="text-sm text-neutral-500">
                      En soumettant ce formulaire, vous acceptez nos conditions d'utilisation.
                    </p>
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

export default Contact;