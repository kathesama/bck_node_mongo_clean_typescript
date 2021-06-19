export class MissingFormalParamenter extends Error{
  constructor(name: string){
    super(`error in param: ${name}`);
    this.name = `error in param: ${name}`;
  }
}
