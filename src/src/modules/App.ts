import HeroDelivery from "../delivery/HeroDelivery";
import BaseComponent from "./BaseComponent";
import Administrator from "./Administrator/Administrator";
import HeroRepository from "../repository/HeroRepository/HeroRepository";
import { events } from "../configs/events.config";
import { API, api } from "./api";
import Editor from "./Editor/Editor";
import SkillDelivery from "../delivery/SkillDelivery";
import SkillRepository from "../repository/SkillRepository/SkillRepository";

export default class App extends BaseComponent {
    private heroDelivery: HeroDelivery;
    private skillDelivery: SkillDelivery;
    private administrator: Administrator;
    private editor: Editor;
    private api: API;

    constructor() {
        super();
        this.heroDelivery = new HeroDelivery(HeroRepository);
        this.skillDelivery = new SkillDelivery(SkillRepository)
        this.administrator = new Administrator(this.heroDelivery);
        this.editor = new Editor(this.skillDelivery, this.heroDelivery);
        this.api = api;
        this.registerComponents();
    }

    start() {
        this.api.startServer();
    }

    registerComponents() {
        this.bus.on(events.getUser, this.administrator.getHero.bind(this.administrator));
        this.bus.on(events.onEvent, this.administrator.onEvent.bind(this.administrator));
        this.bus.on(events.checkRights, this.administrator.checkAction.bind(this.administrator));
        this.bus.on(events.saveHero, this.editor.saveHeroData.bind(this.editor));
        this.bus.on(events.getSkillNames, this.editor.getSkillNames.bind(this.editor));
        this.bus.on(events.getSkill, this.editor.getSkill.bind(this.editor));
        this.bus.on(events.createSkill, this.editor.createSkill.bind(this.editor));
        this.bus.on(events.deleteSkill, this.editor.deleteSkill.bind(this.editor));
        this.bus.on(events.saveSkill, this.editor.saveSkill.bind(this.editor));
    }
}