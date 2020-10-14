import {Gender} from "../model/Gender";


const stringToGender = function(gender: string) {
    switch (gender) {
        case 'Hombre': return Gender.M;
        case 'Mujer': return Gender.F;
        case 'Anónimo': return Gender.A;
        default: return Gender.A;
    }
};

const genderToString = function(gender: string) {
    switch (gender) {
        case Gender.M: return 'Hombre';
        case Gender.F: return 'Mujer';
        case Gender.A: return 'Anónimo';
        default: return 'Anónimo';
    }
};


export {
    stringToGender,
    genderToString,
}
