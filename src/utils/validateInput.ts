export default function(type: string, value: any) {
    let regex = /$a/; // initialize with always false regex
    switch (type) {
        case 'text': 
            // any common letter
            regex = /^[a-zA-Z]+$/;
            break;
        case 'password': 
            // any common letter and a length of 6 minimum
            regex = /^([a-zA-Z0-9]|[!@#$%^&*]){6,50}$/;
            break;
        case 'numeric': 
            // any number
            regex = /^[0-9]+$/;
            break;
        case 'email': 
            // any alphanumeric + @ + any lowercase with dots in the middle
            // example -> asd@asd.asd
            regex = /^[a-zA-Z0-9]+@([a-z]+[.])+[a-z]+$/;
            break;
        case 'radio-group': 
            // initial state is null until user selects something
            return value !== null;
        case 'accept-terms': 
            return value === true;
        default: break;
    }
    
    console.log('type: ', type, ', value: ', value, ', res:', regex.test(value));
    return regex.test(value);
}