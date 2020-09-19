export function formatDateTime(dateTimeString:string) {
    const date = new Date(dateTimeString);

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return date.getDate() + ' de ' + monthNames[monthIndex] + ' de ' + year

}

export function formatDateTimeYears(dateTimeString:string) {
    const date = new Date(dateTimeString);
    return date.getFullYear();
}