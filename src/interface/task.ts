import { Activity } from './activities';

export interface Task {
    title: string;
    activities: Activity[];
}