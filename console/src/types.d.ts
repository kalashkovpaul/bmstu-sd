export type dataType = {
    day: string;
    month: string;
    year: string;
}

export type userData = {
    status: number;
    user: {
        name: string;
        surname: string;
        lastname: string;
        birthdate: dataType,
        phone: string;
        photo: string;
        resume: string;
    }
}

export type skillNameData = {
    status: number;
    names: Array<string>;
}

export type skillToReceive = {
    name: string;
    description: string;
    competence: number;
    startdate: dataType;
    enddate: dataType;
    link?: string;
    image?: string;
}

export type skillToSend = {
    name: string;
    description: string;
    competence: number;
    startdate: string;
    enddate: string;
    link?: string;
    image?: string;
}

export type skillData = {
    status: number;
    skill?: skill
}

export type rightsData = {
    status: number;
    isAdmin?: boolean;
}

export type statusData = {
    status: number;
}

export type hero = {
    name: string,
    surname: string,
    lastname: string,
    birthdate: string,
    phone: string,
    photo?: File | string,
    resume?: File | string,
}