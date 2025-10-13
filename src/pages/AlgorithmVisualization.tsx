
import { useParams, Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { algorithmData } from '@/data/algorithmData';
import AlgorithmHeader from '@/components/AlgorithmHeader';
import AlgorithmSidePanel from '@/components/AlgorithmSidePanel';
import { getVisualizerComponent } from '@/utils/algorithmVisualizerMapping';

const AlgorithmVisualization = () => {
  const { algorithmId } = useParams();
  
  const algorithm = algorithmData[algorithmId as keyof typeof algorithmData];
  
  if (!algorithm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 border-white/20 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Algorithm Not Found</h2>
            <p className="text-gray-300 mb-6">The requested algorithm is not available yet.</p>
            <Link to="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AlgorithmHeader 
        algorithmName={algorithm.name}
        difficulty={algorithm.difficulty}
        timeComplexity={algorithm.timeComplexity}
        spaceComplexity={algorithm.spaceComplexity}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visualization */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Visualization</span>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getVisualizerComponent(algorithmId || '')}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1">
            <AlgorithmSidePanel algorithm={algorithm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualization;
