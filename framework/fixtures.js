import { faker } from '@faker-js/faker';

const userName = faker.person.firstName();
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode();
const userEmail = faker.internet.email();
const currentAddress = faker.location.streetAddress();

//Shop login credential

//Accepted username
const shopUserNAme = 'standard_user';
const shopLockedUser = 'locked_out_user';
const shopUserPassword = 'secret_sauce';

export { userName, userEmail, currentAddress, shopUserNAme, shopLockedUser, shopUserPassword, lastName, postalCode };