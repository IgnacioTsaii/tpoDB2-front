import { Activity } from './activities';

export interface Task {
    id: number;
    title: string;
    activities: Activity[];
    completed: boolean;
}