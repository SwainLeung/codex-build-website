import { describe, expect, it } from 'vitest'
import { checklistItems, gscEvidenceLoop, operatingContracts, operatingLayers, referenceHygiene, stages, tensions } from './content'

describe('website system content', () => {
  it('contains a complete seven-stage delivery loop', () => {
    expect(stages).toHaveLength(7)
    expect(stages.map((stage) => stage.number)).toEqual(['01', '02', '03', '04', '05', '06', '07'])
  })

  it('keeps governance and conflict review visible', () => {
    expect(tensions.length).toBeGreaterThanOrEqual(4)
    expect(checklistItems).toHaveLength(7)
  })

  it('adds the reusable site operating model without private reference data', () => {
    expect(operatingLayers).toHaveLength(5)
    expect(referenceHygiene).toHaveLength(4)
  })

  it('makes the GSC iteration loop offline, reviewable, and non-automatic', () => {
    expect(gscEvidenceLoop).toHaveLength(4)
    expect(gscEvidenceLoop.map((step) => step.title)).toContain('候选而非自动化')
  })

  it('keeps executable SOUL, DESIGN, boundary, and run contracts visible', () => {
    expect(operatingContracts).toHaveLength(4)
    expect(operatingContracts.map((contract) => contract.label)).toEqual(['SOUL', 'DESIGN', 'BOUNDARY', 'RUN'])
  })
})
