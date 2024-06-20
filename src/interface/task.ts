import { Activity } from './activities';

export interface Task {
    id: number;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    status: string;
    activities: Activity[];
    completed: boolean;
}