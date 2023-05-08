import SkillValidator from "../modules/SkillValidator/SkillValidator";
import { skillValues } from "@/configs/validator.config";
jest.unmock("../modules/SkillValidator/SkillValidator");

class MockFile {
    name: string;
    size: number;
    type: string;
    constructor(name: string, size: number, type: string) {
      this.name = name;
      this.size = size;
      this.type = type;
    }
};

const cases = {
    skillName: [
        {
            test: "Empty name",
            name: "",
            output: false
        },
        {
            test: `${skillValues.name.min - 1} letter name`,
            name: new Array(skillValues.name.min - 1).join("a"),
            output: false,
        },
        {
            test: `${skillValues.name.min} letter name`,
            name: new Array(skillValues.name.min).join("a") + "a",
            output: true,
        },
        {
            test: `${skillValues.name.max - 1} letter name`,
            name: new Array(skillValues.name.max - 1).join("a") + "a",
            output: true,
        },
        {
            test: `${skillValues.name.max + 1} letter name`,
            name: new Array(skillValues.name.max + 1).join("a") + "a",
            output: false,
        },
    ],
    skillDescription: [
        {
            test: "Empty description",
            description: "",
            output: false
        },
        {
            test: `${skillValues.description.min - 1} letter description`,
            description: new Array(skillValues.description.min - 1).join("a") + "a",
            output: false,
        },
        {
            test: `${skillValues.description.min} letter description`,
            description: new Array(skillValues.description.min).join("a") + "a",
            output: true,
        },
        {
            test: `${skillValues.description.max - 1} letter description`,
            description: new Array(skillValues.description.max - 1).join("a") + "a",
            output: true,
        },
        {
            test: `${skillValues.description.max + 1} letter description`,
            description: new Array(skillValues.description.max + 1).join("a") + "a",
            output: false,
        },
    ],
    skillDateInterval: [
        {
            test: `Start > End`,
            start: new Date("02 04 2023"),
            end: new Date("01 04 2023"),
            output: false
        },
        {
            test: `Start === End`,
            start: new Date("01 04 2023"),
            end: new Date("01 04 2023"),
            output: false
        },
        {
            test: `Start < End`,
            start: new Date("01 04 2023"),
            end: new Date("02 04 2023"),
            output: true
        }
    ],
    skillLink: [
        {
            test: "Empty link",
            link: "",
            output: true
        },
        {
            test: `${skillValues.link.min + 1} letter link`,
            link: new Array(skillValues.link.min + 1).join("a") + "a",
            output: true,
        },
        {
            test: `${skillValues.link.max - 1} letter link`,
            link: new Array(skillValues.link.max - 1).join("a") + "a",
            output: true,
        },
        {
            test: `${skillValues.link.max + 1} letter link`,
            link: new Array(skillValues.link.max + 1).join("a") + "a",
            output: false,
        },
    ],
    skillImage: [
        {
            test: "Small image",
            file: new MockFile("a", 1, "image/png"),
            output: true
        },
        {
            test: "Zero size image",
            file: new MockFile("a", 0, "image/png"),
            output: true
        },
        {
            test: "Not image",
            file: new MockFile("a", 1, "application/pdf"),
            output: false
        },
        {
            test: "Empty name image",
            file: new MockFile("", 1, "image/png"),
            output: false
        },
        {
            test: `${skillValues.image.max} letter filename image`,
            file: new MockFile(new Array(skillValues.image.max).join("a") + "a", 1, "image/png"),
            output: true
        },
        {
            test: `${skillValues.image.max + 1} letter filename image`,
            file: new MockFile(new Array(skillValues.image.max + 1).join("a") + "a", 1, "image/png"),
            output: false
        },
    ]
}

describe('SkillValidator test', () => {
    const validator = new SkillValidator();
    describe('Skill name tests', () => {
        it.each(cases.skillName)("$test", ({name, output}) => {
            expect(validator.checkSkillName(name)).toBe(output);
        });
    });

    describe('Skill description tests', () => {
        it.each(cases.skillDescription)("$test", ({description, output}) => {
            expect(validator.checkDescription(description)).toBe(output);
        });
    });

    describe('Skill date tests', () => {
        it.each(cases.skillDateInterval)("$test", ({start, end, output}) => {
            expect(validator.checkDateInterval(start, end)).toBe(output);
        });
    });

    describe('Skill link tests', () => {
        it.each(cases.skillLink)("$test", ({link, output}) => {
            expect(validator.checkLink(link)).toBe(output);
        });
    });

    describe('Skill image tests', () => {
        it.each(cases.skillImage)("$test", ({file, output}) => {
            expect(validator.checkImage(file as File)).toBe(output);
        });
    });

});

