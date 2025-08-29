const request = require("supertest");
const { execSync } = require('child_process');
const { app } = require("../index");
const { sequelize, User, Post } = require('../models');

beforeEach(async() => {
    execSync("npx sequelize-cli db:migrate:undo:all --env test")
    execSync("npx sequelize-cli db:migrate --env test")
    await User.create({ name: "ali", email: "ali@gmail.com", password: "****" })
    await User.create({ name: "ahmed", email: "ahmed@gmail.com", password: "****" })
})

afterAll(async()=>{
    await sequelize.close();
})

describe("get all the posts", ()=>{
    it("should return all the posts", async()=>{
        await Post.create({ title: "first", body: "this is the body", userId: 1 })
        await Post.create({ title: "second", body: "this is the body", userId: 1 })
        const res = await request(app).get("/posts");
        expect(res.body.length).toBe(2);
    })
})


describe("it should create posts", ()=>{
    it("should create post", async()=>{
        const res = await request(app).post('/posts').send({ title: "first", body: "body", userId: 1 })
        const savedPost = res.body;
        expect(savedPost.id).toBe(1);
    })
})