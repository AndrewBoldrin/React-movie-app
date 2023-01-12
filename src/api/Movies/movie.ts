import { endpoints, keyURL } from "../endpoints"
import { restClient } from "../restClient"

export const getMovie = async (id: string) => {
    const data = await restClient.get(`${endpoints.movies.movie}${id}${keyURL}`)
    return data.data;
}