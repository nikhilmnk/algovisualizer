import { BubbleSortVisualizer } from '@/components/visualizers/BubbleSortVisualizer';

export const getVisualizerComponent = (algorithmId: string) => {
  switch (algorithmId) {
    case 'bubble-sort':
      return <BubbleSortVisualizer />;
    default:
      return <div className="text-white text-center p-8">Visualizer not implemented yet</div>;
  }
};
