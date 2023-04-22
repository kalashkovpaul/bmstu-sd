export type callback = (...args: any[]) => void;

export type event = string;

export type skill = {
    name: string,
    description: string,
    competence: number,
    startDate: Date,
    endDate: Date,
    link: string,
    image?: File | string,
}

export type saveSkillData = {
    newSkillName: string;
    skill: skill;
}

export type getSkillData = {
    status: number;
    skill: skill;
}

export type createSkillData = {
    status: number;
    skillName: string;
}

export type deleteSkillData = {
    status: number;
}

export type setSkillNameData = {
    status: number;
    skillName: string;
}

export type setSkillDescriptionData = {
    status: number;
}

export type setSkillCompetenceData = {
    status: number;
}

export type setSkillStartDateData = {
    status: number;
}

export type setSkillEndDateData = {
    status: number;
}

export type setSkillLinkData = {
    status: number;
}

export type setSkillImageData = {
    status: number;
    imagePath: string;
}

export type hero = {
    name: string,
    surname: string,
    lastname: string,
    birthdate: Date,
    phone: string,
    photo?: File | string,
    resume?: File | string,
}

export type getHeroData = {
    status: number;
    hero: hero;
}

export type getActionChainData = {
    status: number;
    actionChain: string;
}

export type setHeroNameData = {
    status: number;
}

export type setHeroSurnameData = {
    status: number;
}

export type setHeroLastnameData = {
    status: number;
}

export type setHeroBirthdateData = {
    status: number;
}

export type setHeroPhoneData = {
    status: number;
}

export type setHeroPhotoData = {
    status: number;
    imagePath: string;
}

export type setHeroResumeData = {
    status: number;
    filePath: string;
}

export type eventData = {
    actionCode: string;
}

export type rightsData = {
    isAdmin: boolean;
}