const tokenReducer = (state = '', { type, payload }) => {
  switch (type) {
  case 'SAVE_TOKEN':
    return payload;
  default:
    return state;
  }
};

export default tokenReducer;
