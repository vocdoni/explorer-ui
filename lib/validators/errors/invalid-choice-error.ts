
export class InvalidChoiceError extends Error {
  constructor(length: number) {
    super(t('error.invalid_choice_error', { length }));
  }
}
