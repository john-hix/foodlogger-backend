import {InvalidContentError} from 'restify-errors';
import JoifulValidationError from './model-validation';
import { ValidationErrorItem } from 'joi';
import verror from 'verror';

export default class VerboseInvalidContentError extends InvalidContentError {
    toJSON() {
        const json = super.toJSON();
        json.validation = verror.info(this);
        return json;
    }
}
