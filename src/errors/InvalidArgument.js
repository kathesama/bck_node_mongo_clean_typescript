class InvalidArgument extends Error {
  constructor(name = '') {
    super(name);
  }
}

export default InvalidArgument;
