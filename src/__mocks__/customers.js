import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    phone: '304-428-3097',
    isMembership: true,
  },
  {
    id: uuid(),
    email: 'cao.yu@devias.io',
    name: 'Cao Yu',
    phone: '712-351-5711',
    isMembership: false,
  },
  {
    id: uuid(),
    email: 'alexa.richardson@devias.io',
    name: 'Alexa Richardson',
    phone: '770-635-2682',
    isMembership: true,
  }
];
