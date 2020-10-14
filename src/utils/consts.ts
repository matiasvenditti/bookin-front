import { KeyValue } from "../model";
import { Gender } from "../model/Gender";
import { FilterBy } from "../model/results";

export const allGenders: KeyValue[] = [
    { key: Gender.M, value: 'Hombre' },
    { key: Gender.F, value: 'Mujer' },
    { key: Gender.A, value: 'Anónimo' },
];

export const allFilterBys = [
    {key: FilterBy.libros, value: 'Solo libros'},
    {key: FilterBy.autores, value: 'Solo autores'},
    {key: FilterBy.ambos, value: 'Ambos'},
];

export const allLanguages: string[] = ['Español', 'Inglés'];

export const allBookGenres: string[] = [
    'Aventura',
    'Acción',
    'Autoayuda',
    'Biografías',
    'Ciencia Ficción',
    'Educativos',
    'Fantasia',
    'Infantiles',
    'Novelas románticas',
    'Poesías',
    'Policiales',
    'Terror',
];

export const allCountries: KeyValue[] = [
    {value: "Afganistán", key: "AF"},
    {value: "Albania", key: "AL"},
    {value: "Alemania", key: "DE"},
    {value: "Andorra", key: "AD"},
    {value: "Angola", key: "AO"},
    {value: "Anguila", key: "AI"},
    {value: "Antártida", key: "AQ"},
    {value: "Antigua y Barbuda", key: "AG"},
    {value: "Arabia Saudita", key: "SA"},
    {value: "Argelia", key: "DZ"},
    {value: "Argentina", key: "AR"},
    {value: "Armenia", key: "AM"},
    {value: "Aruba", key: "AW"},
    {value: "Australia", key: "AU"},
    {value: "Austria", key: "AT"},
    {value: "Azerbaiyán", key: "AZ"},
    {value: "Bélgica", key: "BE"},
    {value: "Bahamas", key: "BS"},
    {value: "Bahrein", key: "BH"},
    {value: "Bangladesh", key: "BD"},
    {value: "Barbados", key: "BB"},
    {value: "Belice", key: "BZ"},
    {value: "Benín", key: "BJ"},
    {value: "Bhután", key: "BT"},
    {value: "Bielorrusia", key: "BY"},
    {value: "Birmania", key: "MM"},
    {value: "Bolivia", key: "BO"},
    {value: "Bosnia y Herzegovina", key: "BA"},
    {value: "Botsuana", key: "BW"},
    {value: "Brasil", key: "BR"},
    {value: "Brunéi", key: "BN"},
    {value: "Bulgaria", key: "BG"},
    {value: "Burkina Faso", key: "BF"},
    {value: "Burundi", key: "BI"},
    {value: "Cabo Verde", key: "CV"},
    {value: "Camboya", key: "KH"},
    {value: "Camerún", key: "CM"},
    {value: "Canadá", key: "CA"},
    {value: "Chad", key: "TD"},
    {value: "Chile", key: "CL"},
    {value: "China", key: "CN"},
    {value: "Chipre", key: "CY"},
    {value: "Ciudad del Vaticano", key: "VA"},
    {value: "Colombia", key: "CO"},
    {value: "Comoras", key: "KM"},
    {value: "República del Congo", key: "CG"},
    {value: "República Democrática del Congo", key: "CD"},
    {value: "Corea del Norte", key: "KP"},
    {value: "Corea del Sur", key: "KR"},
    {value: "Costa de Marfil", key: "CI"},
    {value: "Costa Rica", key: "CR"},
    {value: "Croacia", key: "HR"},
    {value: "Cuba", key: "CU"},
    {value: "Curazao", key: "CW"},
    {value: "Dinamarca", key: "DK"},
    {value: "Dominica", key: "DM"},
    {value: "Ecuador", key: "EC"},
    {value: "Egipto", key: "EG"},
    {value: "El Salvador", key: "SV"},
    {value: "Emiratos Árabes Unidos", key: "AE"},
    {value: "Eritrea", key: "ER"},
    {value: "Eslovaquia", key: "SK"},
    {value: "Eslovenia", key: "SI"},
    {value: "España", key: "ES"},
    {value: "Estados Unidos de América", key: "US"},
    {value: "Estonia", key: "EE"},
    {value: "Etiopía", key: "ET"},
    {value: "Filipinas", key: "PH"},
    {value: "Finlandia", key: "FI"},
    {value: "Fiyi", key: "FJ"},
    {value: "Francia", key: "FR"},
    {value: "Gabón", key: "GA"},
    {value: "Gambia", key: "GM"},
    {value: "Georgia", key: "GE"},
    {value: "Ghana", key: "GH"},
    {value: "Gibraltar", key: "GI"},
    {value: "Granada", key: "GD"},
    {value: "Grecia", key: "GR"},
    {value: "Groenlandia", key: "GL"},
    {value: "Guadalupe", key: "GP"},
    {value: "Guam", key: "GU"},
    {value: "Guatemala", key: "GT"},
    {value: "Guayana Francesa", key: "GF"},
    {value: "Guernsey", key: "GG"},
    {value: "Guinea", key: "GN"},
    {value: "Guinea Ecuatorial", key: "GQ"},
    {value: "Guinea-Bissau", key: "GW"},
    {value: "Guyana", key: "GY"},
    {value: "Haití", key: "HT"},
    {value: "Honduras", key: "HN"},
    {value: "Hong kong", key: "HK"},
    {value: "Hungría", key: "HU"},
    {value: "India", key: "IN"},
    {value: "Indonesia", key: "ID"},
    {value: "Irán", key: "IR"},
    {value: "Irak", key: "IQ"},
    {value: "Irlanda", key: "IE"},
    {value: "Isla Bouvet", key: "BV"},
    {value: "Isla de Man", key: "IM"},
    {value: "Isla de Navidad", key: "CX"},
    {value: "Isla Norfolk", key: "NF"},
    {value: "Islandia", key: "IS"},
    {value: "Islas Bermudas", key: "BM"},
    {value: "Islas Caimán", key: "KY"},
    {value: "Islas Cocos (Keeling)", key: "CC"},
    {value: "Islas Cook", key: "CK"},
    {value: "Islas de Åland", key: "AX"},
    {value: "Islas Feroe", key: "FO"},
    {value: "Islas Georgias del Sur y Sandwich del Sur", key: "GS"},
    {value: "Islas Heard y McDonald", key: "HM"},
    {value: "Islas Maldivas", key: "MV"},
    {value: "Islas Malvinas", key: "FK"},
    {value: "Islas Marianas del Norte", key: "MP"},
    {value: "Islas Marshall", key: "MH"},
    {value: "Islas Pitcairn", key: "PN"},
    {value: "Islas Salomón", key: "SB"},
    {value: "Islas Turcas y Caicos", key: "TC"},
    {value: "Islas Ultramarinas Menores de Estados Unidos", key: "UM"},
    {value: "Islas Vírgenes Británicas", key: "VG"},
    {value: "Islas Vírgenes de los Estados Unidos", key: "VI"},
    {value: "Israel", key: "IL"},
    {value: "Italia", key: "IT"},
    {value: "Jamaica", key: "JM"},
    {value: "Japón", key: "JP"},
    {value: "Jersey", key: "JE"},
    {value: "Jordania", key: "JO"},
    {value: "Kazajistán", key: "KZ"},
    {value: "Kenia", key: "KE"},
    {value: "Kirguistán", key: "KG"},
    {value: "Kiribati", key: "KI"},
    {value: "Kuwait", key: "KW"},
    {value: "Líbano", key: "LB"},
    {value: "Laos", key: "LA"},
    {value: "Lesoto", key: "LS"},
    {value: "Letonia", key: "LV"},
    {value: "Liberia", key: "LR"},
    {value: "Libia", key: "LY"},
    {value: "Liechtenstein", key: "LI"},
    {value: "Lituania", key: "LT"},
    {value: "Luxemburgo", key: "LU"},
    {value: "México", key: "MX"},
    {value: "Mónaco", key: "MC"},
    {value: "Macao", key: "MO"},
    {value: "Macedônia", key: "MK"},
    {value: "Madagascar", key: "MG"},
    {value: "Malasia", key: "MY"},
    {value: "Malawi", key: "MW"},
    {value: "Mali", key: "ML"},
    {value: "Malta", key: "MT"},
    {value: "Marruecos", key: "MA"},
    {value: "Martinica", key: "MQ"},
    {value: "Mauricio", key: "MU"},
    {value: "Mauritania", key: "MR"},
    {value: "Mayotte", key: "YT"},
    {value: "Micronesia", key: "FM"},
    {value: "Moldavia", key: "MD"},
    {value: "Mongolia", key: "MN"},
    {value: "Montenegro", key: "ME"},
    {value: "Montserrat", key: "MS"},
    {value: "Mozambique", key: "MZ"},
    {value: "Namibia", key: "NA"},
    {value: "Nauru", key: "NR"},
    {value: "Nepal", key: "NP"},
    {value: "Nicaragua", key: "NI"},
    {value: "Niger", key: "NE"},
    {value: "Nigeria", key: "NG"},
    {value: "Niue", key: "NU"},
    {value: "Noruega", key: "NO"},
    {value: "Nueva Caledonia", key: "NC"},
    {value: "Nueva Zelanda", key: "NZ"},
    {value: "Omán", key: "OM"},
    {value: "Países Bajos", key: "NL"},
    {value: "Pakistán", key: "PK"},
    {value: "Palau", key: "PW"},
    {value: "Palestina", key: "PS"},
    {value: "Panamá", key: "PA"},
    {value: "Papúa Nueva Guinea", key: "PG"},
    {value: "Paraguay", key: "PY"},
    {value: "Perú", key: "PE"},
    {value: "Polinesia Francesa", key: "PF"},
    {value: "Polonia", key: "PL"},
    {value: "Portugal", key: "PT"},
    {value: "Puerto Rico", key: "PR"},
    {value: "Qatar", key: "QA"},
    {value: "Reino Unido", key: "GB"},
    {value: "República Centroafricana", key: "CF"},
    {value: "República Checa", key: "CZ"},
    {value: "República Dominicana", key: "DO"},
    {value: "República de Sudán del Sur", key: "SS"},
    {value: "Reunión", key: "RE"},
    {value: "Ruanda", key: "RW"},
    {value: "Rumanía", key: "RO"},
    {value: "Rusia", key: "RU"},
    {value: "Sahara Occidental", key: "EH"},
    {value: "Samoa", key: "WS"},
    {value: "Samoa Americana", key: "AS"},
    {value: "San Bartolomé", key: "BL"},
    {value: "San Cristóbal y Nieves", key: "KN"},
    {value: "San Marino", key: "SM"},
    {value: "San Martín (Francia)", key: "MF"},
    {value: "San Pedro y Miquelón", key: "PM"},
    {value: "San Vicente y las Granadinas", key: "VC"},
    {value: "Santa Elena", key: "SH"},
    {value: "Santa Lucía", key: "LC"},
    {value: "Santo Tomé y Príncipe", key: "ST"},
    {value: "Senegal", key: "SN"},
    {value: "Serbia", key: "RS"},
    {value: "Seychelles", key: "SC"},
    {value: "Sierra Leona", key: "SL"},
    {value: "Singapur", key: "SG"},
    {value: "Sint Maarten", key: "SX"},
    {value: "Siria", key: "SY"},
    {value: "Somalia", key: "SO"},
    {value: "Sri lanka", key: "LK"},
    {value: "Sudáfrica", key: "ZA"},
    {value: "Sudán", key: "SD"},
    {value: "Suecia", key: "SE"},
    {value: "Suiza", key: "CH"},
    {value: "Surinám", key: "SR"},
    {value: "Svalbard y Jan Mayen", key: "SJ"},
    {value: "Swazilandia", key: "SZ"},
    {value: "Tayikistán", key: "TJ"},
    {value: "Tailandia", key: "TH"},
    {value: "Taiwán", key: "TW"},
    {value: "Tanzania", key: "TZ"},
    {value: "Territorio Británico del Océano Índico", key: "IO"},
    {value: "Territorios Australes y Antárticas Franceses", key: "TF"},
    {value: "Timor Oriental", key: "TL"},
    {value: "Togo", key: "TG"},
    {value: "Tokelau", key: "TK"},
    {value: "Tonga", key: "TO"},
    {value: "Trinidad y Tobago", key: "TT"},
    {value: "Tunez", key: "TN"},
    {value: "Turkmenistán", key: "TM"},
    {value: "Turquía", key: "TR"},
    {value: "Tuvalu", key: "TV"},
    {value: "Ucrania", key: "UA"},
    {value: "Uganda", key: "UG"},
    {value: "Uruguay", key: "UY"},
    {value: "Uzbekistán", key: "UZ"},
    {value: "Vanuatu", key: "VU"},
    {value: "Venezuela", key: "VE"},
    {value: "Vietnam", key: "VN"},
    {value: "Wallis y Futuna", key: "WF"},
    {value: "Yemen", key: "YE"},
    {value: "Yibuti", key: "DJ"},
    {value: "Zambia", key: "ZM"},
    {value: "Zimbabue", key: "ZW"},
]