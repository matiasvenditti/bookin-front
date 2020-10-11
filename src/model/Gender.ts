export enum Gender { 
    M = 'M', 
    F = 'F', 
    A = 'A',
};

export const getIndexGender = (value: string) => {
    switch (value) {
        case 'M': return 0;
        case 'F': return 1;
        case 'A': return 2;
        default: return 0;
    }
}

export const getLetterGender = (index: number) => {
    switch (index) {
        case 0: return 'M';
        case 1: return 'F';
        case 2: return 'A';
        default: return 'A';
    }
}

export const GenderList = [
    { id: 0, value: 'Hombre' },
    { id: 1, value: 'Mujer' },
    { id: 2, value: 'Anónimo' },
];
