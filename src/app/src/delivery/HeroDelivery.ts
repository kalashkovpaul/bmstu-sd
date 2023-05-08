import logger from "../logger";
import { masterChain, statuses } from "../consts";
import IHeroRepository from "../repository/HeroRepository/IHeroRepository";
import { getActionChainData, getHeroData, setHeroLastnameData, setHeroNameData, setHeroPhoneData, setHeroPhotoData, setHeroResumeData, setHeroSurnameData } from "@/types";

export default class HeroDelivery {
    private heroRepository: IHeroRepository;

    constructor(heroRepository: IHeroRepository) {
        this.heroRepository = heroRepository
    }

    async getHero(): Promise<getHeroData> {
        try {
            const response = await this.heroRepository.getHero();
            return response;
        } catch(e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
                hero: {
                    name: "",
                    surname: "",
                    lastname: "",
                    birthdate: new Date(),
                    phone: "",
                }
            }
        };
    }

    async getActionChain(): Promise<getActionChainData> {
        try {
            const response = await this.heroRepository.getActionChain();
            return response;
        } catch(e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                actionChain: masterChain,
            }
        };
    }

    async setName(name: string): Promise<setHeroNameData> {
        try {
            const response = await this.heroRepository.setHeroName(name);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setSurname(surname: string): Promise<setHeroSurnameData> {
        try {
            const response = await this.heroRepository.setHeroSurname(surname);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setLastname(lastname: string): Promise<setHeroLastnameData> {
        try {
            const response = await this.heroRepository.setHeroLastname(lastname);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setBirthdate(birthdate: Date): Promise<setHeroNameData> {
        try {
            const response = await this.heroRepository.setHeroBirthdate(birthdate);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setPhone(phone: string): Promise<setHeroPhoneData> {
        try {
            const response = await this.heroRepository.setHeroPhone(phone);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }

        }
    }

    async setPhoto(photo: File): Promise<setHeroPhotoData> {
        try {
            const response = await this.heroRepository.setHeroPhoto(photo);
            return response;
        } catch(e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                imagePath: ""
            }
        }
    }

    async setResume(resume: File): Promise<setHeroResumeData> {
        try {
            const response = await this.heroRepository.setHeroResume(resume);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                filePath: ""
            }
        }
    }
}