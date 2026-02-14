
import imgw from '../assets/home/1152.jpg';
import type { Batch, Task } from '../types';

export const mockBatch: Batch = {
    id: '1',
    name: 'Broilers Batch A',
    birdType: 'broilers',
    numberOfBirds: 500,
    birdsLive: 192,
    startDate: '2025-10-01',
    currentAge: 22,
    mortality: 8,
    status: 'active',
    createdAt: '2025-10-01',
    updatedAt: '2025-10-23',
};

export const mockTasks = [
    { id: '1', title: 'Refill water troughs', status: 'done' as const },
    { id: '2', title: 'Morning feed distribution', status: 'pending' as const },
    { id: '3', title: 'Check brooding temperature', status: 'pending' as const },
    { id: '4', title: 'Biosecurity foot dip refresh', status: 'pending' as const },
];


export const dailyTasks: Task[] = [
    {
        id: '1',
        title: 'Evening Feed - Batch A',
        description: 'Distribute evening feed',
        time: '6:00 PM',
        priority: 'high',
        status: 'pending',
        image: imgw,
    },
    {
        id: '2',
        title: 'Vitamin Supplements',
        description: 'Add 2 scoops to main water tank',
        time: '9:00 AM',
        priority: 'high',
        status: 'pending',
        image: imgw,
    },
    {
        id: '3',
        title: 'Clean Drinkers',
        description: 'Clean drinkers thoroughly',
        time: '7:45 AM',
        priority: 'routine',
        status: 'done',
        image: imgw,
    },
    {
        id: '4',
        title: 'Morning Egg Collection',
        description: 'Record total count in app',
        time: '11:00 AM',
        priority: 'routine',
        status: 'pending',
        image: imgw,
    },
];