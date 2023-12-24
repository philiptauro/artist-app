const BASE_URL = 'https://3xnmvbhk43.execute-api.us-east-2.amazonaws.com/'
export const URL_ROUTES = {
    artists: 'artists',
    artists_with_song_count: 'VW_artists_with_song_count',
    songs_by_artist: 'songs_by_artist',
    songs_with_awards_won: 'songs_with_awards_won',
    delete_artist_by_id: 'delete_artist_by_id',
    create_artist: 'create_artist'
}
export const generateURL = (routeKey: keyof typeof URL_ROUTES, params: Record<string, string> = {}) => {
    const url = new URL(`${BASE_URL}${URL_ROUTES[routeKey]}`);    
    Object.keys(params).forEach((paramKey) => {
        url.searchParams.append(paramKey, params[paramKey])
    });
    return url;
}