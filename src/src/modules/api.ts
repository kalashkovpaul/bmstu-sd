import Fastify, {FastifyInstance} from 'fastify';
import BaseComponent from './BaseComponent';
import { apiConfig } from '../configs/api.config';
import { events } from '../configs/events.config';
import { createSkillData, getHeroData, getSkillData, rightsData, saveSkillData, skillNames } from '../types';
import { statuses } from '../consts';

export class API extends BaseComponent {
    private api: FastifyInstance;

    constructor() {
        super();
        this.api = Fastify();
        this.api.get(apiConfig.getUser, this.getUser);
        this.api.put(apiConfig.onEvent, this.onEvent);
        this.api.get(apiConfig.checkRights, this.checkRights);
        this.api.post(apiConfig.saveHero, this.saveHero);
        this.api.get(apiConfig.getSkills, this.getSkillNames);
        this.api.put(apiConfig.getSkill, this.getSkill);
        this.api.post(apiConfig.createSkill, this.createSkill);
        this.api.post(apiConfig.deleteSkill, this.deleteSkill);
        this.api.post(apiConfig.saveSkill, this.saveSkill);
    }

    startServer = async () => {
        this.api.addContentTypeParser('application/json',
            { parseAs: "string"}, // buffer?
            (req, body: string, done) => {
                try {
                    const res = JSON.parse(body);
                    done(null, res);
                } catch (e) {
                    done(null, {});
                }
            }
        );
        console.log("SERVER listening on ", apiConfig.port);
        await this.api.listen(apiConfig.port, '0.0.0.0');
    }

    getUser = async (request: any, reply: any) => {
        this.bus.emit(events.getUser);
        const data = await new Promise<getHeroData>((resolve, reject) => {
            this.bus.on(events.gotUser, resolve);
        });
        reply.code(data.status).send(data.hero);
    }

    onEvent = async (request: any, reply: any) => {
        this.bus.emit(events.onEvent, JSON.parse(request.body));
        reply.code(statuses.SUCCESS).send({});
    }

    checkRights = async(request: any, reply: any) => {
        const data = await new Promise<rightsData>((resolve, reject) => {
            this.bus.on(events.noRights, () => {
                resolve({
                    isAdmin: false,
                })
            });
            this.bus.on(events.ownerUnlocked, () => {
                resolve({
                    isAdmin: true,
                })
            });
            this.bus.emit(events.checkRights);
        });
        reply.code(statuses.SUCCESS).send(data.isAdmin);
    }

    saveHero = async(request: any, reply: any) => {
        const data = await new Promise<getHeroData>((resolve, reject) => {
            this.bus.on(events.heroSaveResolved, resolve);
            const body = JSON.parse(request.body);
            this.bus.emit(events.saveHero, {...body.hero, birthdate: new Date(body.hero.birthdate)});
        });
        reply.code(data).send(data);
    }

    getSkillNames = async(request: any, reply: any) => {
        const data = await new Promise<skillNames>((resolve, reject) => {
            this.bus.on(events.gotSkillNames, resolve);
            this.bus.emit(events.getSkillNames);
        });
        reply.code(statuses.SUCCESS).send(data);
    }

    getSkill = async(request: any, reply: any) => {
        const data = await new Promise<getSkillData>((resolve, reject) => {
            this.bus.on(events.gotSkill, resolve);
            this.bus.emit(events.getSkill, JSON.parse(request.body));
        });
        reply.code(data.status).send(data);
    }

    createSkill = async(request: any, reply: any) => {
        const data = await new Promise<createSkillData>((resolve, reject) => {
            this.bus.on(events.skillCreateResolved, resolve);
            this.bus.emit(events.createSkill, JSON.parse(request.body).skillName);
        });
        reply.code(data).send(data);
    }

    deleteSkill = async(request: any, reply: any) => {
        const data = await new Promise<createSkillData>((resolve, reject) => {
            this.bus.on(events.skillDeleteResolved, resolve);
            this.bus.emit(events.deleteSkill, JSON.parse(request.body).skillName);
        });
        reply.code(data).send(data);
    }

    saveSkill = async(request: any, reply: any) => {
        const data = await new Promise<saveSkillData>((resolve, reject) => {
            this.bus.on(events.skillSaveResolved, resolve);
            const body = JSON.parse(request.body);
            this.bus.emit(events.saveSkill, {
                newSkillName: body.skill.name,
                skill: {
                    ...body.skill,
                    startDate: new Date(body.skill.startdate),
                    endDate: new Date(body.skill.enddate)
                }
            });
        });
        reply.code(data).send(data);
    }
}

export const api = new API();