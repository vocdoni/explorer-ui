
export class InvalidDescriptionError extends Error {
  constructor(length: number) {
    super(t('error.invalid_description', { length }));
  }
}
