import { describe, expect, it } from 'vitest'
import { historyArchive } from './catalog'
import { canonicalEuropeCampaignIds, canonicalEuropeSummary } from './europeRegistry'

describe('Storhamar Europe archive', () => {
  it('contains every completed Europe campaign exactly once through 2025/26', () => {
    const actual = historyArchive.europe.map((campaign) => campaign.id)

    expect(actual).toHaveLength(canonicalEuropeSummary.completedCampaignsThrough2025_26)
    expect(new Set(actual).size).toBe(actual.length)
    expect(new Set(actual)).toEqual(new Set(canonicalEuropeCampaignIds))
  })

  it('has no partial Europe campaigns in the completed historical inventory', () => {
    const partial = historyArchive.europe.filter((campaign) => campaign.completeness !== 'verified')
    expect(partial).toEqual([])
  })

  it('keeps CHL 2025/26 as a Round of 16 campaign', () => {
    const campaign = historyArchive.europe.find((item) => item.id === 'europe-2025-26-chl')
    expect(campaign?.stage).toBe('Round of 16')
    expect(campaign?.opponentNames).toContain('Lukko Rauma')
  })
})
