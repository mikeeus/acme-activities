export class User {
  firstName: string;
  lastName: string;
  email: string;

  constructor(u: { firstName: string, lastName: string, email: string }) {
    this.firstName = u.firstName;
    this.lastName = u.lastName;
    this.email = u.email;
  }
}