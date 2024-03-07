export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;


  constructor(user:any) {
    this.id = user.id || 0;
    this.email = user.email || '';
    this.first_name = user.first_name || '';
    this.last_name = user.last_name || '';
  }
}
