import { Gun, MEQ } from './home';

export const TEMPORAL: Gun[] = [
  {
    name: 'Absolvor Bolt Pistol',
    points: 0,
    Range: 18,
    Type: 'Pistol',
    NoS: 1,
    S: 5,
    Ap: -1,
    D: 2,
    Ability: '',
  },
  {
    name: 'Accelerator Autocannon',
    points: 0,
    Range: 48,
    Type: 'Heavy',
    NoS: 3,
    S: 7,
    Ap: -1,
    D: 2,
    Ability: '',
  },
  {
    name: 'Assault Bolter',
    points: 0,
    Range: 18,
    Type: 'Assault',
    NoS: 3,
    S: 5,
    Ap: -1,
    D: 1,
    Ability: '',
  },
];

export const MARINE: MEQ = {
  Toughness: 4,
  W: 2,
  Sv: 3,
};
