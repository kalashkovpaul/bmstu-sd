import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors'
import BaseComponent from './BaseComponent';
import { apiConfig } from '../configs/api.config';
import { events } from '../configs/events.config';
import { createSkillData, createWorkData, deleteWorkData, getHeroData, getSkillData, getWorkData, rightsData, saveSkillData, saveWorkData, skillNames } from '../types';
import { statuses } from '../consts';
import logger from '../logger';

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
        this.api.get(apiConfig.getWorks, this.getWorkNames);
        this.api.put(apiConfig.getWork, this.getWork);
        this.api.post(apiConfig.createWork, this.createWork);
        this.api.post(apiConfig.deleteWork, this.deleteWork);
        this.api.post(apiConfig.saveWork, this.saveWork);
    }

    init = async () => {
        await this.api.register(cors, {
            origin: "http://localhost:8005"
        });
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
        logger.info(`${request.method} ${request.url}`);
        this.bus.emit(events.getUser);
        const data = await new Promise<getHeroData>((resolve, reject) => {
            this.bus.on(events.gotUser, resolve);
        });
        logger.info(data);
        logger.info(`${request.method} ${request.url}, return ${data.status}`);
        reply.code(data.status).send(data.hero);
    }

    onEvent = async (request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        this.bus.emit(events.onEvent, JSON.parse(request.body));
        logger.info(`${request.method} ${request.url}, return ${statuses.SUCCESS}`);
        reply.code(statuses.SUCCESS).send({});
    }

    checkRights = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
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
        logger.info(`${request.method} ${request.url}, return ${statuses.SUCCESS}`);
        reply.code(statuses.SUCCESS).send(data.isAdmin);
    }

    saveHero = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<getHeroData>((resolve, reject) => {
            this.bus.on(events.heroSaveResolved, resolve);
            const body = JSON.parse(request.body);
            this.bus.emit(events.saveHero, {...body.hero, birthdate: new Date(body.hero.birthdate)});
        });
        logger.info(`${request.method} ${request.url}, return ${data}`);
        reply.code(data).send(data);
    }

    getSkillNames = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<skillNames>((resolve, reject) => {
            this.bus.on(events.gotSkillNames, resolve);
            this.bus.emit(events.getSkillNames);
        });
        logger.info(`${request.method} ${request.url}, return ${statuses.SUCCESS}`);
        reply.code(statuses.SUCCESS).send(data);
    }

    getSkill = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const id = Math.floor(Math.random() * 100000);
        const data = await new Promise<getSkillData>((resolve, reject) => {
            this.bus.on(events.gotSkill, (i, data) => {
                if (i === id) {
                    resolve(data);
                }
            });
            this.bus.emit(events.getSkill, id, JSON.parse(request.body));
        });
        logger.info(`${request.method} ${request.url}, return ${data.status}`);
        reply.code(data.status).send(data);
    }

    createSkill = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<createSkillData>((resolve, reject) => {
            this.bus.on(events.skillCreateResolved, resolve);
            this.bus.emit(events.createSkill, JSON.parse(request.body).skillName);
        });
        logger.info(`${request.method} ${request.url}, return ${data}`);
        reply.code(data).send(data);
    }

    deleteSkill = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<createSkillData>((resolve, reject) => {
            this.bus.on(events.skillDeleteResolved, resolve);
            this.bus.emit(events.deleteSkill, JSON.parse(request.body).skillName);
        });
        logger.info(`${request.method} ${request.url}, return ${data}`);
        reply.code(data).send(data);
    }

    saveSkill = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
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
        logger.info(`${request.method} ${request.url}, return ${data}`);
        reply.code(data).send(data);
    }

    getWorkNames = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<string[]>((resolve, reject) => {
            this.bus.on(events.gotWorkNames, resolve);
            this.bus.emit(events.getWorkNames);
        });
        logger.info(`${request.method} ${request.url}, return ${statuses.SUCCESS}`);
        reply.code(statuses.SUCCESS).send(data);
    }

    getWork = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const id = Math.floor(Math.random() * 100000);
        const data = await new Promise<getWorkData>((resolve, reject) => {
            this.bus.on(events.gotWork, (i, data) => {
                if (i === id) {
                    resolve(data);
                }
            });
            this.bus.emit(events.getWork, id, JSON.parse(request.body));
        });
        logger.info(`${request.method} ${request.url}, return ${data.status}`);
        reply.code(data.status).send(data);
    }

    createWork = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<createWorkData>((resolve, reject) => {
            this.bus.on(events.workCreateResolved, resolve);
            this.bus.emit(events.createWork, JSON.parse(request.body).workName);
        });
        logger.info(`${request.method} ${request.url}, return ${data}`);
        reply.code(data).send(data);
    }

    deleteWork = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<createWorkData>((resolve, reject) => {
            this.bus.on(events.workDeleteResolved, resolve);
            this.bus.emit(events.deleteWork, JSON.parse(request.body).workName);
        });
        logger.info(`${request.method} ${request.url}, return ${data}`);
        reply.code(data).send(data);
    }

    saveWork = async(request: any, reply: any) => {
        logger.info(`${request.method} ${request.url}`);
        const data = await new Promise<saveWorkData>((resolve, reject) => {
            this.bus.on(events.workSaveResolved, resolve);
            const body = JSON.parse(request.body);
            this.bus.emit(events.saveWork, {
                newWorkName: body.work.name,
                work: {
                    ...body.work
                }
            });
        });
        logger.info(`${request.method} ${request.url}, return ${data}`);
        reply.code(data).send(data);
    }
}

export const api = new API();