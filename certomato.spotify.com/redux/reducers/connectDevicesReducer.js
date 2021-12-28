import {GET_CONNECT_DEVICES, LOAD_CONNECT_DEVICES} from '../actions/types';

const initialState = {
  devices: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONNECT_DEVICES: {
      const connectDevices = action.payload.filter(device => {return device.name !== 'Certomato';});
      return {
        devices: connectDevices,
        loading: false,
      };
    }
    case LOAD_CONNECT_DEVICES: {
      return Object.assign({}, initialState, {loading: true});
    }
    default:
      return state;
  }
}
