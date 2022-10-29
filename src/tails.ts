export const periods = {
  '24h': 0,
  '7d': 1,
  '30d': 2,
  '45d': 3,
  '60d': 4,
  '90d': 5,
}

export const tLabel = [
  'median',
  'mean',
  'harmonic',
  'geometric',
  'variance',

  'median',
  'mean',
  'variance',
  'harmonic',
  'geometric',
]
export const tCod = {
  prices: {
    median: 0,
    mean: 1,
    harmonic: 2,
    variance: 4,
    // PriceGeometric: 3,
  },
  volumes: {
    median: 5,
    mean: 6,
    // VolumeVariance: 7,
    harmonic: 8,
    // VolumeGeometric: 9
  },

  volatile: {
    mean: 10,
    median: 11,
    // VolatilityGeometric: 12,
    harmonic: 13,
  },
  percentile: {
    Rank30: 14,
    Rank60: 15,
    Rank90: 16,
    30: 17,
    60: 18,
    90: 19,
  },
}
