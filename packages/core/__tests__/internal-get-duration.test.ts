import { internalGetDuration } from '@/performance-impl/internal-get-duration'

describe('internalGetDuration', () => {
  const SECOND = 1 * 1000
  const MIN = 1 * 60 * SECOND
  const HOUR = 1 * 60 * MIN

  test('1000 ms 以内', () => {
    expect(internalGetDuration(0, 200)).toMatchInlineSnapshot('"200 ms"')
    expect(internalGetDuration(0, 400)).toMatchInlineSnapshot('"400 ms"')
    expect(internalGetDuration(0, 600)).toMatchInlineSnapshot('"600 ms"')
    expect(internalGetDuration(0, 800)).toMatchInlineSnapshot('"800 ms"')
    expect(internalGetDuration(0, 999)).toMatchInlineSnapshot('"999 ms"')
    expect(internalGetDuration(0, 1 * SECOND)).toMatchInlineSnapshot('"1.00 s"')
  })

  test('60 s 以内', () => {
    expect(internalGetDuration(0, 1.2 * SECOND)).toMatchInlineSnapshot('"1.20 s"')
    expect(internalGetDuration(0, 2 * SECOND)).toMatchInlineSnapshot('"2.00 s"')
    expect(internalGetDuration(0, 30 * SECOND)).toMatchInlineSnapshot('"30.00 s"')
    expect(internalGetDuration(0, 59 * SECOND)).toMatchInlineSnapshot('"59.00 s"')
    expect(internalGetDuration(0, 60 * SECOND)).toMatchInlineSnapshot('"1min 0s"')
  })

  test('60 min 以内', () => {
    expect(internalGetDuration(0, 2 * MIN)).toMatchInlineSnapshot('"2min 0s"')
    expect(internalGetDuration(0, 10 * MIN)).toMatchInlineSnapshot('"10min 0s"')
    expect(internalGetDuration(0, 30 * MIN)).toMatchInlineSnapshot('"30min 0s"')
    expect(internalGetDuration(0, 59 * MIN)).toMatchInlineSnapshot('"59min 0s"')
    expect(internalGetDuration(0, 60 * MIN)).toMatchInlineSnapshot('"1h 0min 0s"')
  })

  test('24 h 以内', () => {
    expect(internalGetDuration(0, 1 * HOUR)).toMatchInlineSnapshot('"1h 0min 0s"')
    expect(internalGetDuration(0, 2 * HOUR)).toMatchInlineSnapshot('"2h 0min 0s"')
    expect(internalGetDuration(0, 2 * HOUR + 20 * MIN + 36 * SECOND)).toMatchInlineSnapshot('"2h 20min 36s"')
    expect(internalGetDuration(0, 12 * HOUR + 20 * MIN + 36 * SECOND)).toMatchInlineSnapshot('"12h 20min 36s"')
    expect(internalGetDuration(0, 20 * HOUR + 20 * MIN + 36 * SECOND)).toMatchInlineSnapshot('"20h 20min 36s"')
    expect(internalGetDuration(0, 23 * HOUR + 59 * MIN + 59 * SECOND)).toMatchInlineSnapshot('"23h 59min 59s"')
    expect(internalGetDuration(0, 24 * HOUR)).toMatchInlineSnapshot('"24h 0min 0s"')
    expect(internalGetDuration(0, 24 * HOUR + 59 * MIN + 59 * SECOND)).toMatchInlineSnapshot('"24h 59min 59s"')
  })
})
