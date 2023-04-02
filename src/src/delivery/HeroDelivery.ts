import { masterChain, statuses } from "@/consts";
import IHeroRepository from "@/repository/HeroRepository/IHeroRepository";
import { getActionChainData, getHeroData, setHeroLastnameData, setHeroNameData, setHeroPhoneData, setHeroPhotoData, setHeroResumeData, setHeroSurnameData } from "@/types";

export default class HeroDelivery {
    private heroRepository: IHeroRepository;

    constructor(heroRepository: IHeroRepository) {
        this.heroRepository = heroRepository
    }

    getHero(): getHeroData {
        const response = this.heroRepository.getHero();
        let result = {
            status: statuses.SERVER_ERROR,
            hero: {
                name: "",
                surname: "",
                lastname: "",
                birthdate: new Date(),
                phone: "",
            }
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    getActionChain(): getActionChainData {
        const response = this.heroRepository.getActionChain();
        let result = {
            status: statuses.SERVER_ERROR,
            actionChain: masterChain,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setName(name: string): setHeroNameData {
        const response = this.heroRepository.setHeroName(name);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setSurname(surname: string): setHeroSurnameData {
        const response = this.heroRepository.setHeroSurname(surname);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setLastname(lastname: string): setHeroLastnameData {
        const response = this.heroRepository.setHeroLastname(lastname);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setBirthdate(birthdate: Date): setHeroNameData {
        const response = this.heroRepository.setHeroBirthdate(birthdate);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setPhone(phone: string): setHeroPhoneData {
        const response = this.heroRepository.setHeroPhone(phone);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setPhoto(photo: File): setHeroPhotoData {
        const response = this.heroRepository.setHeroPhoto(photo);
        let result = {
            status: statuses.SERVER_ERROR,
            imagePath: ""
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setResume(resume: File): setHeroResumeData {
        const response = this.heroRepository.setHeroResume(resume);
        let result = {
            status: statuses.SERVER_ERROR,
            filePath: ""
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

}