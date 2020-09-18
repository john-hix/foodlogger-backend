import * as restify from 'restify';
import {RouteController, RouteHandler} from './handlertype';
import {Status} from './status';
import Users from './users';

/**
 * setRoutes - adds our routes to the server instance
 * @uses [sequelize express example](https://github.com/sequelize/express-example/blob/a01fcc77d97c1da5078f3381243411a85d63965f/express-main-example/express/app.js) under MIT license
 * @concept loop over array of route controllers and register route handlers
 * @param app 
 */
export default (app: restify.Server) => {
  // List of our route objects
  let autoRegisterRoutes: Array<RouteController> = [
    new Status(),
    new Users()
  ];

  // Define the standard REST APIs for each route as they
  // are available
  for (const routeController of autoRegisterRoutes) {
    // Get route name
    const routeName = routeController.getRouteName();

    if (routeController.headAll) { // HEAD collection
      app.head(
        `/${routeName}`,
        routeController.headAll.bind(routeController)
      );
    }

    if (routeController.getAll) { // GET collection
      app.get(
        `/${routeName}`,
        routeController.getAll.bind(routeController)
      );
    }

    if (routeController.headById) { // HEAD resource
      app.head(
        `/${routeName}/:id`,
        routeController.headById.bind(routeController)
      );
    }
    if (routeController.getById) { // GET resource
      app.get(
        `/${routeName}/:id`,
        routeController.getById.bind(routeController)
      );
    }
    if (routeController.create) { // POST
      app.post(
        `/${routeName}`,
        routeController.create.bind(routeController)
      );
    }
    if (routeController.replace) { // PUT
      app.put(
        `/${routeName}/:id`,
        routeController.replace.bind(routeController)
      );
    }
    if (routeController.update) { // PATCH
      app.patch(
        `/${routeName}/:id`,
        routeController.update.bind(routeController)
      );
    }
    if (routeController.delete) { // DELETE
      app.del(
        `/${routeName}/:id`,
        routeController.delete.bind(routeController)
      );
    }
  }
}; // end modified sequelize express example
