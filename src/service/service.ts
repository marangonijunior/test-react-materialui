import request from './api'

const getHotel = () => {
  return request({
    url: ``,
    method: 'GET'
  });
}

const Service = {
  getHotel,
}

export default Service;