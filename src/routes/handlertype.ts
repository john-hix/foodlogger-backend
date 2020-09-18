import restify from 'restify';
import Joi from 'joi';

export interface RouteHandler {
    (req: restify.Request, res: restify.Response, next: restify.Next): void;
}

// A resource's ID is identified as the :id path parameter

export interface RouteController {
    getRouteName(): string,
    headAll?(req: restify.Request, res: restify.Response, next: restify.Next): void;
    getAll?(req: restify.Request, res: restify.Response, next: restify.Next): void;
    headById?(req: restify.Request, res: restify.Response, next: restify.Next): void;
    getById?(req: restify.Request, res: restify.Response, next: restify.Next): void;
    // Corresponds to POST
    create?(req: restify.Request, res: restify.Response, next: restify.Next): void;
    // Corresponds to PATCH
    update?(req: restify.Request, res: restify.Response, next: restify.Next): void;
    // Corresponds to PUT
    replace?(req: restify.Request, res: restify.Response, next: restify.Next): void;
    delete?(req: restify.Request, res: restify.Response, next: restify.Next): void;
  }

