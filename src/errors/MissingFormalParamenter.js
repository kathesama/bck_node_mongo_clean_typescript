class MissingFormalParamenter extends Error {
  constructor(name = '') {
    super(`error in param: ${name}`);
    this.name = `error in param: ${name}`;
  }
}

export default MissingFormalParamenter;
