import { setWorkNameData, workData, createWorkData, deleteWorkData, setWorkDescriptionData, setWorkHrefData, setWorkImageData, getWorkData, } from "@/types";

export default interface IWorkRespository {
    getWorks(): Promise<string[]>;

    getWork(workName: string): Promise<getWorkData>;

    createWork(workName: string): Promise<createWorkData>;

    deleteWork(workName: string): Promise<deleteWorkData>;

    setWorkName(workName: string, newWorkName: string):
        Promise<setWorkNameData>;

    setWorkDescription(workName: string, newDescription: string):
        Promise<setWorkDescriptionData>;

    setWorkHref(workName: string, newHref: string):
        Promise<setWorkHrefData>;

    setWorkImage(workName: string, newImage: string):
        Promise<setWorkImageData>;
}