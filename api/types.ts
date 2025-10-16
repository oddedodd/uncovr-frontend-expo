export interface Release {
  id: number;
  title: string;
  cover_image: string;
  artist: {
    id: number;
    name: string;
    slug: string;
    artist_image: string;
  };
  type: string;
  release_date: string;
}

export interface ReleasesResponse {
  data: Release[];
}
