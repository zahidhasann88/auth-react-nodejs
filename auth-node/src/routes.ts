import { Router } from "express";
import { login, register, user, logout } from "./controllers/auth.controller";
import { forgot, reset } from  "./controllers/forgot.controller";

export const routes = (router: Router) => {
    router.post('/api/register', register);
    router.post('/api/login', login);
    router.post('/api/register', user);
    router.get('/api/user', user);
    router.post('/api/logout', logout);
    router.post('/api/forgot', forgot);
    router.post('/api/reset', reset);
}