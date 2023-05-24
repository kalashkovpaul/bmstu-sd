import { skill, workData } from "@/types";

export default interface IWorkValidator {
    checkWork(work: workData): boolean;

    checkWorkName(name: string): boolean;

    checkDescription(description: string): boolean;

    checkHref(href: string): boolean;

    checkImage(image: string): boolean;
}