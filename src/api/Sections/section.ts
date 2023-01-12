import { endpoints, keyURL } from '../endpoints';
import { restClient } from '../restClient';

export const Sections = [
   {
      name: 'Popular',
      path: endpoints.section.popular,
   },
   {
      name: 'Top Rated' ,
      path: endpoints.section.top_rated,
   },
   {
      name: 'Upcomming',
      path: endpoints.section.upcoming,
   },
];

export async function getSection(page: number, section: string) {
    const data = await restClient.get(`${section}${keyURL}&page=${page}`);
    return data.data.results;
}