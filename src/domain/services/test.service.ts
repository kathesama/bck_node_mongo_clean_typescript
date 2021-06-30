import TestRepository from '../repositories/test.repository';

class TestService {
  // eslint-disable-next-line no-undef
  async getOne(): Promise<any> {
    const one: any = TestRepository.findOne();
    return one;
  }
}

export default TestService;
