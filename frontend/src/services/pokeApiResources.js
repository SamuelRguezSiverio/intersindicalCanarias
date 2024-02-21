import pokeAPI from './pokeApiConfig'
import axios from 'axios'

export async function getResources() {
  const response = await pokeAPI.get()
  return response
}

export async function getResource(resource) {
  const response = await pokeAPI.get(`/${resource}`)
  return response.data.results
}

export async function getDeeperResource(resourceArray) {
  const promises = []
  for (const element of resourceArray) {
    promises.push(axios.get(`${element.url}`))
  }
  const response = await Promise.allSettled(promises)
  const data = extractDataFromResponse(response)
  return data
}

function extractDataFromResponse(responseArray) {
  const data = []
  for (let resource of responseArray) {
    data.push(resource.value.data)
  }
  return data
}
