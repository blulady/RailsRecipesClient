export class Category {
  id: number;
  name: string;
  description: string;
  link: string;

  constructor(category:any){
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.link = category.link;
  }
}
