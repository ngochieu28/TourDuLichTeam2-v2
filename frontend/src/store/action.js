export const SET_DATA = (payload) => {
    return {
        type: "DATA",
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

