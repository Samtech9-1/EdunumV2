export const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7109/api';

export const PROFILE = {
    PROF: 'Professeur',
    ELEVE: 'Eleve',
    ADMIN: "Administrateur"
} as const;

export type ProfileType = typeof PROFILE[keyof typeof PROFILE];