export const SET_DATA = (payload) => {
    return {
        type: "DATA",
        payload,
    }
};
export const SET_ROLE = (payload) => {
    return {
        type: "ROLE",
        payload,
    }
};
export const SET_SEARCHNOIKHOIHANH = (payload) => {
    return {
        type: "NOIKHOIHANH",
        payload,
    }
};
export const SET_SEARCHDIEMDEN = (payload) => {
    return {
        type: "DIEMDEN",
        payload,
    }
};
export const SET_SEARCHTHOIGIAN = (payload) => {
    return {
        type: "THOIGIAN",
        payload,
    }
};
export const SET_SEARCHMABOOKING = (payload) => {
    return {
        type: "MABOOKING",
        payload,
    }
};

export const SET_LIST = (payload) => {
    return {
        type: "LIST",
        payload,
    }
}

export const TOGGLE_MENU = (payload) => {
    return {
        type: "OPEN",
        payload
    }
}

export const CLOSE_MENU = (payload) => {
    return {
        type: "CLOSE",
        payload
    }
}

export const PRODUCT_EDIT = (payload) => {
    return {
        typeof: "PRODUCTEDIT",
        payload
    }
}

export const BOOKING_EDIT = (payload) => {
    return {
        typeof: "BOOKINGEDIT",
        payload
    }
}
export const SET_INFO_USER = (payload) => {
    return {
        type: "USERINFO",
        payload
    }
}
