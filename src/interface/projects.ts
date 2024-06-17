// Definiendo una interfaz para los proyectos
export interface Project {
    id: number;
    name: string;
    activities: string;
    comments: string;
    progress: string;
    employee: string;
    company: string;
    deadline: string;
    specialty: string;
    imageUrl: string; // URL de la imagen para cada proyecto
  }