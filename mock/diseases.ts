// data/diseases.ts

export type Symptom =
    | 'coughing'
    | 'sneezing'
    | 'diarrhea'
    | 'bloody-droppings'
    | 'lethargy'
    | 'loss-of-appetite'
    | 'swollen-head'
    | 'droopy-wings'
    | 'nasal-discharge'
    | 'open-mouth-breathing'
    | 'ruffled-feathers'
    | 'poor-growth'
    | 'reduced-egg-production'
    | 'paralysis'
    | 'green-droppings'
    | 'eye-swelling';

export interface ActionStep {
    action: string;
}

export interface Disease {
    id: string;
    name: string;
    severity: 'high' | 'medium';
    urgency: 'vet-now' | 'monitor';
    symptoms: Symptom[];
    description: string;
    actions: ActionStep[];
}

export const diseases: Disease[] = [

    {
        id: 'newcastle',
        name: 'Newcastle Disease',
        severity: 'high',
        urgency: 'vet-now',
        symptoms: [
            'coughing',
            'open-mouth-breathing',
            'lethargy',
            'droopy-wings',
            'green-droppings',
            'paralysis',
        ],
        description:
            'Highly contagious viral disease affecting respiratory and nervous systems.',
        actions: [
            { action: 'Immediately isolate affected birds.' },
            { action: 'Disinfect coop thoroughly.' },
            { action: 'Contact veterinarian urgently.' },
        ],
    },

    {
        id: 'coccidiosis',
        name: 'Coccidiosis',
        severity: 'medium',
        urgency: 'monitor',
        symptoms: [
            'bloody-droppings',
            'diarrhea',
            'lethargy',
            'ruffled-feathers',
            'loss-of-appetite',
        ],
        description:
            'Intestinal parasite causing bloody stool and weakness.',
        actions: [
            { action: 'Administer anticoccidial medication.' },
            { action: 'Keep litter dry.' },
            { action: 'Ensure clean drinking water.' },
        ],
    },

    {
        id: 'infectious-bronchitis',
        name: 'Infectious Bronchitis',
        severity: 'medium',
        urgency: 'monitor',
        symptoms: [
            'coughing',
            'sneezing',
            'nasal-discharge',
            'reduced-egg-production',
            'lethargy',
        ],
        description:
            'Respiratory infection reducing egg quality and breathing efficiency.',
        actions: [
            { action: 'Improve ventilation.' },
            { action: 'Provide vitamins.' },
            { action: 'Monitor flock closely.' },
        ],
    },

    {
        id: 'fowl-pox',
        name: 'Fowl Pox',
        severity: 'medium',
        urgency: 'monitor',
        symptoms: [
            'eye-swelling',
            'loss-of-appetite',
            'lethargy',
        ],
        description:
            'Viral disease causing lesions around eyes and comb.',
        actions: [
            { action: 'Separate affected birds.' },
            { action: 'Apply antiseptic to lesions.' },
            { action: 'Vaccinate remaining flock.' },
        ],
    },

    {
        id: 'mareks',
        name: 'Marek’s Disease',
        severity: 'high',
        urgency: 'vet-now',
        symptoms: [
            'paralysis',
            'poor-growth',
            'droopy-wings',
            'lethargy',
        ],
        description:
            'Viral tumor disease causing paralysis and weakness.',
        actions: [
            { action: 'Cull severely affected birds.' },
            { action: 'Vaccinate chicks early.' },
            { action: 'Consult veterinarian.' },
        ],
    },

    {
        id: 'avian-influenza',
        name: 'Avian Influenza',
        severity: 'high',
        urgency: 'vet-now',
        symptoms: [
            'coughing',
            'open-mouth-breathing',
            'swollen-head',
            'lethargy',
            'green-droppings',
        ],
        description:
            'Severe viral respiratory disease with high mortality.',
        actions: [
            { action: 'Quarantine flock immediately.' },
            { action: 'Notify veterinary authority.' },
            { action: 'Disinfect premises.' },
        ],
    },

    {
        id: 'infectious-coryza',
        name: 'Infectious Coryza',
        severity: 'medium',
        urgency: 'monitor',
        symptoms: [
            'swollen-head',
            'nasal-discharge',
            'eye-swelling',
            'loss-of-appetite',
        ],
        description:
            'Bacterial respiratory disease causing facial swelling.',
        actions: [
            { action: 'Administer antibiotics under vet guidance.' },
            { action: 'Improve coop hygiene.' },
            { action: 'Isolate infected birds.' },
        ],
    },

    {
        id: 'salmonellosis',
        name: 'Salmonellosis',
        severity: 'medium',
        urgency: 'monitor',
        symptoms: [
            'diarrhea',
            'poor-growth',
            'lethargy',
            'loss-of-appetite',
        ],
        description:
            'Bacterial infection affecting digestion and growth.',
        actions: [
            { action: 'Provide antibiotics via vet.' },
            { action: 'Sanitize feeding equipment.' },
            { action: 'Improve biosecurity.' },
        ],
    },

];

