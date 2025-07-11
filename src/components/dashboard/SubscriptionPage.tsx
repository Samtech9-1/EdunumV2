Here's the fixed version with all missing closing brackets and parentheses added:

```javascript
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-guinea-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement de vos abonnements...</p>
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
            <p className="text-red-300 mb-4">{error}</p>
            {error.includes("niveau") && (
              <button
                onClick={() => window.location.href = '/profile'}
                className="bg-guinea-green hover:bg-guinea-green-dark text-white px-6 py-2 rounded-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Success Overlay */}
      {subscriptionSuccess && (
        <div className="overlay">
          <div className="modal">
            <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-guinea-green" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Souscription réussie!</h3>
            <p className="text-neutral-600">Votre abonnement a été activé avec succès.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
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
              <span>Retour à mes cours !</span>
            </button>
            <button className="text-white hover:text-guinea-green transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-guinea-green transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <span className="text-white text-sm">Abonnements</span>
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Mes Abonnements</h1>
              <p className="text-slate-300">Gérez vos abonnements et accédez à nos formations</p>
            </div>

            {hasActiveSubscription ? (
              /* Affichage de l'abonnement actuel */
              <div className="space-y-8">
                {/* Current Subscription Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center border border-guinea-green/30">
                        <Crown className="h-8 w-8 text-guinea-green" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Abonnement Actuel</h2>
                        <p className="text-slate-300">Votre abonnement est actif</p>
                      </div>
                    </div>
                    <div className="bg-guinea-green/20 text-guinea-green px-4 py-2 rounded-full text-sm font-medium border border-guinea-green/30">
                      Actif
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Star className="h-5 w-5 text-guinea-yellow" />
                        <span className="text-slate-300 text-sm">Type d'abonnement</span>
                      </div>
                      <p className="text-white font-semibold text-lg">{userAbonnement.nom}</p>
                    </div>

                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="h-5 w-5 text-guinea-green" />
                        <span className="text-slate-300 text-sm">Date de début</span>
                      </div>
                      <p className="text-white font-semibold text-lg">{userAbonnement.startDate}</p>
                    </div>

                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="h-5 w-5 text-guinea-red" />
                        <span className="text-slate-300 text-sm">Date d'expiration</span>
                      </div>
                      <p className="text-white font-semibold text-lg">{userAbonnement.endDate}</p>
                    </div>
                  </div>

                  {isMonthlySubscription && (
                    <div className="bg-guinea-yellow/10 border border-guinea-yellow/20 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-guinea-yellow" />
                        <div>
                          <p className="text-guinea-yellow font-medium">Abonnement mensuel actif</p>
                          <p className="text-slate-300 text-sm">Pensez à renouveler votre abonnement avant l'expiration</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="flex items-center space-x-2 bg-guinea-green hover:bg-guinea-green-dark text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <RefreshCw className="h-5 w-5" />
                      <span>Renouveler l'abonnement</span>
                    </button>
                    <button
                      onClick={onBack}
                      className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Accéder aux cours</span>
                    </button>
                  </div>
                </div>

                {/* Renewal Options */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-6">Options de renouvellement</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Monthly Renewal */}
                    <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <Clock className="h-6 w-6 text-guinea-yellow" />
                        <h4 className="text-lg font-semibold text-white">Renouvellement mensuel</h4>
                      </div>
                      <p className="text-slate-300 mb-4">Prolongez votre abonnement pour plusieurs mois</p>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nombre de mois</label>
                        <div className="relative">
                          <select
                            value={nombreMois}
                            onChange={(e) => setNombreMois(Number(e.target.value))}
                            className="w-full bg-slate-600 text-white border border-slate-500 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-guinea-yellow/50 focus:border-guinea-yellow"
                          >
                            {Array.from({ length: 9 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1} mois</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-white">70,000 GNF</div>
                        <div className="text-slate-400">par mois</div>
                      </div>

                      <button
                        onClick={abonnementMensuel}
                        disabled={subscribing}
                        className="w-full bg-guinea-yellow hover:bg-guinea-yellow-dark text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {subscribing ? 'Souscription...' : 'Renouveler'}
                      </button>
                    </div>

                    {/* Yearly Renewal */}
                    <div className="bg-slate-700/30 p-6 rounded-lg border border-guinea-green/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <Shield className="h-6 w-6 text-guinea-green" />
                        <h4 className="text-lg font-semibold text-white">Renouvellement scolaire</h4>
                      </div>
                      <p className="text-slate-300 mb-4">Abonnement annuel avec 10% de réduction</p>

                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-white">800,000 GNF</div>
                        <div className="text-guinea-green font-semibold">Économisez 10%</div>
                        <div className="text-slate-400 line-through text-sm">888,000 GNF</div>
                      </div>

                      <button
                        onClick={abonnementScolaire}
                        disabled={subscribing}
                        className="w-full bg-guinea-green hover:bg-guinea-green-dark text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 text-center">
                  <div className="w-20 h-20 bg-guinea-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-guinea-yellow/30">
                    <Plus className="h-10 w-10 text-guinea-yellow" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Aucun abonnement actif</h2>
                  <p className="text-slate-300 mb-6">
                    Souscrivez à un abonnement pour accéder à tous nos cours et ressources pédagogiques
                  </p>
                </div>

                {/* Subscription Options */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Monthly Subscription */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-guinea-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-guinea-yellow/30">
                        <Clock className="h-8 w-8 text-guinea-yellow" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Abonnement mensuel</h3>
                      <p className="text-slate-300">
                        Flexibilité maximale avec paiement mensuel. Choisissez le nombre de mois qui vous convient.
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Nombre de mois</label>
                      <div className="relative">
                        <select
                          value={nombreMois}
                          onChange={(e) => setNombreMois(Number(e.target.value))}
                          className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-guinea-yellow/50 focus:border-guinea-yellow"
                        >
                          {Array.from({ length: 9 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} mois</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-white">70,000 GNF</div>
                      <div className="text-slate-400">par mois</div>
                    </div>

                    <button
                      onClick={abonnementMensuel}
                      disabled={subscribing}
                      className="w-full bg-guinea-yellow hover:bg-guinea-yellow-dark text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {subscribing ? 'Souscription...' : 'Souscrire'}
                    </button>
                  </div>

                  {/* Yearly Subscription */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-guinea-green/50 relative">
                    <div className="absolute top-4 right-4 bg-guinea-green text-white px-3 py-1 rounded-full text-sm font-bold">
                      POPULAIRE
                    </div>

                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-guinea-green/30">
                        <Shield className="h-8 w-8 text-guinea-green" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Abonnement Scolaire</h3>
                      <p className="text-slate-300">
                        Abonnement annuel avec 10% de réduction. Idéal pour une année scolaire complète.
                      </p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-white">800,000 GNF</div>
                      <div className="text-guinea-green font-semibold">Économisez 10%</div>
                      <div className="text-slate-400 line-through text-sm">888,000 GNF</div>
                    </div>

                    <button
                      onClick={abonnementScolaire}
                      disabled={subscribing}
                      className="w-full bg-guinea-green hover:bg-guinea-green-dark text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {subscribing ? 'Souscription...' : 'Souscrire'}
                    </button>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Avantages inclus</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="h-6 w-6 text-guinea-green" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">Accès illimité</h4>
                      <p className="text-slate-300 text-sm">Tous les cours de votre niveau</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-guinea-green" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">Certificats</h4>
                      <p className="text-slate-300 text-sm">Certificats reconnus</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-guinea-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-6 w-6 text-guinea-green" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">Support</h4>
                      <p className="text-slate-300 text-sm">Assistance pédagogique</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SubscriptionPage;
```