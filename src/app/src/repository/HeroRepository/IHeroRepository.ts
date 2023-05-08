import { getActionChainData, getHeroData, setHeroBirthdateData, setHeroLastnameData, setHeroNameData, setHeroPhoneData, setHeroPhotoData, setHeroResumeData, setHeroSurnameData } from "@/types";

export default interface IHeroRepository {
    getHero(): Promise<getHeroData>;

    getActionChain(): Promise<getActionChainData>;

    setHeroName(heroName: string): Promise<setHeroNameData>;

    setHeroSurname(heroSurname: string): Promise<setHeroSurnameData>;

    setHeroLastname(heroLastname: string): Promise<setHeroLastnameData>;

    setHeroBirthdate(birthdate: Date): Promise<setHeroBirthdateData>;

    setHeroPhone(phone: string): Promise<setHeroPhoneData>;

    setHeroPhoto(photo: File): Promise<setHeroPhotoData>;

    setHeroResume(resume: File): Promise<setHeroResumeData>;
}