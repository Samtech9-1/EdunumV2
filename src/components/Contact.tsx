import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare } from 'lucide-react';
import Header from './Header';

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

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Use Header component */}
      <Header />

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

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left side - Contact Info */}
              <div className="p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-neutral-600 text-center mb-8">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <User className="h-5 w-5" />
                        Prénom <span className="text-guinea-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                        placeholder="Votre prénom"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <User className="h-5 w-5" />
                        Nom <span className="text-guinea-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <Mail className="h-5 w-5" />
                        Email <span className="text-guinea-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <Phone className="h-5 w-5" />
                        Téléphone <span className="text-guinea-red">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                        placeholder="+224 XXX XXX XXX"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <MessageSquare className="h-5 w-5" />
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none"
                        placeholder="Votre message..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
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
                          <span>Envoyer le message</span>
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
              {/* Right side - Contact Form */}
              <div className="bg-gradient-guinea p-8 lg:p-12 text-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-10 right-10 opacity-20">
                  <div className="w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>
                <div className="absolute bottom-10 left-10 opacity-10">
                  <div className="w-24 h-24 bg-white rounded-full blur-xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Contactez-nous
                  </h1>

                  {/* Contact Information */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Téléphone</p>
                        <p className="text-white font-semibold text-lg">+224 623 567 890</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Email</p>
                        <p className="text-white font-semibold text-lg">info@edunum.gn</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;