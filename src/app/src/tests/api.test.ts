import { apiConfig } from "@/configs/api.config";
import { statuses } from "@/consts";
import 'isomorphic-fetch';
import App from "@/modules/App";

jest.deepUnmock("@/modules/App");
jest.deepUnmock("isomorphic-fetch");

// const app = new App();
// app.start();

const flushPromises = () => new Promise(setImmediate);

describe("API tests", () => {
    it("/api/user", async () => {
        const url = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.getUser}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                mode: 'no-cors'
            });
            expect(response?.status).toEqual(statuses.SUCCESS);
        } catch (e) {
            console.log(e);
        }
    });

    it("/api/event", async () => {
        const url = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.onEvent}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                mode: 'no-cors',
                body: JSON.stringify({actionCode: 2})
            });
            expect(response?.status).toEqual(statuses.SUCCESS);
        } catch (e) {
            console.log(e);
        }
    });

    it("/api/check", async () => {
        const checkRightsUrl = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.checkRights}`;
        const onEventUrl = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.onEvent}`;
        try {
            let response = await fetch(onEventUrl, {
                method: "PUT",
                mode: 'no-cors',
                body: JSON.stringify({actionCode: 2})
            });
            expect(response?.status).toEqual(statuses.SUCCESS);
            response = await fetch(checkRightsUrl, {
                method: "GET",
                mode: 'no-cors',
            });
            expect(response?.status).toEqual(statuses.SUCCESS);
        } catch (e) {
            console.log(e);
        }
    });

    it("/api/saveHero", async () => {
        const url = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.saveHero}`;
        try {
            let response = await fetch(url, {
                method: "POST",
                mode: 'no-cors',
                body: JSON.stringify({
                    hero: {
                        name: "Paul",
                        surname: "Kalashkov",
                        lastname: "JS",
                        birthdate: new Date(),
                        phone: "+79850491141",
                    }
                })
            });
            expect(response?.status).toEqual(statuses.SUCCESS);
        } catch (e) {
            console.log(e);
        }
    })
});