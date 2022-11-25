export type Band = {
    id: string,
    name: string,
    music_genre: string,
    responsible: string
}

export interface BandInputDTO {
    name: string,
    music_genre: string,
    responsible: string
  }