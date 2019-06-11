const validators = {
  neq: (a, b) => a !== b,
  eq: (a, b) => a === b,
  gt: (a, b) => a > b,
  gte: (a, b) => a >= b,
  lt: (a, b) => a < b,
  lte: (a, b) => a <= b,
  includes: (a, b) => a && a.includes(b),
  matches: (a, b) => new RegExp(a).test(b)
}

export default class Condition {
  valid: boolean = false

  constructor(readonly property: string, readonly comparator: string, readonly value: string) {}

  validate(target) {
    this.valid = validators[this.comparator](target, this.value)
    return this.valid
  }
}
