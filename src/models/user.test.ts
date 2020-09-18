// Test precondition: database migrations have taken place via cli,
// including the one that creates test databases, 99991231233918-test-dbs.js
process.env.DB_NAME = 'test_users_model'; // Created in cli migration

import {User} from './user';

beforeAll((done) => {
    if (! process.env.CLIENT_TEST_USER_CREATE) {
        throw new Error("This test requires process.env.CLIENT_TEST_USER_CREATE")
    }
    User.destroy({
        force: true,
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    .then(() => {
        done();
    });
});

describe('Basic CRUD', ()=> {
    let id = -1;
    test('should create Users', (done) => {
        User.create({
            // @ts-ignore
            auth0Id: process.env.CLIENT_TEST_USER_CREATE
        },
        {
            isNewRecord: true
        }).then((user) => {
            id = user.id; // For next test
            expect(user).toBeDefined();
            expect(user.id).toEqual(1);
            expect(user.auth0Id).toEqual(process.env.CLIENT_TEST_USER_CREATE);
            done();
        });
    });

    test('should read a user', (done) => {
        User.findByPk(id).then((user) => {
            expect(user).not.toBeNull();
            expect(user?.id).toStrictEqual(1);
            expect(user?.auth0Id).toStrictEqual(process.env.CLIENT_TEST_USER_CREATE);
            expect((user?.createdAt.getTime() || 0)).toBeGreaterThanOrEqual(Date.now() - 2000);
            expect((user?.updatedAt.getTime() || 0)).toBeGreaterThanOrEqual(Date.now() - 2000);
            expect(user?.isSoftDeleted()).toBe(false);
            done();
        });
    });

    test('should SOFT delete a user', (done) => {
        User.destroy({
            where: {
                id
            }
        })
        .then((rowsAffected) => {
            expect(rowsAffected).toEqual(1);
            return User.findByPk(id, {paranoid: false});
        })
        .then((user) => {
            expect(user?.isSoftDeleted()).toBe(true);
            done();
        });
    });
});


describe('Caching', ()=> {
    test('builds cache key with user.id in base 36', () => {
        expect(User.buildCacheKey(1)).toEqual('user:1');
        expect(User.buildCacheKey(36)).toEqual('user:10');
        expect(User.buildCacheKey(14341344)).toEqual('user:8jduo');
    })
})

afterAll((done) => {
    User.sequelize?.close().then(() => { done(); })
});
