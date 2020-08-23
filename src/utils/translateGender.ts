export default function(gender: string) {
    switch (gender) {
        case 'Hombre': return 'M';
        case 'Mujer': return 'F';
        case 'Anónimo': return 'A';
        default: return 'M';
    }
};
