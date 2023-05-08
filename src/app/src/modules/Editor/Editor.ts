import { events } from "../../configs/events.config";
import { statuses } from "../../consts";
import HeroDelivery from "../../delivery/HeroDelivery";
import SkillDelivery from "../../delivery/SkillDelivery";
import { getSkillProps, hero, saveSkillData, } from "../../types";
import BaseComponent from "../BaseComponent";
import HeroValidator from "../HeroValidator/HeroValidator";
import IHeroValidator from "../HeroValidator/IHeroValidator";
import ISkillValidator from "../SkillValidator/ISkillValidator";
import SkillValidator from "../SkillValidator/SkillValidator";
import IEditor from "./IEditor";

export default class Editor extends BaseComponent implements IEditor {
    private isOwner: boolean;
    private skillValidator: ISkillValidator;
    private heroValidator: IHeroValidator;
    private skillDelivery: SkillDelivery;
    private heroDelivery: HeroDelivery;

    constructor(skillDelivery: SkillDelivery, heroDelivery: HeroDelivery) {
        super();
        this.isOwner = false;
        this.skillValidator = new SkillValidator();
        this.heroValidator = new HeroValidator();
        this.skillDelivery = skillDelivery;
        this.heroDelivery = heroDelivery;

        let that = this;
        this.bus.on(events.ownerUnlocked, function() {
            that.isOwner = true;
        });
    }

    getSkillNames() {
        this.skillDelivery.getSkillNames()
            .then((result) => {
                this.bus.emit(events.gotSkillNames, result);
            });
    }

    getSkill(props: getSkillProps) {
        this.skillDelivery.getSkill(props.skillName)
            .then(result => {
                this.bus.emit(events.gotSkill, result);
            });
    }

    async saveSkill(skillData: saveSkillData) {
        const {skill} = skillData
        if (!this.isOwner) {
            this.bus.emit(events.skillSaveResolved, statuses.FORBIDDEN);
            return;
        }
        if (this.skillValidator.checkSkill(skill)) {
            let results = [];
            results.push((await this.skillDelivery.setDescription(
                skill.name,
                skill.description
            )).status);
            results.push((await this.skillDelivery.setCompetence(
                skill.name,
                skill.competence
            )).status);
            results.push((await this.skillDelivery.setStartDate(
                skill.name,
                skill.startDate
            )).status);
            results.push((await this.skillDelivery.setEndDate(
                skill.name,
                skill.endDate
            )).status);
            results.push((await this.skillDelivery.setDescription(
                skill.name,
                skill.description
            )).status);
            results.push(skill.image ? (await this.skillDelivery.setImage(
                skill.name,
                skill.image as File
            )).status : statuses.SUCCESS);
            if (results.every(status => status === statuses.SUCCESS)) {
                this.bus.emit(events.skillSaveResolved, statuses.SUCCESS);
            } else {
                this.bus.emit(events.skillSaveResolved, statuses.SERVER_ERROR)
            }
        } else {
            this.bus.emit(events.skillSaveResolved, statuses.INVALID_ARGS);
        }
    }

    async createSkill(skillName: string) {
        if (!this.isOwner) {
            this.bus.emit(events.skillCreateResolved, statuses.FORBIDDEN);
            return;
        }
        if (this.skillValidator.checkSkillName(skillName)) {
            if ((await this.skillDelivery.createSkill(skillName)).status ===
                statuses.SUCCESS) {
                    this.bus.emit(events.skillCreateResolved, statuses.SUCCESS);
                } else {
                    this.bus.emit(events.skillCreateResolved, statuses.SERVER_ERROR);
                }
        } else {
            this.bus.emit(events.skillCreateResolved, statuses.INVALID_ARGS)
        }
    };

    async deleteSkill(skillName: string) {
        if (!this.isOwner) {
            this.bus.emit(events.skillDeleteResolved, statuses.FORBIDDEN);
            return;
        }
        if (this.skillValidator.checkSkillName(skillName)) {
            if ((await this.skillDelivery.deleteSkill(skillName)).status ===
                statuses.SUCCESS) {
                    this.bus.emit(events.skillDeleteResolved, statuses.SUCCESS);
                } else {
                    this.bus.emit(events.skillDeleteResolved, statuses.SERVER_ERROR);
                }
        } else {
            this.bus.emit(events.skillDeleteResolved, statuses.INVALID_ARGS)
        }
    };

    async saveHeroData(hero: hero) {
        if (!this.isOwner) {
            this.bus.emit(events.heroSaveResolved, statuses.FORBIDDEN);
            return;
        }
        if (this.heroValidator.checkHero(hero)) {
            let results = [];
            results.push((await this.heroDelivery.setName(
                hero.name,
            )).status);
            results.push((await this.heroDelivery.setSurname(
                hero.surname,
            )).status);
            results.push((await this.heroDelivery.setLastname(
                hero.lastname,
            )).status);
            results.push((await this.heroDelivery.setBirthdate(
                hero.birthdate,
            )).status);
            results.push((await this.heroDelivery.setPhone(
                hero.phone,
            )).status);
            results.push(hero.photo ? (await this.heroDelivery.setPhoto(
                hero.photo as File
            )).status : statuses.SUCCESS);
            results.push(hero.resume ? (await this.heroDelivery.setResume(
                hero.resume as File
            )).status : statuses.SUCCESS);
            if (results.every(status => status === statuses.SUCCESS)) {
                this.bus.emit(events.heroSaveResolved, statuses.SUCCESS);
            } else {
                this.bus.emit(events.heroSaveResolved, statuses.SERVER_ERROR)
            }
        } else {
            this.bus.emit(events.heroSaveResolved, statuses.INVALID_ARGS);
        }
    };
}