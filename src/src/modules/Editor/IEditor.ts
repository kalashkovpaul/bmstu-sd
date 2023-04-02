import { hero, saveSkillData, } from "@/types";

export default interface IEditor {
    saveSkill(skillData: saveSkillData): void;

    createSkill(skillName: string): void;

    deleteSkill(skillName: string): void;

    saveHeroData(hero: hero): void;
}