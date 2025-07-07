import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare } from 'lucide-react';

const ContactSection = () => {
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
    <section id="contact" className="section-education bg-guinea-green relative overflow-hidden">
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

      <div className="content-section relative z-10">
        <div className="content-grid-2 items-stretch min-h-[600px]">
          {/* Left content - Contact Info */}
          <div className="text-white space-y-8 flex flex-col justify-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Registration
              </h2>
              
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <p className="text-white font-semibold text-lg">P: +1 234 567 8901</p>
                </div>

                <div>
                  <p className="text-white font-semibold text-lg">E: info@demolink.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 flex-1 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-600 mb-2">
                    First name <span className="text-guinea-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-guinea-green/50 focus:border-guinea-green transition-all bg-white placeholder-neutral-400"
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-600 mb-2">
                    Last name <span className="text-guinea-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-guinea-green/50 focus:border-guinea-green transition-all bg-white placeholder-neutral-400"
                    placeholder="Enter your last name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-600 mb-2">
                    Email address <span className="text-guinea-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-guinea-green/50 focus:border-guinea-green transition-all bg-white placeholder-neutral-400"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-600 mb-2">
                    Phone <span className="text-guinea-red">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-guinea-green/50 focus:border-guinea-green transition-all bg-white placeholder-neutral-400"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-guinea-green text-white py-4 px-6 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner h-5 w-5 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Register now!</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;