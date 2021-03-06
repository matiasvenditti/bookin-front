import { PhotoUtils } from '.';


export default function(type: string, value: any) {
    let regex = /$a/; // impossible regex -> always false
    switch (type) {
        case 'text': regex = /^([a-zA-Z]+(?:[\s]+[a-zA-Z]+)*[ñáéíóúü]*){3,30}$/; break;
        case 'alphanumeric': regex = /^([A-Za-zÀ-ÖØ-öø-ÿ0-9¡]+(?:[\s]*.+)*){3,30}$/; break;      
        case 'title': regex = /^([A-Za-zÀ-ÖØ-öø-ÿ0-9¡]+(?:[\s]*.+)*){3,30}$/; break;
        case 'password': regex = /^(?=.*[0-9])(?=.*[A-Za-z])(?=\S+$).{6,50}$/; break;
        case 'number': regex = /^[0-9]+$/; break;
        case 'email': regex = /^[\w-.]{3,50}@([\w-]+\.)+[\w-]{2,4}$/; break;
        case 'radio-group': return value !== null;
        case 'accept-terms': return value;
        case 'photo': return value !== null && value.size < PhotoUtils.MAX_PHOTO_SIZE;
        case 'date':
            if (value?.toString() === 'Invalid Date') return false;
            else return true;
        case 'select': return value !== null;
        case 'autocomplete-select': return value !== '';
        case 'array': return value.length !== 0;
        default: break;
    } 
    return regex.test(value);
}
