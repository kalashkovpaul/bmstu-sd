export const skillValues = {
    name: {
        min: 1,
        max: 40
    },
    description: {
        min: 10,
        max: 100
    },
    competence: {
        min: 1,
        max: 10
    },
    startDate: {
        min: new Date(8640000000000000),
        max: new Date(-8640000000000000)
    },
    endDate: {
        min: new Date(8640000000000000),
        max: new Date(-8640000000000000)
    },
    link: {
        min: 0,
        max: 500,
    },
    image: {
        min: 1,
        max: 50,
        maxSize: 1024 * 1024,
        type: "image/png"
    }
}

export const heroValues = {
    name: {
        min: 2,
        max: 20,
    },
    surname: {
        min: 2,
        max: 20
    },
    lastname: {
        min: 2,
        max: 20
    },
    phone: {
        min: 7,
        max: 10
    },
    photo: {
        min: 1,
        max: 50,
        maxSize: 1024 * 1024,
        type: "image/png"
    },
    resume: {
        min: 1,
        max: 50,
        maxSize: 1024 * 1024,
        type: "application/pdf"
    }
}