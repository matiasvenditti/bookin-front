export default function(type: string, value: any) {
    let regex = /$a/; // impossible regex -> always false
    switch (type) {
        case 'text': regex = /^([a-zA-Z]+(?:[\s]+[a-zA-Z]+)*){3,30}$/; break;
        case 'password': regex = /^(?=.*[0-9])(?=.*[A-Za-z])(?=\S+$).{6,50}$/; break;
        case 'number': regex = /^[0-9]+$/; break;
        case 'email': regex = /^[\w-.]{3,50}@([\w-]+\.)+[\w-]{2,4}$/; break;
        case 'radio-group': return value !== null;
        case 'accept-terms': return value;
        default: break;
    } 
    return regex.test(value);
}
