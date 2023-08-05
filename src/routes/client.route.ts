import { RequestHandler } from 'express';

import * as clientController from '../controllers/client.controller';

export const createClient: RequestHandler = async (_req, res, next) => {
    try {
        const client = await clientController.createClient();

        res.status(201).json(client);
    } catch (error) {
        next(error);
    }
};
