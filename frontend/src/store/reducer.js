export const initialState = {
    data: "",
    list: [],
    toggleMenu: false,
    productEdit: null,
    bookingEdit: "",
    searchNoiKhoiHanh: "",
    searchDiemDen: "",
    searchThoiGian: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DATA": {
            return {
                ...state,
                data: action.payload
            }
        }
        case "NOIKHOIHANH": {
            return {
                ...state,
                searchNoiKhoiHanh: action.payload
            }
        }
        case "DIEMDEN": {
            return {
                ...state,
                searchDiemDen: action.payload
            }
        }
        case "THOIGIAN": {
            return {
                ...state,
                searchThoiGian: action.payload
            }
        }

        case "LIST": {
            return {
                ...state,
                list: action.payload
            }
        }
        case "OPEN": {
            return {
                ...state,
                toggleMenu: action.payload
            }
        }
        case "CLOSE": {
            return {
                ...state,
                toggleMenu: action.payload
            }
        }
        case "PRODUCTEDIT": {
            return {
                ...state,
                productEdit: action.payload
            }
        }
        case "BOOKINGEDIT": {
            return {
                ...state,
                bookingEdit: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer