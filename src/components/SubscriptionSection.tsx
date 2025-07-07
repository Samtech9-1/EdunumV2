import React, { useState } from 'react';
import { Check, X, Star, Crown, Zap, CheckCircle, Shield, Users, BookOpen, Award, Clock, ChevronDown } from 'lucide-react';

const SubscriptionSection = () => {
  const [nombreMois, setNombreMois] = useState(1);

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const abonnementMensuel = () => {
    console.log("Type d'abonnement : Mensuel");
    console.log("Nombre de mois :", nombreMois);
    handleLoginRedirect();
  };

  const abonnementScolaire = () => {
    console.log("Type d'abonnement : Scolaire");
    handleLoginRedirect();
  };

  const plans = [
    {
      title: "Sco",
      price: "50,000",
      originalPrice: "60,000",
      description: "Accès aux cours de base et ressources essentielles pour débuter votre apprentissage.",
      features: [
        { name: "Accès aux cours fondamentaux", available: true },
        { name: "Support communautaire", available: true },
        { name: "Ressources téléchargeables limitées", available: true },
        { name: "Accès aux examens de base", available: true },
        { name: "Support prioritaire", available: false },
        { name: "Contenu premium", available: false },
        { name: "Certificats avancés", available: false },
        { name: "Masterclass exclusives", available: false }
      ],
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: <BookOpen className="h-8 w-8" />,
      popular: false
    },
    {
      title: "Premium",
      price: "100,000",
      originalPrice: "120,000",
      description: "Accès complet à tous les modules de votre niveau avec support prioritaire et contenu exclusif.",
      features: [
        { name: "Accès à tous les cours du niveau", available: true },
        { name: "Support communautaire VIP", available: true },
        { name: "Ressources téléchargeables illimitées", available: true },
        { name: "Accès à tous les examens", available: true },
        { name: "Support prioritaire", available: true },
        { name: "Contenu premium", available: true },
        { name: "Certificats reconnus", available: true },
        { name: "Masterclass exclusives", available: false }
      ],
      color: "bg-gradient-guinea-green",
      icon: <Star className="h-8 w-8" />,
      popular: true
    },
    {
      title: "Pro",
      price: "230,000",
      originalPrice: "280,000",
      description: "Accès illimité à tous les niveaux et modules avec support personnalisé et masterclass exclusives.",
      features: [
        { name: "Accès à tous les niveaux et cours", available: true },
        { name: "Support communautaire VIP", available: true },
        { name: "Ressources téléchargeables illimitées", available: true },
        { name: "Accès à tous les examens", available: true },
        { name: "Support prioritaire 24/7", available: true },
        { name: "Contenu premium + Masterclass", available: true },
        { name: "Certificats premium", available: true },
        { name: "Coaching personnalisé", available: true }
      ],
      color: "bg-gradient-guinea-red",
      icon: <Crown className="h-8 w-8" />,
      popular: false
    }
  ];

  const handleSubscribe = (plan) => {
    console.log('Souscription au plan:', plan.title);
    handleLoginRedirect();
  };

  return (
    <section id="abonnements" className="section-education bg-neutral-50 p-6  border border-neutral-200 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 opacity-5">
          <div className="w-64 h-64 bg-guinea-green rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-5">
          <div className="w-48 h-48 bg-guinea-yellow rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <div className="w-96 h-96 bg-guinea-red rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="content-section relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-neutral-800 mb-6">
            💳 Abonnement
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Sélectionnez l'abonnement qui correspond le mieux à vos besoins d'apprentissage
          </p>
        </div>

        {/* Subscription Cards - Monthly and Yearly */}
        <div className="content-grid-2 mb-16">
          {/* Monthly Subscription */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-guinea-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-guinea-yellow/20">
                <Clock className="h-8 w-8 text-guinea-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Abonnement mensuel</h3>
              <div className="text-neutral-600 leading-relaxed">
  
                Profitez d'un accès flexible et illimité à tous les cours pendant 1 mois. 
                Idéal pour ceux qui souhaitent progresser à leur rythme sans engagement à long terme.

                <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Accès illimité à tous les cours pendant 1 mois</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Paiement mensuel sans engagement </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Choix du nombre de mois selon vos besoins</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Flexibilité totale : stoppez ou renouvelez à tout moment</span>
              </div>
               <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Idéal pour progresser à votre propre rythme</span>
              </div>
            </div>
            </div>

            </div>

            {/* <div className="mb-6">
              <label htmlFor="monthSelect" className="form-label-guinea">
                Nombre de mois
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white text-neutral-800 border border-neutral-300 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-guinea-yellow/50 focus:border-guinea-yellow"
                  id="monthSelect"
                  value={nombreMois}
                  onChange={(e) => setNombreMois(e.target.value)}
                >
                  {Array.from({ length: 9 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} mois</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-guinea-yellow pointer-events-none" />
              </div>
            </div> */}

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-neutral-800 mb-2">70 000 GNF</div>
              <div className="text-neutral-500">par mois</div>
            </div>

            <button 
              onClick={abonnementMensuel}
              className="w-full bg-transparent border-2 border-guinea-yellow text-guinea-yellow py-4 px-6 rounded-lg font-semibold text-lg hover:bg-guinea-yellow hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Souscrire
            </button>
          </div>

          {/* Yearly Subscription */}
          <div className="bg-white border-2 border-guinea-green rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-4 right-4 bg-guinea-green text-white px-3 py-1 rounded-full text-sm font-bold">
              POPULAIRE
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-guinea-green/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-guinea-green/20">
                <Shield className="h-8 w-8 text-guinea-green" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Abonnement Scolaire</h3>
              <p className="text-neutral-600 leading-relaxed">
                 Investissez dans votre avenir avec notre abonnement annuel ! Apprenez sans interruption pendant une année scolaire et réalisez des économies importantes.
              </p>
            </div>
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Accès illimité à tous les cours pendant une année scolaire</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Tarif avantageux par rapport au paiement mensuel </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Une seule facture, un seul paiement pour toute l’année</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Idéal pour une progression continue et structurée</span>
              </div>
               <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-guinea-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-neutral-700 text-lg">Engagement sur le long terme pour de meilleurs résultats</span>
              </div>
            </div>

            <div className="text-center mb-6">             
   
              <div className="text-4xl font-bold text-neutral-800 mb-2">800,000 GNF</div>
              <div className="text-guinea-green font-semibold">Économisez 10%</div>
              <div className="text-neutral-400 line-through text-sm">888,000 GNF</div>
            </div>

            <button 
              onClick={abonnementScolaire}
              className="w-full bg-gradient-guinea-green text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Souscrire
            </button>
          </div>
        </div>

        {/* Detailed Plans */}
        {/* <div className="mb-16">
          <h3 className="text-3xl font-bold text-neutral-800 text-center mb-12">
            Ou choisissez un plan détaillé
          </h3>
          
          <div className="content-grid-3">
            {plans.map((plan, index) => (
              <div 
                key={plan.title} 
                className={`subscription-card ${plan.popular ? 'subscription-card-popular' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-guinea text-white text-center py-2 font-bold">
                    ⭐ PLUS POPULAIRE
                  </div>
                )}

                <div className={`${plan.color} p-6 text-white ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      {plan.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-80 line-through">{plan.originalPrice} GNF</div>
                      <div className="text-3xl font-bold">{plan.price} GNF</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="p-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        {feature.available ? (
                          <Check className="h-5 w-5 text-guinea-green flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-guinea-red flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.available ? 'text-neutral-700' : 'text-neutral-400'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-guinea-green text-white hover:shadow-lg'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    Choisir {plan.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Bottom CTA */}
        <div className="text-center">
          {/* <p className="text-neutral-600 text-lg mb-4">
            Looking for a bigger commitment?{' '}
            <span className="font-semibold text-guinea-yellow cursor-pointer hover:text-guinea-yellow-light transition-colors">
              Let's talk
            </span>{' '}
            and we'll bring something great for you
          </p> */}
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-neutral-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-guinea-green" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-guinea-green" />
              <span>12,000+ étudiants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-guinea-green" />
              <span>Disponible 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;