"use strict";

import * as mimeType from "../json/mime-type.json"

const USER_TYPE = {
    USER: "USER",
    ADMIN: "ADMIN",
    SUB_ADMIN: "SUB_ADMIN",
    CORPORATE: "CORPORATE"
}

const mediaType = () => {
    const mimeTypes = [];
    for (const e in mimeType) {
        mimeTypes.push(...new Set(mimeType[e].map(v => v.defaultType)));
    }
    return mimeTypes;
}

export const CONSTANT = Object.freeze({
    USER_TYPE: "USER_TYPE",
    mediaType
});