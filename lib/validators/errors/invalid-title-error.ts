
export class InvalidTitleError extends Error {
  constructor(length: number) {
    super(t('error.invalid_title', { length }));
  }
}
