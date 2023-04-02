import { heroValues } from "@/configs/validator.config";
import HeroValidator from "@/modules/HeroValidator/HeroValidator";
jest.unmock("@/modules/HeroValidator/HeroValidator");

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
    heroName: [
        {
            test: "Empty name",
            name: "",
            output: false
        },
        {
            test: `${heroValues.name.min - 1} letter name`,
            name: new Array(heroValues.name.min - 1).join("a"),
            output: false,
        },
        {
            test: `${heroValues.name.min} letter name`,
            name: new Array(heroValues.name.min).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.name.max - 1} letter name`,
            name: new Array(heroValues.name.max - 1).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.name.max + 1} letter name`,
            name: new Array(heroValues.name.max + 1).join("a") + "a",
            output: false,
        },
    ],
    heroSurname: [
        {
            test: "Empty surname",
            surname: "",
            output: false
        },
        {
            test: `${heroValues.surname.min - 1} letter surname`,
            surname: new Array(heroValues.surname.min - 1).join("a") + "a",
            output: false,
        },
        {
            test: `${heroValues.surname.min} letter surname`,
            surname: new Array(heroValues.surname.min).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.surname.max - 1} letter surname`,
            surname: new Array(heroValues.surname.max - 1).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.surname.max + 1} letter surname`,
            surname: new Array(heroValues.surname.max + 1).join("a") + "a",
            output: false,
        },
    ],
    heroLastname: [
        {
            test: "Empty lastname",
            lastname: "",
            output: false
        },
        {
            test: `${heroValues.lastname.min - 1} letter lastname`,
            lastname: new Array(heroValues.lastname.min - 1).join("a") + "a",
            output: false,
        },
        {
            test: `${heroValues.lastname.min} letter lastname`,
            lastname: new Array(heroValues.lastname.min).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.lastname.max - 1} letter lastname`,
            lastname: new Array(heroValues.lastname.max - 1).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.lastname.max + 1} letter lastname`,
            lastname: new Array(heroValues.lastname.max + 1).join("a") + "a",
            output: false,
        },
    ],
    heroPhoneNumber: [
        {
            test: "Empty phone",
            phone: "",
            output: false
        },
        {
            test: `${heroValues.phone.min - 1} letter phone`,
            phone: new Array(heroValues.phone.min - 1).join("a"),
            output: false,
        },
        {
            test: `${heroValues.phone.min} letter phone`,
            phone: new Array(heroValues.phone.min).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.phone.max - 1} letter phone`,
            phone: new Array(heroValues.phone.max - 1).join("a") + "a",
            output: true,
        },
        {
            test: `${heroValues.phone.max + 1} letter phone`,
            phone: new Array(heroValues.phone.max + 1).join("a") + "a",
            output: false,
        },
    ],
    heroBirthdate: [
        {
            test: "Born before now",
            date: new Date("02 07 2003"),
            output: true,
        },
        {
            test: "Born in the future",
            date: new Date("02 07 2103"),
            output: false
        }
    ],
    heroPhoto: [
        {
            test: "Small photo",
            file: new MockFile("a", 1, "image/png"),
            output: true
        },
        {
            test: "Zero size photo",
            file: new MockFile("a", 0, "image/png"),
            output: true
        },
        {
            test: "Not photo",
            file: new MockFile("a", 1, "application/pdf"),
            output: false
        },
        {
            test: "Empty name photo",
            file: new MockFile("", 1, "image/png"),
            output: false
        },
        {
            test: `${heroValues.photo.max} letter filename photo`,
            file: new MockFile(new Array(heroValues.photo.max).join("a") + "a", 1, "image/png"),
            output: true
        },
        {
            test: `${heroValues.photo.max + 1} letter filename photo`,
            file: new MockFile(new Array(heroValues.photo.max + 1).join("a") + "a", 1, "image/png"),
            output: false
        },
    ],
    heroResume: [
        {
            test: "Small resume",
            file: new MockFile("a", 1, "application/pdf"),
            output: true
        },
        {
            test: "Zero size resume",
            file: new MockFile("a", 0, "application/pdf"),
            output: true
        },
        {
            test: "Not pdf",
            file: new MockFile("a", 1, "image/png"),
            output: false
        },
        {
            test: "Empty name resume",
            file: new MockFile("", 1, "application/pdf"),
            output: false
        },
        {
            test: `${heroValues.resume.max} letter filename resume`,
            file: new MockFile(new Array(heroValues.resume.max).join("a") + "a", 1, "application/pdf"),
            output: true
        },
        {
            test: `${heroValues.resume.max + 1} letter filename presumehoto`,
            file: new MockFile(new Array(heroValues.resume.max + 1).join("a") + "a", 1, "application/pdf"),
            output: false
        },
    ]
}

describe('HeroValidator test', () => {
    const validator = new HeroValidator();
    describe('Hero name tests', () => {
        it.each(cases.heroName)("$test", ({name, output}) => {
            expect(validator.checkHeroName(name)).toBe(output);
        });
    });

    describe('Hero surname tests', () => {
        it.each(cases.heroSurname)("$test", ({surname, output}) => {
            expect(validator.checkHeroSurname(surname)).toBe(output);
        });
    });

    describe('Hero lastname tests', () => {
        it.each(cases.heroLastname)("$test", ({lastname, output}) => {
            expect(validator.checkHeroLastname(lastname)).toBe(output);
        });
    });

    describe('Hero birthdate tests', () => {
        it.each(cases.heroBirthdate)("$test", ({date, output}) => {
            expect(validator.checkBirthdate(date)).toBe(output);
        });
    });

    describe('Hero photo tests', () => {
        it.each(cases.heroPhoto)("$test", ({file, output}) => {
            expect(validator.checkPhoto(file as File)).toBe(output);
        });
    });

    describe('Hero resume tests', () => {
        it.each(cases.heroResume)("$test", ({file, output}) => {
            expect(validator.checkResume(file as File)).toBe(output);
        });
    });

});

