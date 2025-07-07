import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CoursesSection from './components/CoursesSection';
import SubscriptionSection from './components/SubscriptionSection';
import InstructorsSection from './components/InstructorsSection';
import ContactSection from './components/ContactSection';
import RegistrationSection from './components/RegistrationSection';
import Footer from './components/Footer';
import CreerUnCompte from './components/auth/CreerUnCompte';
import Connexion from './components/auth/Connexion';
import MotDePasseOublie from './components/auth/MotDePasseOublie';
import Contact from './components/Contact';
import StudentDashboard from './components/dashboard/StudentDashboard';
import StudentProfile from './components/dashboard/StudentProfile';
import CourseDetailPage from './components/dashboard/CourseDetailPage';
import SubscriptionPage from './components/dashboard/SubscriptionPage';

function App() {
  // Simple routing logic - you can replace this with React Router
  const currentPath = window.location.pathname;

  if (currentPath === '/register' || currentPath === '/creer-compte') {
    return <CreerUnCompte />;
  }

  if (currentPath === '/login' || currentPath === '/connexion') {
    return <Connexion />;
  }

  if (currentPath === '/reset-password' || currentPath === '/mot-de-passe-oublie') {
    return <MotDePasseOublie />;
  }

  if (currentPath === '/contact') {
    return <Contact />;
  }

  if (currentPath === '/dashboard') {
    return <StudentDashboard />;
  }

  if (currentPath === '/profile') {
    return <StudentProfile onBack={() => window.location.href = '/dashboard'} setSidebarOpen={() => {}} />;
  }

  if (currentPath === '/subscription' || currentPath === '/abonnements') {
    return <SubscriptionPage onBack={() => window.location.href = '/dashboard'} />;
  }

  if (currentPath.startsWith('/course/')) {
    const courseId = currentPath.split('/course/')[1];
    return <CourseDetailPage courseId={courseId} onBack={() => window.location.href = '/dashboard'} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CoursesSection />
      <SubscriptionSection />
      <InstructorsSection />
      <ContactSection />
      <RegistrationSection />
      <Footer />
    </div>
  );
}

export default App;