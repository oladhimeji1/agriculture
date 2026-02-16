// utils/diagnosis.ts

import { diseases, Symptom } from '../mock/diseases';

export function diagnose(selected: Symptom[]) {
    return diseases
        .map((d) => {
            const matches = d.symptoms.filter(s =>
                selected.includes(s)
            ).length;

            const confidence =
                Math.round((matches / d.symptoms.length) * 100);

            return {
                ...d,
                matches,
                confidence,
            };
        })
        .filter(d => d.matches > 0)
        .sort((a, b) => b.confidence - a.confidence);
}
