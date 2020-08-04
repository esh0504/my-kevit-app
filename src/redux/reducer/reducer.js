export const GET_QRDATA="reducer/GET_QRDATA";
export const GET_QRREAD="reducer/GET_QRREAD";

const  initialState={qrread:0,data:null}

export default function reducer(state=initialState,action){
    switch(action.type){
        case GET_QRDATA:
            return{
                ...state,
                data:action.payload.data,
            };
        case GET_QRREAD:
            return{
                ...state,
                qrread:action.payload.qrread,
            }
        default:
            return state;
    }
}

export function Qrread(num){
    return{
        type:GET_QRREAD,
        payload:{qrread:num}
    }
}

export function qrdata(data){
    return{
        type:GET_QRDATA,
        payload:{data:data},
    };
}
