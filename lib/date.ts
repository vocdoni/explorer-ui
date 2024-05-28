import { TFunction } from 'next-i18next';

export enum DateDiffType {
  Start = 'start-date',
  End = 'end-date',
}

export function localizedStrDateDiff(type: DateDiffType, target: Date, t: TFunction): string {
  if (!target) return '';
  const diff = (target.getTime() - Date.now()) / 1000;

  if (diff > 3) return strDiffFutureV2(type, diff, t);
  else if (diff < -3) return strDiffPastV2(type, -diff, t);
  else if (type == DateDiffType.Start) return t('dates.starting_right_now');
  return t('dates.ending_right_now');
}

function strDiffFutureV2(type: DateDiffType, secondDiff: number, t: TFunction): string {
  let num: number;

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_days', { num });
      return t('dates.ending_in_n_days', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_tomorrow');
      return t('dates.ending_tomorrow');
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_hours', { num });
      return t('dates.ending_in_n_hours', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_in_one_hour');
      return t('dates.ending_in_one_hour');
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_minutes', { num });
      return t('dates.ending_in_n_minutes', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_in_one_minute');
      return t('dates.ending_in_one_minute');
    }
  } else {
    // seconds
    num = Math.floor(secondDiff);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_seconds', { num });
      return t('dates.ending_in_n_seconds', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_right_now');
      return t('dates.ending_right_now');
    }
  }
}

function strDiffPastV2(type: DateDiffType, secondDiff: number, t: TFunction): string {
  let num: number;

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_days_ago', { num });
      return t('dates.ended_n_days_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_yesterday');
      return t('dates.ended_yesterday');
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_hours_ago', { num });
      return t('dates.ended_n_hours_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_an_hour_ago');
      return t('dates.ended_an_hour_ago');
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_minutes_ago', { num });
      return t('dates.ended_n_minutes_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_a_minute_ago');
      return t('dates.ended_a_minute_ago');
    }
  } else {
    // seconds
    num = Math.floor(secondDiff);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_seconds_ago', { num });
      return t('dates.ended_n_seconds_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_right_now');
      return t('dates.ended_right_now');
    }
  }
}

export function localizedDateDiff(target: Date, t: TFunction): string {
  if (!target) return '';
  const diff = (target.getTime() - Date.now()) / 1000;

  if (diff > 3) return strDiffFuture(diff, t);
  else if (diff < -3) return strDiffPast(-diff, t);
  return t('dates.right_now');
}

export function localizedStartEndDateDiff(type: DateDiffType, target: Date, t: TFunction): string {
  if (!target) return '';
  const diff = (target.getTime() - Date.now()) / 1000;

  if (diff > 3) return strStartEndDiffFuture(type, diff, t);
  else if (diff < -3) return strStartEndDiffPast(type, -diff, t);
  else if (type == DateDiffType.Start) return t('dates.starting_right_now');
  return t('dates.ending_right_now');
}

// Helpers

function strDiffFuture(secondDiff: number, t: TFunction): string {
  let num: number;

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24);

    if (num > 1) return t('dates.in_n_days', { num });
    return t('dates.tomorrow');
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60);

    if (num > 1) return t('dates.in_n_hours', { num });
    return t('dates.in_one_hour');
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60);

    if (num > 1) return t('dates.in_n_minutes', { num });
    return t('dates.in_one_minute');
  } else {
    // seconds
    num = Math.floor(secondDiff);

    if (num > 1) return t('dates.in_n_seconds', { num });
    return t('dates.right_now');
  }
}

function strDiffPast(secondDiff: number, t: TFunction): string {
  let num: number;

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24);

    if (num > 1) return t('dates.n_days_ago', { num });
    return t('dates.yesterday');
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60);

    if (num > 1) return t('dates.n_hours_ago', { num });
    return t('dates.an_hour_ago');
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60);

    if (num > 1) return t('dates.n_minutes_ago', { num });
    return t('dates.a_minute_ago');
  } else {
    // seconds
    num = Math.floor(secondDiff);

    if (num > 1) return t('dates.n_seconds_ago', { num });
    return t('dates.right_now');
  }
}

function strStartEndDiffFuture(type: DateDiffType, secondDiff: number, t: TFunction): string {
  let num: number;

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_days', { num });
      return t('dates.ending_in_n_days', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_tomorrow');
      return t('dates.ending_tomorrow');
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_hours', { num });
      return t('dates.ending_in_n_hours', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_in_one_hour');
      return t('dates.ending_in_one_hour');
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_minutes', { num });
      return t('dates.ending_in_n_minutes', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_in_one_minute');
      return t('dates.ending_in_one_minute');
    }
  } else {
    // seconds
    num = Math.floor(secondDiff);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.starting_in_n_seconds', { num });
      return t('dates.ending_in_n_seconds', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.starting_right_now');
      return t('dates.ending_right_now');
    }
  }
}

function strStartEndDiffPast(type: DateDiffType, secondDiff: number, t: TFunction): string {
  let num: number;

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_days_ago', { num });
      return t('dates.ended_n_days_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_yesterday');
      return t('dates.ended_yesterday');
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_hours_ago', { num });
      return t('dates.ended_n_hours_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_an_hour_ago');
      return t('dates.ended_an_hour_ago');
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_minutes_ago', { num });
      return t('dates.ended_n_minutes_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_a_minute_ago');
      return t('dates.ended_a_minute_ago');
    }
  } else {
    // seconds
    num = Math.floor(secondDiff);

    if (num > 1) {
      if (type == DateDiffType.Start) return t('dates.started_n_seconds_ago', { num });
      return t('dates.ended_n_seconds_ago', { num });
    } else {
      if (type == DateDiffType.Start) return t('dates.started_right_now');
      return t('dates.ended_right_now');
    }
  }
}
