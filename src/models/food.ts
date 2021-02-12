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

// These are all the attributes in the Food model
export interface FoodAttributes {
    id: number;
    edamamId: string;
}

// Some attributes are optional in `Food.build` and `Food.create` calls
export interface FoodCreationAttributes extends Optional<FoodAttributes, "id"> {}
  
export class Food extends Model<FoodAttributes, FoodCreationAttributes>
    implements FoodAttributes {
    public id!: number;
    public edamamId!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
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
    public static buildCacheKey(foodId: number): string {
        return 'food:' + foodId.toString(36);
    }
}

Food.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    edamamId: {
        type: DataTypes.STRING(128),
        unique: true
    }
},
{
    tableName: "foods",
    paranoid: true,
    sequelize
});

export default Food;
