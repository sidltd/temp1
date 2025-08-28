const { execSync } = require('child_process');
const request = require('supertest');
const { sequelize, User } = require('../models');
const { app } = require('../index');

beforeAll(async()=>{
    execSync("npx sequelize-cli db:migrate --env test")
});

afterAll(async()=>{
    await sequelize.close();
})

beforeEach(async()=>{
    execSync("npx sequelize-cli db:migrate:undo:all --env test")
    execSync("npx sequelize-cli db:migrate --env test")
})

describe("get users", ()=>{
    it("should return the users", async()=>{
        await User.create({ name: "ali", email: "ali@gmail.com", password: "*****" })
        await User.create({ name: "ahmed", email: "ahmed@gmail.com", password: "*****" })
    
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    })
})

describe("get all users", ()=>{
    it("should return all the users", async()=>{
        await User.create({ name: "ali", email: "ali@gmail.com", password: "*****" })
        await User.create({ name: "ahmed", email: "ahmed@gmail.com", password: "*****" })
    
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    })
})
