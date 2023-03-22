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
    

    bulkwrite = async (model: ModelNames, querylist: any[], options: QueryOptions) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.bulkwrite(querylist,options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    remove = async (model: ModelNames, query: any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.remove(query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    deleteMany = async (model: ModelNames, query: any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.deleteMany(query); 
        } catch (error) {
            return Promise.reject(error);
        }
    }

    deleteOne = async (model: ModelNames, query: any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.deleteOne(query); 
        } catch (error) {
            return Promise.reject(error);
        }
    }

    count = async (model: ModelNames, query:any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.count(query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    countDocuments = async (model: ModelNames, query:any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.countDocuments(query);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    aggregate = async (model: ModelNames, aggPipe, options:any) => {
        try {
            const ModelName: any = models[model];
            const aggregation: any = ModelName.aggregate(aggPipe);
            if (options) {
                aggregation.options = options;
            }   
            return await aggregation.allowDiskUse(true).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    insert = async (model: ModelNames, data, options: QueryOptions) => {
        try {
            const ModelName: any = models[model];
            const obj = new ModelName(data);
            await obj.save();
            return obj;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    insertMany = async (model: ModelNames, data, options: any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.collection.insertMany(data, options);
        } catch (error) {
            return {};
        }
    }

    insertManyWithSchema = async (model: ModelNames, data, options: any) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.insertMany(data, options);
        } catch (error) {
            return {};
        }
    }

    aggregateDataWithPopulate = async (model: ModelNames, group, populateOptions) => {
        try {
            const ModelName: any = models[model];
            const aggregate = await ModelName.aggregate(group);
            const populate = await ModelName.populate(aggregate, populateOptions);
            return populate;
        } catch (error) {
            return Promise.reject(error);         
        }
    }

    bulkFindAndUpdate = async (bulk, query: any, update: any, options: QueryOptions ) => {
        try {
            return await bulk.find(query).upsert().update(update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    bulkFindAndUpdateOne = async (bulk, query: any, update: any, options: QueryOptions) => {
        try {
            return await bulk.find(query).upsert().updateOne(update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    findByIdAndUpdate = async (model: ModelNames , query: any, update: any, options: QueryOptions) => {
        try {
            const ModelName: any = models[model];
            return await ModelName.findByIdAndUpdate(model, update, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    populate = async (model: ModelNames, data: any, populateQuery: any) => {
        try {
            const ModelName: any = models[model];
            return ModelName.populate(data, populateQuery);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    addSkipLimit = (limit, pageNo) => {
        if (limit) {
            limit = Math.abs(limit);

            if (limit > 100) {
                limit = 100;
            }
        }else{
            limit = 100;
        }
        if (pageNo && (pageNo !== 0)) {
            pageNo = Math.abs(pageNo);
        } else {
            pageNo = 1;
        }

        let skip = ( limit * (pageNo - 1 ));
        return [
            { "$skip": skip },
            { "$limit": limit + 1 }
        ];
    }

    paginate = async (model: ModelNames, pipeline: Array<Object>, limit: number, pageNo: number, options: any = {}, pageCount = false) => {
        try {
            pipeline = [...pipeline, ...this.addSkipLimit(limit, pageNo)];
            let ModelName: any = models[model];

            let promiseAll = [];
            if (!_.isEmpty(options)) {
                if (options.collation) {
                    promiseAll = [
                        ModelName.aggregate(pipeline).collation({ "locale": "en" }).allowDiskUse(true)
                    ];
                } else {
                    promiseAll = [
                        ModelName.aggregate(pipeline).allowDiskUse(true)
                    ];
                }
            } else {
                promiseAll = [
                    ModelName.aggregate(pipeline).allowDiskUse(true) 
                ];
            }

            if (pageCount) {
                for (let index = 0; index < pipeline.length; index++) {
                    if ("$skip" in pipeline[index]) {
                        pipeline = pipeline.slice(0, index);
                    } else {
                        //pipeline = pipeline;
                    }
                }
                pipeline.push({ "$count": "total" });
                promiseAll.push(ModelName.aggregate(pipeline).allowDiskUse(true));
            }
            let result = await Promise.all(promiseAll);
            let nextHit = 0;
            let total = 0;
            let totalPage = 0;

            if (pageCount) {
                total = result[1] && result[1][0] ? result[1][0]["total"] : 0;
                totalPage = Math.ceil(total / limit);
            }

            let data: any = result[0];
            if(result[0].length > limit ){
                nextHit = pageNo + 1;
                data = result[0].slice(0, limit);
            }

            return {
                "data": data,
                "total": total,
                "pageNo": pageNo,
                "totalPage": totalPage,
                "nextHit": nextHit,
                "limit": limit
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    customPaginate = async (model: ModelNames, pipeline: Array<Object>, limit: number, pageNo: number, options: any = {}, pageCount = false) => {
        try {
            let ModelName: any = models[model];

            let promiseAll = [];
            if (!_.isEmpty(options)) {
                if (options.collation) {
                    promiseAll = [
                        ModelName.aggregate(pipeline).collation({ "locale": "en" }).allowDiskUse(true)
                    ];
                } else {
                    promiseAll = [
                        ModelName.aggregate(pipeline).allowDiskUse(true)
                    ];
                }
            } else {
                promiseAll = [
                    ModelName.aggregate(pipeline).allowDiskUse(true) 
                ];
            }

            if (pageCount) {
                for (let index = 0; index < pipeline.length; index++) {
                    if ("$skip" in pipeline[index]) {
                        pipeline = pipeline.slice(0, index);
                    } else {
                        //pipeline = pipeline;
                    }
                }
                pipeline.push({ "$count": "total" });
                promiseAll.push(ModelName.aggregate(pipeline).allowDiskUse(true));
            }
            let result = await Promise.all(promiseAll);
            let nextHit = 0;
            let total = 0;
            let totalPage = 0;

            if (pageCount) {
                total = result[1] && result[1][0] ? result[1][0]["total"] : 0;
                totalPage = Math.ceil(total / limit);
            }

            let data: any = result[0];
            if(result[0].length > limit ){
                nextHit = pageNo + 1;
                data = result[0].slice(0, limit);
            }

            return {
                "data": data,
                "total": total,
                "pageNo": pageNo,
                "totalPage": totalPage,
                "nextHit": nextHit,
                "limit": limit
            };
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const baseDao = new BaseDao();