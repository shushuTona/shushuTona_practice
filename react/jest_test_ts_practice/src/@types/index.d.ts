const acceptInputType = ['text', 'number'] as const;
type inputType = typeof acceptInputType[number];
