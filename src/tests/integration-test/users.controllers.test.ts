import request from 'supertest';
import { container, types } from '../../inverfisy/inversify.config';
import { IApp } from '../../interfaces/app.interface';

let appInstance: IApp;

beforeAll(async () => { 
  appInstance = container.get<IApp>(types.App);
});

async function getToken():Promise<string> {
    const response = await getInstance("post","/auth/login").send({username:"John doe",password:"J123456"});
    return response.body.data.access_token;
}

function getInstance(method: 'get' | 'post' | 'put' | 'delete', endpoint: string = "/"): request.Test {
  const agent = request(appInstance.getApp());
  switch (method) {
    case 'get':
      return agent.get(endpoint);
    case 'post':
      return agent.post(endpoint);
    case 'put':
      return agent.put(endpoint);
    case 'delete':
      return agent.delete(endpoint);
    default:
      throw new Error(`Método HTTP no soportado: ${method}`);
  }
}

let body = {
    username: "John doe2",
    email:"johndoe2@hotmail.com",
    password:"J123456"
}

describe('Integration test in Users Controller', () => {
    const endpoint = "/users";

    let id_general:number;

    describe('Endpoint /users/create',()=> {
        it("Create user, success", async ()=> {
            const res = await getInstance("post",`${endpoint}/create`).send(body);
            const response = res.body;
            delete (body as any).password;
            id_general = response.data.id;
            expect(response).toMatchObject({
                "status": 200,
                "message": `User ${body.username} is succesfull created`,
                "data": {
                    "disabled": expect.any(Number),
                    "id": expect.any(Number),
                    ...body
                }
            })
        })
        it("Create user, bad request not send values", async ()=> {
            for (const key of Object.keys(body)) {
                let newBody = { ...body, [key]: "" };
                const res = await getInstance("post", `${endpoint}/create`).send(newBody);
                expect(res.body).toMatchObject({ status: 400, message: 'Bad request', data: {} });
            }
        })
        it("User already exists", async ()=> {
            const res = await getInstance("post",`${endpoint}/create`).send(body);
            const response = res.body;
            delete (body as any).password;
            expect(response).toMatchObject({
                "status": 400,
                "message": `User ${body.username} already exist`,
                "data": {
                }
            })
        })
    })

    describe('Endpoint /users/me', () => {
        it('Get user by ID', async ()=> {
            const token = await getToken();
            const res = await getInstance("get",`${endpoint}/me?id=${id_general}`).set('Authorization', `Bearer ${token}`);
            const response = res.body;
            expect(response).toMatchObject({
            status: 200,
            message: 'Info OK',
            data: {
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            role: [ 'ADMIN' ],
            disabled: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
            }
            })
        })
        it('Get user by ID, not send id', async ()=> {
            const token = await getToken();
            const res = await getInstance("get",`${endpoint}/me`).set('Authorization', `Bearer ${token}`);
            const response = res.body;
            expect(response).toMatchObject({ status: 400, message: 'Not send id in query params', data: {} })
        })
        it("Get user by id, user not found",async()=> {
            const token = await getToken();
            const id_local = 999
            const res = await getInstance("get",`${endpoint}/me?id=${id_local}`).set('Authorization', `Bearer ${token}`);
            const response = res.body;
            expect(response).toMatchObject({ status: 404, message: `User not found { iduser: ${id_local} }`, data: {} })
        })
        it('Get user by id, not send token',async ()=> {
            const res = await getInstance("get",`${endpoint}/me?id=${id_general}`);
            const response = res.body;
            expect(response).toMatchObject({ status: 401, message:  "Token not send", data: {} })
        })
    })

    describe('Endpoint /users/update', ()=> {
        it('Update user, success', async ()=> {
            const token = await getToken();
            const res = await getInstance("put",`${endpoint}/update?id=${id_general}`).set('Authorization', `Bearer ${token}`).send({username:"John doe3"})
            expect(res.body).toMatchObject({
                "status": 200,
                "message": "Succesfully upload user",
                "data": {
                }
            })
        })
        it('Update user, not send token', async ()=> {
            const res = await getInstance("put",`${endpoint}/update?id=${id_general}`).send({username:"John doe3"})
            expect(res.body).toMatchObject({
                "status": 401,
                "message": "Token not send",
                "data": {
                }
            })
        })
        it('Update user, success', async ()=> {
            const token = await getToken();
            const res = await getInstance("put",`${endpoint}/update`).set('Authorization', `Bearer ${token}`).send({username:"John doe3"})
            expect(res.body).toMatchObject({
                "status": 400,
                "message": 'Not send id in query params',
                "data": {
                }
            })
        })
    })

    describe("Endpoint /users/delete", ()=> {
        it('Update user, not send token', async ()=> {
            const res = await getInstance("put",`${endpoint}/update?id=${id_general}`)
            expect(res.body).toMatchObject({
                "status": 401,
                "message": "Token not send",
                "data": {
                }
            })
        })
        it('Update user, success', async ()=> {
            const token = await getToken();
            const res = await getInstance("put",`${endpoint}/update`).set('Authorization', `Bearer ${token}`)
            expect(res.body).toMatchObject({
                "status": 400,
                "message": 'Not send id in query params',
                "data": {
                }
            })
        })
        it('Delete user, success', async ()=> {
            const token = await getToken();
            const res = await getInstance("delete",`${endpoint}/delete?id=${id_general}`).set('Authorization', `Bearer ${token}`)
            expect(res.body).toMatchObject({
                "status": 200,
                "message": "Succesfully delete user",
                "data": {
                }
            })
        })
    })
})