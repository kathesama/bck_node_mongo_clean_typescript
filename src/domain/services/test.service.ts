import TestRepository from '../repositories/test.repository';

class TestService {
  async getOne(): Promise<any> {
    const one: any = TestRepository.findOne();
    return one;
  }
}

export default new TestService();
