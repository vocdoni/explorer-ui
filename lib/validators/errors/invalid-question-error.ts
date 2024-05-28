
export type QuestionError = {
  title?: Error;
  description?: Error;
  choices?: Error[];
};

export type MapQuestionError = Map<number, QuestionError>;

export class InvalidQuestionsError extends Error {
  public question: MapQuestionError;

  constructor(question: MapQuestionError) {
    super(t('error.invalid_question_error'));

    this.question = question;
  }
}
