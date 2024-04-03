import { type Genre } from '@/enums/genre';
import { type TmdbPagingResponse } from '@/enums/request-type';
import tmdbClient from '@/lib/apiClient';
import { type MediaType } from '@/types';

// Replace the existing getNetflixOriginals function with the modified version
export async function getNetflixOriginals(page: number) {
  const { data } = await tmdbClient.get<TmdbPagingResponse>(
    `/discover/tv?with_networks=213&language=en-US&page=${page}&watch_region=US&with_watch_providers=8`,
  );
  const netflixOriginals = data.results.filter(
    (show) => show.provider_id === 8 && show.media_type === 'tv'
  );
  return { ...data, results: netflixOriginals };
}

// Other functions remain unchanged from your original script
import { type Genre } from '@/enums/genre';
import { type TmdbPagingResponse } from '@/enums/request-type';
import tmdbClient from '@/lib/apiClient';
import { type MediaType } from '@/types';

// Function to fetch both movies and TV shows from Netflix
async function getNetflixContent(mediaType: MediaType, page: number) {
  const { data } = await tmdbClient.get<TmdbPagingResponse>(
    `/discover/${mediaType}?with_networks=213&language=en-US&page=${page}&watch_region=US&with_watch_providers=8`,
  );
  // Filter results to include only Netflix content
  const netflixContent = data.results.filter(
    (item) => item.provider_id === 8 && item.media_type === mediaType
  );
  return { ...data, results: netflixContent };
}

// Function to fetch trending Netflix content
export async function getTrendingNetflixContent(mediaType: MediaType, page: number) {
  return getNetflixContent(mediaType, page);
}

// Function to fetch top rated Netflix content
export async function getTopRatedNetflixContent(mediaType: MediaType, page: number) {
  return getNetflixContent(mediaType, page);
}

// Function to fetch popular Netflix content
export async function getPopularNetflixContent(mediaType: MediaType, page: number) {
  return getNetflixContent(mediaType, page);
}

// Function to search Netflix content
export async function searchNetflixContent(query: string, page: number) {
  return getNetflixContent('multi', page); // Search across all Netflix content types
}

// Function to fetch Netflix content by genre
export async function getNetflixContentByGenre(mediaType: MediaType, genre: Genre, page: number) {
  return getNetflixContent(mediaType, page);
}
