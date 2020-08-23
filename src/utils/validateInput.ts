export default function(type: string, value: any) {
    let regex = /$a/; // impossible regex -> always false
    switch (type) {
        case 'text': regex = /^[a-zA-Z]+$/; break;
        case 'password': regex = /^([a-zA-Z0-9]|[!@#$%^&*]){6,50}$/; break;
        case 'number': regex = /^[0-9]+$/; break;
        case 'email': regex = /^[a-zA-Z0-9]+@([a-z]+[.])+[a-z]+$/; break;
        case 'radio-group': return value !== null;
        case 'accept-terms': return value;
        default: break;
    } 
    return regex.test(value);
}
