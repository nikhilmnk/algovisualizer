
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';

interface AlgorithmSidePanelProps {
  algorithm: {
    name: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    difficulty: string;
    code: string;
  };
}

const AlgorithmSidePanel = ({ algorithm }: AlgorithmSidePanelProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Algorithm Info */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">About Algorithm</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {algorithm.description}
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time Complexity:</span>
              <span className="text-white font-mono">{algorithm.timeComplexity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Space Complexity:</span>
              <span className="text-white font-mono">{algorithm.spaceComplexity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Difficulty:</span>
              <Badge className={getDifficultyColor(algorithm.difficulty)}>
                {algorithm.difficulty}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Implementation */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{algorithm.code}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmSidePanel;
