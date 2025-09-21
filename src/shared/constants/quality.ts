export const quality = {
  fast: {
    temp: 0.5,
    topK: 3,
    maxTokens: 1000,
    simlarityThreshold: 0.3,
  },
  clever: { temp: 0.9, topK: 10, maxTokens: 5000, simlarityThreshold: 0.7 },
  normal: { temp: 0.7, topK: 5, maxTokens: 3000, simlarityThreshold: 0.5 },
};

export type QualityKey = keyof typeof quality;
