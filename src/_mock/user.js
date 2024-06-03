import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  domain:sample([
    'https://yellow.ai/blog/insurance-chatbot/',
    'https://yellow.ai/blog/insurance-chatbot/',
    'https://yellow.ai/blog/insurance-chatbot/',
    'https://yellow.ai/blog/insurance-chatbot/',
  ]),
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  email: sample([
    'xyz@gmail.com',
    'xyz@gmail.com',
    'xyz@gmail.com',
    'xyz@gmail.com',
    'xyz@gmail.com',
    'xyz@gmail.com',
    'xyz@gmail.com',
    'xyz@gmail.com',
  ]),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));
