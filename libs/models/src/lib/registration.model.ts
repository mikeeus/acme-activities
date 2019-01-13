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
    switch(this.activity) {
      case 'Initial Coin Offering':
         return '#a3b5fd';
      case 'Fundraising':
         return '#c3c5f8';
      case 'Hostile Takeover':
         return '#b3eef6';
      case "Gavin's Comeback Party":
         return '#ffc3df';
      case 'Company Breakfast':
         return '#e49aab';
      case 'Company Retreat':
         return '#fea78c';
      case 'Quarterly All-Hands Meeting':
         return '#cd69a7';
      case "Jim's Birthday":
         return '#cd69a7';
    }
  }
}
