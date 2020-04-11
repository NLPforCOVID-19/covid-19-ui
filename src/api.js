import axios from 'axios';

const baseUrl = process.env.API_URL;

export async function fetchNewsByClass(klass, limit) {
  const path = `/classes/${klass}`;
  const response = await axios.get(baseUrl + path, {
    params: {
      start: 0,
      limit: limit || 100,
    },
  });
  return response.data;
}

export async function fetchNewsByClassAndCountry(klass, country, offset, limit) {
  const path= `/classes/${klass}/${country}`;
  const response = await axios.get(baseUrl + path, {
    params: {
      start: offset,
      limit: limit || 10
    }
  })
  return response.data
}

export async function fetchMeta() {
  const path = '/meta';
  const response = await axios.get(baseUrl + path);
  return response.data;
}

export async function fetchStats() {
  const path = '/stats';
  const response = await axios.get(baseUrl + path);
  return response.data;
}
