import { v4 } from 'node-uuid';
import { SearchConfigModel } from '../models'
import { ICreateSearchConfig } from '../types';

export const createSearchConfig = async (config: ICreateSearchConfig) => {
    const data = new SearchConfigModel({
        ...config,
        userId: v4()
    })

    const dataToSave = data.save();

    return dataToSave
};