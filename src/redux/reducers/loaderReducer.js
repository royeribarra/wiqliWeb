export const loaderInitialState = {
    showLoader: false,
};

export default function loaderReducer(state = loaderInitialState, action)
{
    switch(action.type)
    {
        case 'SHOW':
            return {
                ...state,
                showLoader: true,
            };
        case 'CLOSE':
            return {
                ...state,
                showLoader: false,
            };
        default:
            return state;
    }
}