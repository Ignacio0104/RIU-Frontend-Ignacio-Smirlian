export interface Hero {
  id: string;
  name: string;
  alterEgo: string;
  pictureUrl?: string;
  power: number;
  universe: UniverseEnum;
  description?: string;
}

export enum UniverseEnum {
  DC = 'DC',
  MARVEL = 'Marvel',
  OTHER = 'Other',
}

export enum NextOrPrevious {
  NEXT = 'Next',
  PREVIOUS = 'Previous',
}
