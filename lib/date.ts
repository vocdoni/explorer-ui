import i18n from "../i18n"

export enum DateDiffType {
  Start = 'start-date',
  End = 'end-date'
}


export function localizedStrDateDiff(type: DateDiffType, target: Date): string {
  if (!target) return ''
  const diff = (target.getTime() - Date.now()) / 1000

  if (diff > 3) return strDiffFutureV2(type, diff)
  else if (diff < -3) return strDiffPastV2(type, -diff)
  else if (type == DateDiffType.Start) return i18n.t('dates.starting_right_now')
  return i18n.t('dates.ending_right_now')
}

function strDiffFutureV2(type: DateDiffType, secondDiff: number): string {
  let num: number

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.starting_in_n_days', { num })
      return i18n.t('dates.ending_in_n_days', { num })
    } else {
      if (type == DateDiffType.Start) return i18n.t('dates.starting_tomorrow')
      return i18n.t('dates.ending_tomorrow')
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.starting_in_n_hours', { num })
      return i18n.t('dates.ending_in_n_hours', { num })
    } else {
      if (type == DateDiffType.Start)
        return i18n.t('dates.starting_in_one_hour')
      return i18n.t('dates.ending_in_one_hour')
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.starting_in_n_minutes', { num })
      return i18n.t('dates.ending_in_n_minutes', { num })
    } else {
      if (type == DateDiffType.Start)
        return i18n.t('dates.starting_in_one_minute')
      return i18n.t('dates.ending_in_one_minute')
    }
  } else {
    // seconds
    num = Math.floor(secondDiff)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.starting_in_n_seconds', { num })
      return i18n.t('dates.ending_in_n_seconds', { num })
    } else {
      if (type == DateDiffType.Start) return i18n.t('dates.starting_right_now')
      return i18n.t('dates.ending_right_now')
    }
  }
}

function strDiffPastV2(type: DateDiffType, secondDiff: number): string {
  let num: number

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.started_n_days_ago', { num })
      return i18n.t('dates.ended_n_days_ago', { num })
    } else {
      if (type == DateDiffType.Start) return i18n.t('dates.started_yesterday')
      return i18n.t('dates.ended_yesterday')
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.started_n_hours_ago', { num })
      return i18n.t('dates.ended_n_hours_ago', { num })
    } else {
      if (type == DateDiffType.Start) return i18n.t('dates.started_an_hour_ago')
      return i18n.t('dates.ended_an_hour_ago')
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.started_n_minutes_ago', { num })
      return i18n.t('dates.ended_n_minutes_ago', { num })
    } else {
      if (type == DateDiffType.Start)
        return i18n.t('dates.started_a_minute_ago')
      return i18n.t('dates.ended_a_minute_ago')
    }
  } else {
    // seconds
    num = Math.floor(secondDiff)

    if (num > 1) {
      if (type == DateDiffType.Start)
        return i18n.t('dates.started_n_seconds_ago', { num })
      return i18n.t('dates.ended_n_seconds_ago', { num })
    } else {
      if (type == DateDiffType.Start) return i18n.t('dates.started_right_now')
      return i18n.t('dates.ended_right_now')
    }
  }
}



export function localizedDateDiff(target: Date): string {
  if (!target) return ''
  const diff = (target.getTime() - Date.now()) / 1000

  if (diff > 3) return strDiffFuture(diff)
  else if (diff < -3) return strDiffPast(-diff)
  return i18n.t("dates.right_now")
}

export function localizedStartEndDateDiff(type: DateDiffType, target: Date): string {
  if (!target) return ''
  const diff = (target.getTime() - Date.now()) / 1000

  if (diff > 3) return strStartEndDiffFuture(type, diff)
  else if (diff < -3) return strStartEndDiffPast(type, -diff)
  else if (type == DateDiffType.Start) return i18n.t("dates.starting_right_now")
  return i18n.t("dates.ending_right_now")
}

// Helpers

function strDiffFuture(secondDiff: number): string {
  let num: number

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24)

    if (num > 1) return i18n.t("dates.in_n_days", { num })
    return i18n.t("dates.tomorrow")
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60)

    if (num > 1) return i18n.t("dates.in_n_hours", { num })
    return i18n.t("dates.in_one_hour")
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60)

    if (num > 1) return i18n.t("dates.in_n_minutes", { num })
    return i18n.t("dates.in_one_minute")
  } else {
    // seconds
    num = Math.floor(secondDiff)

    if (num > 1) return i18n.t("dates.in_n_seconds", { num })
    return i18n.t("dates.right_now")
  }
}

function strDiffPast(secondDiff: number): string {
  let num: number

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24)

    if (num > 1) return i18n.t("dates.n_days_ago", { num })
    return i18n.t("dates.yesterday")
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60)

    if (num > 1) return i18n.t("dates.n_hours_ago", { num })
    return i18n.t("dates.an_hour_ago")
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60)

    if (num > 1) return i18n.t("dates.n_minutes_ago", { num })
    return i18n.t("dates.a_minute_ago")
  } else {
    // seconds
    num = Math.floor(secondDiff)

    if (num > 1) return i18n.t("dates.n_seconds_ago", { num })
    return i18n.t("dates.right_now")
  }
}

function strStartEndDiffFuture(type: DateDiffType, secondDiff: number): string {
  let num: number

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_in_n_days", { num })
      return i18n.t("dates.ending_in_n_days", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_tomorrow")
      return i18n.t("dates.ending_tomorrow")
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_in_n_hours", { num })
      return i18n.t("dates.ending_in_n_hours", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_in_one_hour")
      return i18n.t("dates.ending_in_one_hour")
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_in_n_minutes", { num })
      return i18n.t("dates.ending_in_n_minutes", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_in_one_minute")
      return i18n.t("dates.ending_in_one_minute")
    }
  } else {
    // seconds
    num = Math.floor(secondDiff)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_in_n_seconds", { num })
      return i18n.t("dates.ending_in_n_seconds", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.starting_right_now")
      return i18n.t("dates.ending_right_now")
    }
  }
}

function strStartEndDiffPast(type: DateDiffType, secondDiff: number): string {
  let num: number

  if (secondDiff > 60 * 60 * 24) {
    // days
    num = Math.floor(secondDiff / 60 / 60 / 24)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.started_n_days_ago", { num })
      return i18n.t("dates.ended_n_days_ago", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.started_yesterday")
      return i18n.t("dates.ended_yesterday")
    }
  } else if (secondDiff > 60 * 60) {
    // hours
    num = Math.floor(secondDiff / 60 / 60)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.started_n_hours_ago", { num })
      return i18n.t("dates.ended_n_hours_ago", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.started_an_hour_ago")
      return i18n.t("dates.ended_an_hour_ago")
    }
  } else if (secondDiff > 60) {
    // minutes
    num = Math.floor(secondDiff / 60)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.started_n_minutes_ago", { num })
      return i18n.t("dates.ended_n_minutes_ago", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.started_a_minute_ago")
      return i18n.t("dates.ended_a_minute_ago")
    }
  } else {
    // seconds
    num = Math.floor(secondDiff)

    if (num > 1) {
      if (type == DateDiffType.Start) return i18n.t("dates.started_n_seconds_ago", { num })
      return i18n.t("dates.ended_n_seconds_ago", { num })
    }
    else {
      if (type == DateDiffType.Start) return i18n.t("dates.started_right_now")
      return i18n.t("dates.ended_right_now")
    }
  }
}
