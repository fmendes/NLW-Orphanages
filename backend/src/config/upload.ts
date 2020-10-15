import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage( {
        destination: path.join( __dirname, '..', '..', 'uploads' )
        , filename: ( request, file, callback ) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            // first param is null (no error)
            callback( null, fileName );
        }
    } )
}