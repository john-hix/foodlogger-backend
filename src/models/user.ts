import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    ModelAttributes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
    InitOptions
} from "sequelize";
import JoifulValidationError from '../utils/model-validation';
import { ValidationOptions } from "sequelize/types/lib/instance-validator";

import sequelize from '../clients/db';

// These are all the attributes in the User model
export interface UserAttributes {
    id: number;
    auth0Id: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
  
export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public auth0Id!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // Tells you if the password on this instance is hashed

    /**
     * Copies sequelize functionality but emits Joi-like errors
     * 
     * Validate the attribute of this instance according to validation rules set in the model definition.
     * 
     * Emits null if and only if validation successful; otherwise an Error instance containing { field name : [error msgs] } entries.
     * 
     * @param options.skip — An array of strings. All properties that are in this array will not be validated
     * @throws JoifulValidationError
     */
    public async validate(options?: ValidationOptions | undefined) {
        try {
            await super.validate();
        } catch(e) {
            throw new JoifulValidationError(e.message, e.errors, this.toJSON());
        }
    }
    public static buildCacheKey(userId: number): string {
        return 'user:' + userId.toString(36);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    auth0Id: {
        type: DataTypes.STRING(128),
        unique: true
    }
},
{
    tableName: "users",
    paranoid: true,
    sequelize
});

export default User;
