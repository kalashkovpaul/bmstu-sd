import Fastify, {FastifyInstance} from 'fastify';
import BaseComponent from './BaseComponent';
import { apiConfig } from '../configs/api.config';
import { events } from '../configs/events.config';
import { getHeroData, rightsData } from '../types';
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
        this.bus.emit(events.onEvent, request.body);
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
            this.bus.emit(events.saveHero, request.body);
        });
        console.log("Saved???");
        reply.code(data).send(data);
    }
}

export const api = new API();