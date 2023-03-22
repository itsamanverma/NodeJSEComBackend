"use strict"; 

import * as _ from "lodash";
import { QueryOptions } from "mongoose";

import * as models from "../../models/index";

export class BaseDao {

    save = async (model: ModelNames, data:any) => {
        try {
            const ModelNames: any = models[model];
            return await new ModelNames(data).save();
        } catch (error) {
            return Promise.reject(error);
        }    
    }

    find = async (model: ModelNames, query: any, projection: any, options: QueryOptions, sort, paginate, populateQuery: any) => {
        try {
            const ModelNames: any = models[model];
            if (!_.isEmpty(sort) && !_.isEmpty(paginate) && !_.isEmpty(populateQuery)) { //sorting with pagination
                return await ModelNames.find(query,projection,options).sort(sort).skip((paginate.pageNo - 1) * paginate.limit).limit(paginate.limit);
            } else if (_.isEmpty(sort) && !_.isEmpty(paginate) && _.isEmpty(populateQuery)){ //pagination
                return await ModelNames.find(query,projection,options).skip((paginate.pageNo - 1) * paginate.limit).limit(paginate.limit);
            } else if(_.isEmpty(sort) && _.isEmpty(paginate) && !_.isEmpty(populateQuery)){ //populate
                return await ModelNames.find(query,projection,options).populate(populateQuery).exec();
            } else if (_.isEmpty(sort) && !_.isEmpty(paginate) && !_.isEmpty(populateQuery)) { //pagination with populate
                return await ModelNames.find(query,projection,options).skip((paginate.pageNo - 1) * paginate.limit).populate(populateQuery).exec();
            } else if (!_.isEmpty(sort) && _.isEmpty(paginate) && _.isEmpty(populateQuery)) { // only sorting
                return await ModelNames.find(query,projection,options).sort(sort).exec();
            }else {
                return await ModelNames.find(query,projection,options);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    distinct = async (model: ModelNames, path: string, query: any) => {
        try {
            const ModelNames: any = models[model];
            return await ModelNames.distinct(path, query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    
}

export const baseDao = new BaseDao();