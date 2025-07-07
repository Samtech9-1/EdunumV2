import React from 'react';
import { Award, BookOpen, Users, Star } from 'lucide-react';

const instructors = [
  {
    id: 1,
    name: "Dr. Mamadou Diallo",
    title: "Expert en Développement Web",
    description: "Plus de 10 ans d'expérience dans le développement web. Ancien ingénieur chez Google, maintenant dévoué à l'éducation en Guinée.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    courses: 8,
    students: 1240,
    rating: 4.9,
    specialties: ["JavaScript", "React", "Node.js", "Python"]
  },
  {
    id: 2,
    name: "Prof. Fatoumata Camara",
    title: "Spécialiste Data Science & IA",
    description: "PhD en Intelligence Artificielle, consultante internationale. Pionnière de l'enseignement de la data science en Afrique de l'Ouest.",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
    courses: 5,
    students: 856,
    rating: 4.8,
    specialties: ["Machine Learning", "Python", "Data Analysis", "AI"]
  },
  {
    id: 3,
    name: "M. Ibrahima Sow",
    title: "Expert Marketing Digital",
    description: "Fondateur d'une agence de marketing digital à Conakry. Formateur reconnu avec plus de 15 ans d'expérience.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    courses: 6,
    students: 672,
    rating: 4.7,
    specialties: ["SEO", "Social Media", "Google Ads", "Analytics"]
  }
];

const InstructorsSection = () => {
  return (
    <section id="instructeurs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">
            Nos Profs Experts
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Apprenez auprès des meilleurs professionnels guinéens reconnus pour leur expertise et leur pédagogie exceptionnelle.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-neutral-200">
              <div className="relative">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{instructor.name}</h3>
                  <p className="text-guinea-green-light font-semibold">{instructor.title}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-neutral-600 mb-6 leading-relaxed">{instructor.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 bg-guinea-green/10 rounded-full mx-auto mb-2 border border-guinea-green/20">
                      <BookOpen className="h-6 w-6 text-guinea-green" />
                    </div>
                    <div className="text-lg font-bold text-neutral-800">{instructor.courses}</div>
                    <div className="text-sm text-neutral-500">Cours</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 border border-blue-200">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-lg font-bold text-neutral-800">{instructor.students}</div>
                    <div className="text-sm text-neutral-500">Étudiants</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 bg-guinea-yellow/10 rounded-full mx-auto mb-2 border border-guinea-yellow/20">
                      <Star className="h-6 w-6 text-guinea-yellow" />
                    </div>
                    <div className="text-lg font-bold text-neutral-800">{instructor.rating}</div>
                    <div className="text-sm text-neutral-500">Note</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-neutral-800 mb-3">Spécialités</h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-guinea-green/10 text-guinea-green text-sm font-medium rounded-full border border-guinea-green/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-guinea-green text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  Voir les cours
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;