export enum FilterBy {
    libros,
    autores,
    ambos,
}

export const FilterByList = [
    {id: FilterBy.libros, value: 'Solo libros'},
    {id: FilterBy.autores, value: 'Solo autores'},
    {id: FilterBy.ambos, value: 'Ambos'},
]