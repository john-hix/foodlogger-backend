import {ValidationError as SeqValidationError, ValidationErrorItem} from 'sequelize';
import {ValidationError as JoiValidationError} from 'joi';

/**
 * An error class to throw from Sequelize model's validate method,
 * maps Sequelize error items to Joi error items
 * 
 * It makes it easier to pass validation errors back to the client,
 * since the controllers already use Joi
 */
export default class JoifulValidationError extends SeqValidationError {
    public joiErrors: JoiValidationError;

    /**
     * Validation Error. Thrown when the sequelize validation has failed. The error contains an errors property, which is an array with 1 or more ValidationErrorItems, one for each validation that failed.
     * @param message Error message
     * @param errors Array of ValidationErrorItem objects describing the validation errors
     * @param original The original value.
     * @param attrMapping A mapping from the Sequelize instance fields to different/deeper fields in a Joi Object
     */
    constructor(message: string, errors?: ValidationErrorItem[] | undefined, original?: object,
        attrMapping?: {[key: string]: string}) {
        
        super(message, errors);
        this.joiErrors = JoifulValidationError.formatSeqToJoi(this, original, attrMapping);
    }

    public static formatSeqToJoi(err: SeqValidationError, original?: object,
        seqToJoiAttrMap?: any): JoiValidationError  {
        const detailsArr: any = [];
        const errors = err.errors;
        for (let i = 0; i < errors.length; i++) {
            // console.log(errors[i]);
    
            // Map sequelize path to request object path
            let paths: string[] = [];
            let objectPath: string | undefined = undefined;
            
            // Use custom path mapping(s) if available
            if (typeof seqToJoiAttrMap !== 'undefined') {
                if (seqToJoiAttrMap[errors[i].path]) {
                    objectPath = seqToJoiAttrMap[errors[i].path];
                }
            }
            // If no custom mapping found, use sequelize's path
            if (typeof objectPath === 'undefined') {
                objectPath = errors[i].path
            }
            // Set the paths array, whether deep or not
            paths = objectPath.split('.');
    
            // Create details arr element for this sequelize error 
            const joiDetailsObj: any = {
                // Format sequelize error type like Joi.
                // Whether this causes conflicts is unknown
                type: 'any.' + errors[i].type.replace(' ', '_'),
                context: {
                    label: errors[i].path,
                    key: errors[i].path,
                    value: errors[i].value
                },
                path: paths
            };
    
            if (paths.length > 0) {
                joiDetailsObj.path = paths;
            }
            detailsArr.push(joiDetailsObj);
        }
        return new JoiValidationError('', detailsArr, original);
    }
}
