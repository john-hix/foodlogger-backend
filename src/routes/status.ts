
import * as restify from 'restify';
import {RouteController} from './handlertype';

// Health check route
export class Status implements RouteController {
    getRouteName() {
        return "status";
    }
    headAll(req: restify.Request, res: restify.Response, next: restify.Next) {
        res.send(200);
        return next();
    }
    getAll(req: restify.Request, res: restify.Response, next: restify.Next) {
        res.send(200);
        return next();
    }

}
