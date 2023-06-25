import { faker } from '@faker-js/faker';

const userName = faker.person.firstName();
const userEmail = faker.internet.email();
const currentAddress = faker.location.streetAddress();

export { userName, userEmail, currentAddress };