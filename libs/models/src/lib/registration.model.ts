export class Registration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  activity: string;
  comments?: string;

  constructor(obj: { id?: number, firstName: string, lastName: string,
    email: string, activity: string, comments?: string}) {
    this.id = obj.id || new Date().getTime();
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.activity = obj.activity;
    this.comments = obj.comments;
  }

  get activityClass() {
    return this.activity.toLowerCase().replace(/'/g, '').replace(' ', '-');
  }
}
