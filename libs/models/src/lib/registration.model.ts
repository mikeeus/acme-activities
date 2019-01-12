export class Registration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  activity: string;
  comments?: string;

  constructor(id: number, firstName: string, lastName: string,
    email: string, activity: string, comments?: string) {
    this.id = id || new Date().getTime();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.activity = activity;
    this.comments = comments;
  }
}
