"use strict"; 

import * as _ from "lodash";
import { QueryOptions } from "mongoose";

import * as models from "../../models/index";

export class BaseDao {

    save = async (model: ModelNames, data:any) => {
        try {
            const ModelName: any = models[model];
            return await new ModelName(data).save();
        } catch (error) {
            return Promise.reject(error);
        }    
    }

    find = async (model: ModelNames, query: any, projection: any, options: QueryOptions, sort, paginate, populateQuery: any) => {
        try {
            const ModelName: any = models[model];
            if (!_.isEmpty(sort) && !_.isEmpty(paginate) && !_.isEmpty(populateQuery)) { //sorting with pagination
                return await ModelName.find(query,projection,options).sort(sort).skip((paginate.pageNo - 1) * paginate.limit).limit(paginate.limit);
            } else if (_.isEmpty(sort) && !_.isEmpty(paginate) && _.isEmpty(populateQuery)){ //pagination
                return await ModelName.find(query,projection,options).skip((paginate.pageNo - 1) * paginate.limit).limit(paginate.limit);
            } else if(_.isEmpty(sort) && _.isEmpty(paginate) && !_.isEmpty(populateQuery)){ //populate
                return await ModelName.find(query,projection,options).populate(populateQuery).exec();
            } else if (_.isEmpty(sort) && !_.isEmpty(paginate) && !_.isEmpty(populateQuery)) { //pagination with populate
                return await ModelName.find(query,projection,options).skip((paginate.pageNo - 1) * paginate.limit).populate(populateQuery).exec();
            } else if (!_.isEmpty(sort) && _.isEmpty(paginate) && _.isEmpty(populateQuery)) { // only sorting
                return await ModelName.find(query,projection,options).sort(sort).exec();
            }else {
                return await ModelName.find(query,projection,options);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    distinct = async (model: ModelNames, path: string, query: any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.distinct(path, query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findOne = async (model: ModelNames, query: any, projection: any, options: QueryOptions, sort: any, populateQuery: any) => {
        try {
            const ModelName: any = models[model];
            if (!_.isEmpty(populateQuery) && _.isEmpty(sort)) { // only populate
                return await ModelName.findOne(query, projection, options).populate(populateQuery).exec();
            } else if (!_.isEmpty(sort) && _.isEmpty(populateQuery)) { // only sort 
                return await ModelName.findOne(query, projection, options).sort(sort).exec();
            } else if (!_.isEmpty(sort) && !_.isEmpty(populateQuery)) { // sorting with populate
                return await ModelName.findOne(query, projection, options).sort(sort).populate(populateQuery).exec();
            }else{
                return await ModelName.findOne(query, projection, options);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findOneAndUpdate = async (model: ModelNames, query: any, update: any, options: QueryOptions) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.findOneAndUpdate(query, update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findAndRemove = async (model: ModelNames, query: any, update: any, options: QueryOptions) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.findOneAndRemove(query, update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    update = async (model: ModelNames, query: any, update: any, options: QueryOptions) => {
        try {
            const modelName: any = models[model];
            return await modelName.update(query, update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    updateOne = async (model: ModelNames, query: any, update: any, options: QueryOptions) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.updateOne(query, update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    updateMany = async (model: ModelNames, query: any, update: any, options: QueryOptions) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.updateMany(query, update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    
}

export const baseDao = new BaseDao();