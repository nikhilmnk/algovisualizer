interface ArrayElement {
  value: number;
  state?: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'selected';
}

interface ExplanationStep {
  id: number;
  title: string;
  description: string;
  array: ArrayElement[];
  highlightTerms?: string[];
  additionalInfo?: string;
}


export const generateBubbleSortSteps = (inputArray: number[]): ExplanationStep[] => {
  const steps: ExplanationStep[] = [];
  const arr = [...inputArray];
  let stepId = 0;

  steps.push({
    id: stepId++,
    title: "Initial Array",
    description: `Starting with array [${arr.join(', ')}]. Bubble Sort compares adjacent elements and swaps them if they're in the wrong order. The largest elements 'bubble up' to the end.`,
    array: arr.map(val => ({ value: val, state: 'default' as const })),
    highlightTerms: ['adjacent elements', 'bubble up'],
    additionalInfo: "Bubble Sort has O(n²) time complexity but is easy to understand and implement."
  });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    steps.push({
      id: stepId++,
      title: `Pass ${i + 1}`,
      description: `Starting pass ${i + 1}. We'll compare adjacent pairs and swap if needed. After this pass, the ${i === 0 ? 'largest' : `${i + 1} largest`} element(s) will be in the correct position.`,
      array: arr.map(val => ({ value: val, state: 'default' as const })),
      highlightTerms: ['pass', 'adjacent pairs', 'largest element']
    });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        id: stepId++,
        title: `Compare Adjacent Elements`,
        description: `Comparing ${arr[j]} and ${arr[j + 1]}. ${arr[j] > arr[j + 1] ? `Since ${arr[j]} > ${arr[j + 1]}, we need to swap them.` : `Since ${arr[j]} <= ${arr[j + 1]}, they're in correct order.`}`,
        array: arr.map((val, idx) => ({
          value: val,
          state: idx === j || idx === j + 1 ? 'comparing' : 'default' as const
        })),
        highlightTerms: ['comparing']
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          id: stepId++,
          title: `Swap Elements`,
          description: `Swapped ${arr[j + 1]} and ${arr[j]}. The smaller element has moved one position to the left.`,
          array: arr.map((val, idx) => ({
            value: val,
            state: idx === j || idx === j + 1 ? 'swapping' : 'default' as const
          })),
          highlightTerms: ['swapped', 'smaller element']
        });
      }
    }

    steps.push({
      id: stepId++,
      title: `Pass ${i + 1} Complete`,
      description: `Pass ${i + 1} finished. Element ${arr[n - 1 - i]} is now in its final position at index ${n - 1 - i}.`,
      array: arr.map((val, idx) => ({
        value: val,
        state: idx >= n - 1 - i ? 'sorted' : 'default' as const
      })),
      highlightTerms: ['final position']
    });
  }

  steps.push({
    id: stepId++,
    title: "Sorting Complete!",
    description: `Bubble Sort is complete! Final sorted array: [${arr.join(', ')}]. All elements have 'bubbled' to their correct positions.`,
    array: arr.map(val => ({ value: val, state: 'sorted' as const })),
    highlightTerms: ['complete', 'bubbled', 'correct positions'],
    additionalInfo: "Bubble Sort successfully sorted the array by repeatedly comparing and swapping adjacent elements."
  });

  return steps;
};

