import { getSkillProps, hero, saveSkillData, } from "@/types";

export default interface IEditor {
    getSkillNames(): void;

    getSkill(id: number, props: getSkillProps): void;

    saveSkill(skillData: saveSkillData): void;

    createSkill(skillName: string): void;

    deleteSkill(skillName: string): void;

    saveHeroData(hero: hero): void;
}