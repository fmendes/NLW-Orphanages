import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

 const errorHandler: ErrorRequestHandler = ( error, request, response, next ) => {
    console.error( error );

    if( error instanceof ValidationError ) {
        let errors: ValidationErrors = {};

        // inner has an array of validation errors per field
        error.inner.forEach( err => {
            errors[ err.path ] = err.errors;
        });
    
        return response.status( 400 ).json( { message: 'Validation fails', errors });
    }

    // NOTE:  exposing errors is unsafe - change this later
    return response.status( 500 ).json( { 
        message: error
    } );
 };

export default errorHandler;
