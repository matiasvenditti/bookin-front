export default function(gender: string) {
    switch (gender) {
        case 'Hombre': return 'M';
        case 'Mujer': return 'F';
        case 'Anónimo': return 'A';
        case 'M': return 'Hombre';
        case 'F': return 'Mujer';
        case 'A': return 'Anónimo';
        default: return 'M';
    }
};
