import { Router } from 'express';
import OrphanagesController from './controllers/OrphanagesController';

import multer from 'multer';
import uploadConfig from './config/upload';

const upload = multer( uploadConfig );
const routes = Router();

routes.get( '/orphanages', OrphanagesController.index );
routes.get( '/orphanages/:id', OrphanagesController.show );
routes.post( '/orphanages', upload.array( 'images' ), OrphanagesController.create );
//
export default routes;

// routes.post( '/orphanages', async ( request, response ) => {
    //     const {
    //         name
    //         , latitude
    //         , longitude
    //         , about
    //         , instructions
    //         , opening_hours
    //         , open_on_weekends
    //     } = request.body;
    
    //     const orphanagesRepository = getRepository( Orphanage );
    
    //     const orphanage = orphanagesRepository.create({
    //         name
    //         , latitude
    //         , longitude
    //         , about
    //         , instructions
    //         , opening_hours
    //         , open_on_weekends
    //     });
    
    //     await orphanagesRepository.save( orphanage );
    
    //     return response.status( 201 ).json( { orphanage } );
    // });

// routes.get( '/users', ( request, response ) => {
//     return response.json( { messsage: 'GET /users tested OK' } );
// });

//app.post( '/users/:id', ( request, response ) => {
//    // ?test=1&value=2 becomes { test: '1', value: '2' }
//    console.log( 'query parameters', request.query );
//
//    // /users/123 becomes { id: '123' }
//    console.log( 'query params', request.params );
//
//    console.log( 'body', request.body );
//    
//    return response.json( { messsage: 'POST /users tested OK' } );
//});

//app.get( '/users', ( request, response ) => {
//    console.log( 'testing GET /users' );
//    //return response.send( 'GET /users tested OK' );
//    return response.json( { messsage: 'GET /users tested OK' } );
//});

// sqlite3.query( "SELECT * FROM users WHERE name = 'Joe' " );
// knex( 'users' ).select( '*' ).where( 'name', 'Joe' );