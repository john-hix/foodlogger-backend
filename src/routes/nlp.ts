import * as restify from 'restify';
import {RouteController} from './handlertype';
import NlpParser from '../lib/nlp';

// NLP route
export class Nlp implements RouteController {
    getRouteName() {
        return "nlp-parsing-by-meal";
    }
    headAll(req: restify.Request, res: restify.Response, next: restify.Next) {
        // TODO: A great place to check a circuit breaker!
        res.send(200);
        return next();
    }
    /**
     * Run the NLP split-up, then call Edamam for each chunked food text, then return result
     * As usual, getAll is just a GET request at the root of this route.
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req: restify.Request, res: restify.Response, next: restify.Next) {
        
        return next();
    }


    

}