import request from 'supertest';
import { container, types } from '../../inverfisy/inversify.config';
import { IApp } from '../../interfaces/app.interface';

let appInstance: IApp;

beforeAll(async () => {
  appInstance = container.get<IApp>(types.App);
});

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

describe('Integration test in Auth Controller', () => {
  const endpoint = "/auth/login"
  it('Success Login', async () => {
    const res = await getInstance("post",endpoint).send({username:"John doe",password:"J123456"});
    const response = res.body;
    expect(response.data).not.toHaveProperty('password');
    expect(response).toMatchObject({
          status: 200,
          message: "Succesfull Auth",
          data: {
            id: expect.any(Number),
            username: "John doe",
            email: "JohnDoe@hotmail.com",
            role: ["ADMIN"],
            disabled: 0,
            access_token: expect.any(String)
          }
    })
  });
  it('Fail Login, not send username', async () => {
    const res = await getInstance("post",endpoint).send({username:"",password:"J123456"});
    const response = res.body;
    expect(response).toMatchObject({ status: 400, message: 'Please enter a username', data: {} })
  })
  it('Fail Login, not send password', async () => {
    const res = await getInstance("post",endpoint).send({username:"John doe",password:""});
    const response = res.body;
    expect(response).toMatchObject({ status: 400, message: 'Please enter a password', data: {} })
  })
  it('Fail Login, incorrect username', async () => {
    const res = await getInstance("post",endpoint).send({username:"Juhn due",password:"J123456"});
    const response = res.body;
    expect(response).toMatchObject({ status: 404, message: 'Email or username incorrect', data: {} })
  })
  it('Fail Login, incorrect password', async () => {
    const res = await getInstance("post",endpoint).send({username:"John doe",password:"asdfdfds"});
    const response = res.body;
    expect(response).toMatchObject({ status: 404, message: 'Password incorrect', data: {} })
  })
});