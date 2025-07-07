import Axios from './CallerService';

interface LoginCredentials {
    Email: string;
    Password: string;
}

interface UserData {
    Id?: string;
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
    etablissement?: string;
    genre?: string;
    gradeId?: string;
    grade?: string;
    villeId?: string;
    ville?: string;
    regionId?: string;
    region?: string;
    profil?: string;
}

interface StudentSubscriptionData {
    GradeLevelId: string;
    SubscriptionType: number;
    NumberOfMonths?: number | null;
}

/**
 * Configuration de l'intercepteur Axios pour inclure automatiquement le token
 */
Axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Intercepteur pour gérer les erreurs 401 (token expiré)
 */
Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token expiré ou non valide, déconnexion...");
            logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

/**
 * Connexion vers l'API
 */
const login = (credentials: LoginCredentials) => {
    return Axios.post('Register/login', credentials);
};

/**
 * Création d'un utilisateur via l'API
 */
const createUser = (user: UserData) => {
    return Axios.post('User/CreateUser', user);
};

/**
 * Récupération d'un utilisateur par son ID via l'API
 */
const getUserById = (userId: string) => {
    return Axios.get(`/User/GetUserById/${encodeURIComponent(userId)}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
        withCredentials: true
    });
};

const getModuleByUserId = (userId: string) => {
    return Axios.get(`/subscriptions/v1/students/me/videos/student/${encodeURIComponent(userId)}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
        withCredentials: true
    });
};

const getModuleVideosData = (videoModuleId: string) => {
    return Axios.get(`subscriptions/v1/students/me/videos/videosDataByModuleAndGrade/${encodeURIComponent(videoModuleId)}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
        withCredentials: true
    });
};

const getStudentSubscriptionData = () => {
    return Axios.get(`subscriptions/v1/students/me/subscriptions`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
        withCredentials: true
    });
};

const StudentSubscription = async (studentData: StudentSubscriptionData = {} as StudentSubscriptionData) => {   
    try {
        return await Axios.post(
            'subscriptions/v1/students/me/subscriptions',
            studentData,
            {
                withCredentials: true
            }
        );
    } catch (error: any) {
        const parsedError = {
            code: error.code || null,
            message: error.message || 'Une erreur est survenue. Veillez contacter votre administrateur.',
        };
        return parsedError;
    }
};

const getVideoStream = async (videoId: string): Promise<string | null> => {
    try {
        const token = getToken();
        const response = await Axios.get(
            `subscriptions/v1/students/me/videos/${encodeURIComponent(videoId)}`,
            {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );

        const blob = new Blob([response.data], { type: 'video/mp4' });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Erreur lors de la récupération du flux vidéo', error);
        return null;
    }
};

/**
 * Mise à jour des données utilisateur via l'API
 */
const updateUserData = (userData: UserData) => {
    return Axios.post('User/updateUserData', userData);
};

/**
 * Sauvegarde du profil dans le localStorage
 */
const saveProfil = (profil: string): void => {
    localStorage.setItem('profil', profil);
};

/**
 * Sauvegarde du token dans le localStorage
 */
const saveToken = (token: string): void => {
    localStorage.setItem('token', token);
};

/**
 * Sauvegarde de l'userId dans le localStorage
 */
const saveUserId = (userId: string): void => {
    localStorage.setItem('userId', userId);
};

/**
 * Suppression du token et des autres informations du localStorage
 */
const logout = async (): Promise<void> => {
    try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            console.warn("Aucun utilisateur connecté.");
            clearLocalStorage();
            return;
        }

        await Axios.post(
            `/Register/logout/${encodeURIComponent(userId)}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
        );

        console.log("Déconnexion réussie.");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    } finally {
        clearLocalStorage();
    }
};

const clearLocalStorage = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('profil');
    localStorage.removeItem('userId');
};

/**
 * Vérifie si un utilisateur est connecté (présence d'un token valide)
 */
const isLogged = (): boolean => {
    return isTokenValid();
};

/**
 * Vérification de la validité du token
 */
const isTokenValid = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        // Simple check for token existence - you might want to add jwt-decode here
        return token.length > 0;
    } catch (error) {
        return false;
    }
};

/**
 * Récupération du profil dans le localStorage
 */
const getProfil = (): string | null => {
    return localStorage.getItem('profil');
};

/**
 * Récupération du token dans le localStorage
 */
const getToken = (): string | null => {
    return localStorage.getItem('token');
};

/**
 * Récupération de l'userId dans le localStorage
 */
const getUserId = (): string | null => {
    return localStorage.getItem('userId');
};

/**
 * Récupération des informations de l'utilisateur connecté
 */
const getCurrentUser = async (): Promise<any> => {
    const userId = getUserId();
    if (!userId) {
        return null;
    }

    try {
        const response = await getUserById(userId);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur :", error);
        return null;
    }
};

/**
 * Récupération de toutes les vidéos
 */
const getAllVideos = () => {
    return Axios.get('/api/1/video/video');
};

/**
 * Récupération d'une vidéo par son ID
 */
const getVideoById = (videoId: string) => {
    return Axios.get(`/api/1/video/Read/video/${encodeURIComponent(videoId)}`);
};

// Exportation des services pour utilisation
export const UserService = {
    login,
    createUser,
    saveProfil,
    saveToken,
    saveUserId,
    logout,
    isLogged,
    isTokenValid,
    getProfil,
    getToken,
    getUserId,
    getUserById,
    updateUserData,
    getCurrentUser,
    getAllVideos,
    getVideoById,
    getModuleByUserId,
    getModuleVideosData,
    getVideoStream,
    getStudentSubscriptionData,
    StudentSubscription
};