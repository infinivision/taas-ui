import request from "../utils/request";
import {isUndefined} from '../utils/index';


const PREFIX = '/fragments/';
const PREFIX2 = '/transactions';


export function getList(options) {
    var _options = {
        limit: options.size || 10
    };

    if (options.id) {
        _options.after = options.id;
    }

    if (options.name) {
        _options.name = options.name;
    }

    if (!isUndefined(options.name) && options.name) {
        _options.name = options.name;
    }

    if (!isUndefined(options.status)) {
        _options.status = options.status;
    }

    if (!isUndefined(options.action)) {
        _options.action = options.action;
    }


    return request({
        url: PREFIX + options.fid + PREFIX2,
        method: "GET",
        params: _options
    });
}

export function getItem(fid, id) {
    if (!id || !fid) {
        return false;
    }
    return request({
        url: PREFIX + fid + PREFIX2 + '/' + id,
        method: "GET",
    })
}

//
export function rollback(fid, id) {
    if (!id || !fid) {
        return false;
    }

    return request({
        url: PREFIX + fid + PREFIX2 + '/' + id + '/rollback',
        method: 'PUT'
    })
}


export function commit(fid, id) {
    if (!id || !fid) {
        return false;
    }

    return request({
        url: PREFIX + fid + PREFIX2 + '/' + id + '/commit',
        method: 'PUT'
    })
}

