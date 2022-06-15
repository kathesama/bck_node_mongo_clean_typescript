import GoogleService from '../../domain/services/google.service';
import { IGoogleModelInterface, ValidateGoogleUserInterface } from '../../interfaces/useCaseDTO/Google.interfaces';

export class HandleUserUseCaseAPI implements ValidateGoogleUserInterface {
  googleService: any;

  constructor() {
    this.googleService = GoogleService;
  }

  validate(props: Record<string, unknown>): Promise<IGoogleModelInterface> {
    return this.googleService.validate(props);
  }
}
