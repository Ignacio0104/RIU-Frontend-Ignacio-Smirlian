import { Hero, UniverseEnum } from '../models/hero-models';

export const initalHeroesData: Hero[] = [
  {
    id: '1',
    name: 'Spider-Man',
    alterEgo: 'Peter Parker',
    power: 90,
    universe: UniverseEnum.MARVEL,
    pictureUrl:
      'https://i.blogs.es/0eac86/trajes-andrew-garfield-amazing-spiderman-2-ps5/500_333.jpeg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam exercitationem perspiciatis officia modi impedit temporibus. Nam, quas itaque. Tempora?',
  },
  {
    id: '2',
    name: 'Thor',
    alterEgo: 'Donal Blake',
    power: 500,
    universe: UniverseEnum.MARVEL,
    pictureUrl:
      'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/09/thor-2070145.jpg?tf=3840x',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam exercitationem perspiciatis officia modi impedit temporibus. Nam, quas itaque. Tempora?',
  },
  {
    id: '3',
    name: 'Hulk',
    alterEgo: 'Bruce Banner',
    power: 150,
    universe: UniverseEnum.MARVEL,
    pictureUrl:
      'https://areajugones.sport.es/wp-content/uploads/2024/08/versiones-hulk.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam exercitationem perspiciatis officia modi impedit temporibus. Nam, quas itaque. Tempora?',
  },
  {
    id: '4',
    name: 'Batman',
    alterEgo: 'Bruce Wayne',
    power: 100,
    universe: UniverseEnum.DC,
    pictureUrl:
      'https://cloudfront-us-east-1.images.arcpublishing.com/eluniverso/I4FR4SYJ2NC6NANKQLFLOMHGJM.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam exercitationem perspiciatis officia modi impedit temporibus. Nam, quas itaque. Tempora?',
  },
];
