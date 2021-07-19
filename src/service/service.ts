import request from './api'

const getHotel = () => {
  return request({
    url: `32875076-6de2-425f-9b93-3deaebe02e00`,
    method: 'GET'
  });
}

const Service = {
  getHotel,
}

export default Service;