import * as restify from 'restify';
import {InvalidContentError, InternalServerError, RestError, NotFoundError} from 'restify-errors';
import {Op, BaseError, WhereAttributeHash} from 'sequelize';
import {RouteController} from './handlertype';
import { User } from '../models/user';

import userMgt from '../clients/auth0-mgt';

// Users route
class Users implements RouteController {

    getRouteName() {
        return 'users';
    }
    headAll(req: restify.Request, res: restify.Response, next: restify.Next) {
        res.send(401);
        return next();     
    }
    getAll(req: restify.Request, res: restify.Response, next: restify.Next) {
        res.send(401);
        next();
    }

    async getById(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            let lookUpByAuth0 = true;
            let user: User | null = null;
            if (Number.isNaN(parseInt(req.params.id, 10))) {
                user = await User.findOne({
                    where: {
                        auth0Id: req.params.id
                    }
                });
            } else {
                user = await User.findByPk(req.params.id);
            }
            if (user === null) {
                res.send(404);
                next();
            }
            // @ts-ignore - says user might be undefined.
            res.send(200, user.toJSON());
            next();
            
        } catch (e) {
            next(e);
        }
    }
    
    // Allows User creation without authentication
    async create(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            const aId: string = req.body?.auth0Id;
            if (!aId) {
                throw new InvalidContentError('auth0Id is required');
            }
            // Verify user with auth0
            const a0User = await userMgt.getUser({
                id: aId
            });
            if (!a0User.user_id) {
                throw new InvalidContentError('Invalid auth0Id');
            }
            const ourUser = await User.create({
                auth0Id: a0User.user_id
            }, {
                isNewRecord: true
            });
            res.send(201, ourUser.toJSON());
            next();
        } catch(e) {
            if (e.statusCode && e.statusCode === 400) {
                next(new InvalidContentError('Invalid auth0Id'));
            }
            next(e);
        }
    }

    
}

export default Users;
