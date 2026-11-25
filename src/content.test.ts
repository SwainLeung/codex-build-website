import { describe, expect, it } from 'vitest'
import { checklistItems, stages, tensions } from './content'

describe('website system content', () => {
  it('contains a complete seven-stage delivery loop', () => {
    expect(stages).toHaveLength(7)
    expect(stages.map((stage) => stage.number)).toEqual(['01', '02', '03', '04', '05', '06', '07'])
  })

  it('keeps governance and conflict review visible', () => {
    expect(tensions.length).toBeGreaterThanOrEqual(4)
    expect(checklistItems).toHaveLength(7)
  })
})
