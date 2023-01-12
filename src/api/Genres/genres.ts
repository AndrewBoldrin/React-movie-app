import { endpoints, keyURL } from "../endpoints"
import { restClient } from "../restClient"

export const getGenres = async () => {
    const data = await restClient.get(`${endpoints.genre.genres}${keyURL}`);
    return data.data.genres;
}