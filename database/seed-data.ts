interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string,
    status: string,
    createdAt: number
}

export const seedData: SeedData = {
    entries:[
        {
        description: 'Pendiente: Hola viejo hola viejo hola viejo hola viejo',
        status: 'in-progress',
        createdAt: Date.now(),
        },

        {
        description:
            'En-Progreso: Chau viejo Hola viejo hola viejo hola viejo hola viejo',
        status: 'in-progress',
        createdAt: Date.now() - 1000000,
        },

        {
        description:
            'Terminadas: Bye bye Hola viejo hola viejo hola viejo hola viejo',
        status: 'finished',
        createdAt: Date.now() - 100000,
        },
    ]
}