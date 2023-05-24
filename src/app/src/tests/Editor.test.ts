import Editor from "@/modules/Editor/Editor";
import { eventBus } from "@/modules/Bus/EventBus";
import SkillDelivery from "@/delivery/SkillDelivery";
import ISkillRepository from "@/repository/SkillRepository/ISkillRepository";
import HeroDelivery from "@/delivery/HeroDelivery";
import IHeroRepository from "@/repository/HeroRepository/IHeroRepository";
import { events } from "@/configs/events.config";
import { statuses } from "@/consts";
import WorkDelivery from "@/delivery/WorkDelivery";
import IWorkRespository from "@/repository/WorkRepository/IWorkRepository";

jest.deepUnmock("@/modules/Editor/Editor");
const skillRepository = {};
const heroRepository = {};
const workRepository = {}
const skillDelivery = new SkillDelivery(skillRepository as ISkillRepository);
const heroDelivery = new HeroDelivery(heroRepository as IHeroRepository);
const workDelivery = new WorkDelivery(workRepository as IWorkRespository)

const on = jest.fn();
const off = jest.fn();
const emit = jest.fn();

const testSkill = {
    newSkillName: "test",
    skill: {
        name: "testName",
        description: "testDescription",
        competence: 1,
        startDate: new Date("02 07 2003"),
        endDate: new Date("07 04 2023"),
        link: "link",
    }
};

const invalidSkill = {
    newSkillName: "",
    skill: {
        name: "",
        description: "",
        competence: -1,
        startDate: new Date("02 07 2003"),
        endDate: new Date("07 04 2000"),
        link: "",
    }
};



jest.mock("@/modules/Bus/EventBus", () => {

    const on = jest.fn().mockImplementation((event: string, callback: any) => {
        return callback;
    });
    const off = jest.fn();
    const emit = jest.fn();

    const fakeBus = {
        on: on,
        off: off,
        emit: emit,
    }

    return {
        __esModule: true,
        eventBus: fakeBus,
    }
});

describe("Editor test", () => {
    it("Editor constructor test", () => {
        const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
        expect(eventBus.on).toBeCalledTimes(1);
    });

    describe("Editor saveSkill", () => {
        it("not owner", () => {
            const f = jest.fn();
            eventBus.on(events.skillSaveResolved, f);
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            editor.saveSkill(testSkill);
            expect(eventBus.emit).toBeCalledWith(events.skillSaveResolved, statuses.FORBIDDEN);
        });

        it("owner, invalid args", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            (<any>editor).isOwner = true;
            editor.saveSkill(invalidSkill);
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillSaveResolved, statuses.INVALID_ARGS);
        });

        it("owner, all valid", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            jest.spyOn(skillDelivery, "setDescription").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS})
            }));
            jest.spyOn(skillDelivery, "setCompetence").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS})
            }));
            jest.spyOn(skillDelivery, "setStartDate").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS})
            }));
            jest.spyOn(skillDelivery, "setEndDate").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS})
            }));
            jest.spyOn(skillDelivery, "setDescription").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS})
            }));
            jest.spyOn(skillDelivery, "setDescription").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS})
            }));
            (<any>editor).isOwner = true;
            editor.saveSkill(testSkill);
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillSaveResolved, statuses.SUCCESS);
        });

        it("owner, delivery error", () => {
            jest.spyOn(skillDelivery, "setDescription").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR})
            }));
            jest.spyOn(skillDelivery, "setCompetence").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR})
            }));
            jest.spyOn(skillDelivery, "setStartDate").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR})
            }));
            jest.spyOn(skillDelivery, "setEndDate").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR})
            }));
            jest.spyOn(skillDelivery, "setDescription").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR})
            }));
            jest.spyOn(skillDelivery, "setDescription").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR})
            }));
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            (<any>editor).isOwner = true;
            editor.saveSkill(testSkill);
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillSaveResolved, statuses.SERVER_ERROR);
        });
    });

    describe("createSkill", () => {
        it("not owner", () => {
            const f = jest.fn();
            eventBus.on(events.skillCreateResolved, f);
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            editor.createSkill("test");
            expect(eventBus.emit).toBeCalledWith(events.skillSaveResolved, statuses.FORBIDDEN);
        });

        it("owner, invalid skillName", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            (<any>editor).isOwner = true;
            editor.createSkill("");
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillCreateResolved, statuses.INVALID_ARGS);
        });

        it("owner, all valid", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            jest.spyOn(skillDelivery, "createSkill").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS, skillName: ""})
            }));
            (<any>editor).isOwner = true;
            editor.createSkill("test");
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillCreateResolved, statuses.SUCCESS);
        });

        it("owner, skillDelivery error", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            jest.spyOn(skillDelivery, "createSkill").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR, skillName: ""})
            }));
            (<any>editor).isOwner = true;
            editor.createSkill("test");
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillCreateResolved, statuses.SERVER_ERROR);
        });
    });

    describe("deleteSkill", () => {
        it("not owner", () => {
            const f = jest.fn();
            eventBus.on(events.skillCreateResolved, f);
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            editor.deleteSkill("test");
            expect(eventBus.emit).toBeCalledWith(events.skillSaveResolved, statuses.FORBIDDEN);
        });

        it("owner, invalid skillName", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            (<any>editor).isOwner = true;
            editor.deleteSkill("");
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillDeleteResolved, statuses.INVALID_ARGS);
        });

        it("owner, all valid", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            jest.spyOn(skillDelivery, "deleteSkill").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SUCCESS})
            }));
            (<any>editor).isOwner = true;
            editor.deleteSkill("test");
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillDeleteResolved, statuses.SUCCESS);
        });

        it("owner, skillDelivery error", () => {
            const editor = new Editor({skillDelivery, heroDelivery, workDelivery});
            jest.spyOn(skillDelivery, "deleteSkill").mockReturnValue(new Promise(resolve => {
                resolve({status: statuses.SERVER_ERROR})
            }));
            (<any>editor).isOwner = true;
            editor.deleteSkill("test");
            expect(eventBus.emit).toHaveBeenLastCalledWith(events.skillDeleteResolved, statuses.SERVER_ERROR);
        });
    });

});