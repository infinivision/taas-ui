/*
* author: wancheng
* date: 2018-12-18
* desc: 
*/

export {parseTime} from "~/utils";
import {toMsByNs} from "~/utils";

import {GLOBAL_STATUS_ARRAY, ACTION_ARRAY, BRANCH_STATUS_ARRAY} from '~/constant/constant';

export function globalStatus(value) {
    return GLOBAL_STATUS_ARRAY[value] || GLOBAL_STATUS_ARRAY[0];
}


export function action(value) {
    return ACTION_ARRAY[value] || ACTION_ARRAY[0];
}

export function branchStatus(value) {
    return BRANCH_STATUS_ARRAY[value] || BRANCH_STATUS_ARRAY[0];
}


export function toMsByNsFilter(time) {
    return toMsByNs(time);
}
