import { createSkillData, deleteSkillData, getSkillData, setSkillCompetenceData, setSkillDescriptionData, setSkillEndDateData, setSkillImageData, setSkillLinkData, setSkillNameData, setSkillStartDateData, } from "@/types";

export default interface ISkillRepository {
    getSkill(skillName: string): Promise<getSkillData>;

    createSkill(skillName: string): Promise<createSkillData>;

    deleteSkill(skillName: string): Promise<deleteSkillData>;

    setSkillName(skillName: string, newSkillName: string):
        Promise<setSkillNameData>;

    setSkillDescription(skillName: string, newDescription: string):
        Promise<setSkillDescriptionData>;

    setSkillCompetence(skillName: string, newCompetense: number):
        Promise<setSkillCompetenceData>;

    setSkillStartDate(skillName: string, newStartDate: Date):
        Promise<setSkillStartDateData>;

    setSkillEndDate(skillName: string, newEndDate: Date):
        Promise<setSkillEndDateData>;

    setSkillLink(skillName: string, newLink: string):
        Promise<setSkillLinkData>;

    setSkillImage(skillName: string, newImage: File):
        Promise<setSkillImageData>;
}