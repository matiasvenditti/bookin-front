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
        case Gender[0]: return 'Hombre';
        case Gender[1]: return 'Mujer';
        case Gender[2]: return 'Anónimo';
        default: return 'Anónimo';
    }
};


export {
    stringToGender,
    genderToString,
}
