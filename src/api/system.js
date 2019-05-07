import request from "../utils/request";

//
export function getFragments() {
    return request({
        url: '/fragments',
        method: "GET"
    })
}
