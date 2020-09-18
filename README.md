# foodlogger backend (WIP)

The main server-side component for a
food logger and nutrient tracker app. It is in active development.
Take a look at the OpenAPI spec (`openapi.yml`) to see where this project is going.

- JWT authentication with login done through auth0
- Food and nutrition data through [Edamam's](https://developer.edamam.com/) API
- Postgres database
- Redis LRU cache (planned)

See `CONTRIBUTING.md` for details on running the server.

# OpenAPI Specification

General features of the API are described below.
See `./openapi.yaml` for details on specific endpoints.
A Swagger editor container is included in the project's
`docker-compose` setup if desired.

## Pagination

Pointer-based pagination when data is organized by date; otherwise, 
it is normal pagination with a `pages.next` and/or `pages.prev` included
in the response body (JSON properties). The value of the `next` or `prev`
properties are hypermedia.

- Optional `starting_after`: date, mm-dd-yyyy
- Optional `ending_before`: date, mm-dd-yyyy
- Optional `limit` defaults to 10
- Optional `page` defaults to 1

## Sorting

Resources differ on what they are sorted by, but the order will always
be specified with this parameter:
- `order`, either `ASC` or `DESC`.
- `orderby` specifies a field by which to order the resource collection.
 Check that endpoint's documentation for eligible fields. 

## Food nutrients

Nutrients are included in responses as a key-value mapping. When used used
to describe nutrients contained in a given food, the value is per 100 grams
of the food. The schema for these keys is given below:

```yaml
    KCAL:
        type: number
        example: 52
    FAT:
        type: number
        example: 0.17
    CARBS:
        type: number
        example: 13.81
    PROT:
        type: number
        example: 0.26
    FIBER:
        type: number
        example: 2.4
```
# Third-party code not in dependencies
Some code in `./src/routes/index.ts`, as indicated in comments, was reused and modified from the [Sequelize Express example](https://github.com/sequelize/express-example) under the MIT license.
 
# Copyright
Copyright (C) 2020  John Hicks.
All rights reserved.
