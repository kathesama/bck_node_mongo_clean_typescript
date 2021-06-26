import TestRepository from "../repositories/test.repository";

class TestService {

  async get():Promise<any> {
    return TestRepository.find({});
  }
}

export default new TestService();
