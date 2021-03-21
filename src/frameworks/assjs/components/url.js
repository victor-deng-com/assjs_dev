let url = {
    get: function (key) {
        return getUrlValueByKey(key);
    },
    add: function (param) {
        return addUrlParam(param);
    },
    delete: function (params) {
        return deleteUrlParams(params);
    }
};

/**
 * 根据参数名获取参数值
 * @param key 
 * @returns 
 */
function getUrlValueByKey(key) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == key) {
            return decodeURI(pair[1]);
        }
    }
    return undefined;
}


/**
 * 增加参数
 * @param param:{key: value, key: value}
 * @returns 
 */
function addUrlParam(param) {
    //let url = window.location.href;
    let url = window.location.pathname;
    for (let key in param) {
        //console.log(key, param[key]);
        let value = param[key];
        let reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
        let tmp = key + "=" + value;
        if (url.match(reg) != null) {
            //更新参数
            url = url.replace(eval(reg), tmp);
        } else {
            //增加参数
            if (url.match("[\?]")) {
                url += "&" + tmp;
            } else {
                url += "?" + tmp;
            }
        }
    }
    return url;
}

/**
 * 删除参数
 * @param params 字符串 或 字符串数组
 * @returns 
 */
function deleteUrlParams(params) {
    if ((typeof params) == "string") {
        //只删除一个参数
        params = new Array(params)
    }
    // 获取参数，如：?id=1&name=test
    let search = window.location.search;
    //console.log("search", search);
    let searchArray = search.split("&");
    if (searchArray.length > 0) {
        searchArray[0] = searchArray[0].replace("?", "");
    }
    //console.log(searchArray);
    let indexArray = new Array();
    for (let i = 0; i < searchArray.length; i++) {
        let array = searchArray[i].split("=");
        for (let j = 0; j < params.length; j++) {
            if (array[0] == params[j]) {
                //要删除该参数
                indexArray.push(i);
                break;
            }
        }
    }
    //删除参数
    for (let i = indexArray.length - 1; i >= 0; i--) {
        searchArray.splice(indexArray[i], 1);
    }

    let mix = "";
    for (let i = 0; i < searchArray.length; i++) {
        mix += i == 0 ? "?" + searchArray[i] : "&" + searchArray[i];
    }
    return window.location.pathname + mix;
}

export default url;