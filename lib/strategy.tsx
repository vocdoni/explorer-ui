import { ReactElement } from 'react';

type IEvaluation = () => boolean;

export class ViewStrategy {
  private readonly evaluation: IEvaluation;
  public readonly view: ReactElement;

  constructor(evaluation: IEvaluation, view: ReactElement) {
    this.evaluation = evaluation;
    this.view = view;
  }

  public evaluate(): boolean {
    return this.evaluation();
  }
}

export class ViewContext {
  private strategies: ViewStrategy[];
  constructor(strategies?: ViewStrategy[]) {
    this.strategies = strategies ? strategies : [];
  }

  public addStrategy(strategy: ViewStrategy) {
    this.strategies.push(strategy);
  }

  public addStrategies(strategies: ViewStrategy[]) {
    this.strategies = strategies;
  }

  public getView() {
    for (const strategy of this.strategies) {
      if (strategy.evaluate()) {
        return strategy.view;
      }
    }
  }
}
