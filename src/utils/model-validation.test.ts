 
import {
    Sequelize, DataTypes, BaseError, UniqueConstraintError, Model
} from "sequelize";
import { ValidationError} from 'joi';
import JoifulValidation from './model-validation';

class TestModel extends Model {}

beforeAll((done) => {
    // Create in-memory db to run tests against
    const sequelize = new Sequelize('sqlite::memory:');
    TestModel.init({
        columnA: {
            type: DataTypes.INTEGER,
            unique: true
        }
    },
    {
        sequelize
    });
    sequelize.sync().then(() => {
        done();
    });
});

describe('static formatSeqToJoi()', () => {
    it('formats error without deep path mapping', (done) => {
        const original = {
            columnA: 1
        };
        TestModel.create(original)
        .then(() => {
            return TestModel.create(original)
        })
        .catch((e)=> {
            expect(JoifulValidation.formatSeqToJoi(e, original, undefined))
            .toEqual(new ValidationError('',[{
                type: 'any.unique',
                key: 'columnA',
                value: 1,
                paths: [
                    'columnA'
                ]
            }], original));
            done();
        });
    });
    it('formats error with deep path mapping', (done) => {
        const original = {
            columnA: 1
        };
        const pathMap = {
            'columnA': 'deep.in.an.object'
        }
        TestModel.create(original)
        .then(() => {
            return TestModel.create(original)
        })
        .catch((e)=> {
            expect(JoifulValidation.formatSeqToJoi(e, original, pathMap))
            .toEqual(new ValidationError('',[{
                type: 'any.unique',
                key: 'columnA',
                value: 1,
                paths: [
                    'deep',
                    'in',
                    'an',
                    'object'
                ]
            }], original));
            done();
        });
    });

});
