import React, { useEffect, useRef, useState } from 'react';
import {
  Clock,
  Users,
  Star,
  Calculator,
  Atom,
  FlaskConical,
  Languages,
  Globe,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "Mathématiques",
    description: "Maîtrisez l'algèbre, la géométrie et les statistiques avec nos cours complets",
    //instructor: "Dr. Mamadou Diallo",
    duration: "40h de contenu",
    // students: "2,500+",
    // rating: 4.8,
    // price: "120,000 GNF",
    image: "https://images.pexels.com/photos/6256/mathematics-computation-math-blackboard.jpg?auto=compress&cs=tinysrgb&w=600",
    icon: <Calculator className="h-6 w-6" />,
    level: "Tous niveaux de la terminale",
    topics: [
      "Algèbre : Équations, matrices et fonctions",
      "Géométrie : Figures, théorèmes et constructions", 
      "Statistiques : Analyse des données et probabilités"
    ],
    color: "bg-gradient-guinea-red"
  },
  {
    id: 2,
    title: "Physique",
    description: "Explorez la mécanique, l'électricité et l'optique à travers des expériences pratiques",
    //instructor: "Prof. Fatoumata Camara",
    duration: "35h de contenu",
    // students: "1,800+",
    // rating: 4.9,
    // price: "150,000 GNF",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <Atom className="h-6 w-6" />,
    level: "Tous niveaux de la terminale",
    topics: [
      "Mécanique : Forces, mouvements et énergies",
      "Électricité : Circuits, résistances et magnétisme",
      "Optique : Lumière, lentilles et phénomènes visuels"
    ],
    color: "bg-gradient-guinea-green"
  },
  {
    id: 3,
    title: "Chimie",
    description: "Découvrez les réactions chimiques, le tableau périodique et la chimie organique",
    //instructor: "M. Ibrahima Sow",
    duration: "+40h de contenu",
    // students: "1,500+",
    // rating: 4.7,
    // price: "130,000 GNF",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <FlaskConical className="h-6 w-6" />,
    level: "Tous les niveaux de la terminale",
    topics: [
      "Réactions chimiques : Acides, bases et équilibres",
      "Tableau périodique : Éléments et propriétés",
      "Chimie organique : Composés et applications"
    ],
    color: "bg-gradient-to-br from-blue-500 to-cyan-600"
  },
  {
    id: 4,
    title: "Français",
    description: "Perfectionnez votre grammaire, orthographe et analyse littéraire",
   // instructor: "Mme. Aissatou Barry",
    duration: "+45h de contenu",
    // students: "3,200+",
    // rating: 4.6,
    // price: "100,000 GNF",
    image: "https://images.pexels.com/photos/159581/dictionary-reference-book-learning-meaning-159581.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <Languages className="h-6 w-6" />,
    level: "Tous les niveaux de la terminale",
    topics: [
      "Commentaire composé : Rédaction et structure",
      "dissertation : Styles et figures de style",
      "Littérature : Auteurs et mouvements"
    ],
    color: "bg-gradient-guinea-yellow"
  },
  {
    id: 5,
    title: "Anglais",
    description: "Développez votre vocabulaire, grammaire et prononciation en anglais",
   // instructor: "Mr. Alpha Condé",
    duration: "50h de contenu",
    // students: "4,000+",
    // rating: 4.8,
    // price: "110,000 GNF",
    image: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=600",
    icon: <Globe className="h-6 w-6" />,
    level: "Tous les niveaux de la terminale",
    topics: [
      "Vocabulaire : Mots et expressions courantes",
      "Grammaire : Structures et conjugaison",
      "Prononciation : Accents et phonétique"
    ],
    color: "bg-gradient-to-br from-purple-500 to-pink-600"
  }
];

const CoursesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const itemsPerSlide = 3;

  const totalSlides = Math.ceil(courses.length / itemsPerSlide);

  const goToSlide = (index) => {
    const newIndex = (index + courses.length) % courses.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + itemsPerSlide) % courses.length);
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const visibleCourses = courses.slice(currentIndex, currentIndex + itemsPerSlide);
  if (visibleCourses.length < itemsPerSlide) {
    visibleCourses.push(...courses.slice(0, itemsPerSlide - visibleCourses.length));
  }

  return (
    <section id="cours" className="section-education-secondary py-20">
      <div className="content-section">
        <div className="text-center mb-10 animate-slide-in-up">
          <h2 className="heading-primary">📖 Nos Matières Académiques</h2>
          <p className="text-education max-w-3xl mx-auto">
            Découvrez notre programme complet de matières fondamentales pour renforcer vos connaissances et exceller dans vos études.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full">
          {/* Chevron Controls */}
          <button
            onClick={() => goToSlide(currentIndex - itemsPerSlide)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex gap-6 justify-center transition-all duration-1000">
            {visibleCourses.map((course, index) => (
              <div
                key={course.id}
                className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className={`absolute inset-0 ${course.color} opacity-80`}></div>

                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                    <div className="text-white font-bold text-lg">0{index + 1}</div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                    {course.icon}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{course.title}</h3>
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <span className="badge-success mb-2 inline-block">{course.level}</span>
                  <p className="text-neutral-600 text-sm mb-3">{course.description}</p>
                  <h4 className="font-semibold mb-2">Programme :</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {course.topics.map((topic, i) => (
                      <li key={i}>• {topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Chevron Controls */}
          <button
            onClick={() => goToSlide(currentIndex + itemsPerSlide)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
            aria-label="Suivant"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i * itemsPerSlide)}
                className={`w-3 h-3 rounded-full ${i === Math.floor(currentIndex / itemsPerSlide) ? 'bg-guinea-green' : 'bg-neutral-300'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
