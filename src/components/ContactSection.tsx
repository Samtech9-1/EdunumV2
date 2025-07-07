import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CheckCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface SujetOption {
  label: string;
  value: string;
}

const sujets: SujetOption[] = [
  { label: 'Problème technique', value: 'Problème technique' },
  { label: 'Demande de devis', value: 'Demande de devis' },
  { label: 'Autre', value: 'Autre' },
];

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de l’envoi
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-education bg-guinea-green relative overflow-hidden">
      {isSubmitted && (
        <div className="overlay">
          <div className="modal">
            <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-guinea-green" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Message envoyé !</h3>
            <p className="text-neutral-600">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      )}

      <div className="content-section relative z-10">
        <div className="content-grid-2 items-stretch min-h-[600px]">
          {/* Infos de contact */}
          <div className="text-white space-y-8 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">📧 Nous contacter</h2>
            <p className="text-white font-semibold text-lg">P: +1 234 567 8901</p>
            <p className="text-white font-semibold text-lg">E: info@demolink.org</p>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 flex-1 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champs texte */}
                {[
                  { id: 'firstName', label: 'Nom', type: 'text', placeholder: 'Saisir le nom' },
                  { id: 'lastName', label: 'Prénom', type: 'text', placeholder: 'Saisir le prénom' },
                  { id: 'email', label: 'E-mail', type: 'email', placeholder: "Saisir l'email" },
                  { id: 'phone', label: 'Téléphone', type: 'tel', placeholder: 'Saisir le numéro de téléphone' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-neutral-600 mb-2">
                      {label} <span className="text-guinea-red">*</span>
                    </label>
                    <input
                      type={type}
                      id={id}
                      name={id}
                      required
                      value={formData[id as keyof FormData]}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-guinea-green/50 focus:border-guinea-green bg-white placeholder-neutral-400"
                    />
                  </div>
                ))}

                {/* Sujet */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-600 mb-2">
                    Sujet <span className="text-guinea-red">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    {sujets.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-600 mb-2">
                    Message <span className="text-guinea-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-white placeholder-neutral-400"
                    placeholder="Saisir votre message"
                  ></textarea>
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-guinea-green text-white py-4 px-6 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner h-5 w-5 border-white" />
                      <span>Envoi...</span>
                    </>
                  ) : (
                    <span>Envoyer</span>
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
