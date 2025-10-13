
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/button';
import { Badge } from '@/components/badge';

interface AlgorithmHeaderProps {
  algorithmName: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
}

const AlgorithmHeader = ({ 
  algorithmName, 
  difficulty, 
  timeComplexity, 
  spaceComplexity 
}: AlgorithmHeaderProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">{algorithmName}</h1>
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-gray-500 text-gray-300">
              Time: {timeComplexity}
            </Badge>
            <Badge variant="outline" className="border-gray-500 text-gray-300">
              Space: {spaceComplexity}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmHeader;
