import Editor from "@/modules/Editor/Editor";
import { eventBus } from "@/modules/Bus/EventBus";
import SkillDelivery from "@/delivery/SkillDelivery";
import ISkillRepository from "@/repository/SkillRepository/ISkillRepository";
import HeroDelivery from "@/delivery/HeroDelivery";
import IHeroRepository from "@/repository/HeroRepository/IHeroRepository";
import { events } from "@/configs/events.config";
import { statuses } from "@/consts";
import Administrator from "@/modules/Administrator/Administrator";

jest.deepUnmock("@/modules/Administrator/Administrator");
const heroRepository = {};
const heroDelivery = new HeroDelivery(heroRepository as IHeroRepository);

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
    afterEach(() => {
        jest.clearAllMocks();
      });

    it("enable ownerShip with 1 event", () => {
        const testChain = "1234";
        jest.spyOn(heroDelivery, "getActionChain").mockReturnValue({status: statuses.SUCCESS, actionChain: testChain});
        const administrator = new Administrator(heroDelivery);
        administrator.onEvent({actionCode: testChain});
        administrator.checkAction();
        expect(eventBus.emit).toHaveBeenLastCalledWith(events.ownerUnlocked);
    });

    it("enable ownerShip with 1 event", () => {
        const actionCodes = ["1", "2", "3", "4"];
        jest.spyOn(heroDelivery, "getActionChain").mockReturnValue({status: statuses.SUCCESS, actionChain: actionCodes.join("")});
        const administrator = new Administrator(heroDelivery);
        actionCodes.forEach(code => {
            administrator.onEvent({actionCode: code});
        })
        administrator.checkAction();
        expect(eventBus.emit).toHaveBeenLastCalledWith(events.ownerUnlocked);
    });

    it("ownerShip not enabled", () => {
        const actionCodes = ["1", "2", "3", "4"];
        jest.spyOn(heroDelivery, "getActionChain").mockReturnValue({status: statuses.SUCCESS, actionChain: actionCodes.join("")});
        const administrator = new Administrator(heroDelivery);
        administrator.checkAction();
        expect(eventBus.emit).not.toHaveBeenCalled();
    });
});