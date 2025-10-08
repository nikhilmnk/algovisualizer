import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Button } from '@/components/button';
import { Badge } from '@/components/badge';
import { Search, Play, BookOpen, Code, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const algorithmCategories = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Visualize how data gets organized',
    icon: '🔁',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    algorithms: [
      { id: 'bubble-sort', name: 'Bubble Sort', difficulty: 'Easy', implemented: true },
    ]
  },
 
];

// Update the graphs category to include topological sort
const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = algorithmCategories.map(category => ({
    ...category,
    algorithms: category.algorithms.filter(algo =>
      algo.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.algorithms.length > 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate total algorithms including Phase 2
  const totalAlgorithms = algorithmCategories.reduce((total, category) => 
    total + category.algorithms.length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">AlgoVisualizer</h1>
              </div>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-100">
                v1.0
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search algorithms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Learn Algorithms
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Visually</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master data structures and algorithms through interactive visualizations, 
            step-by-step explanations, and hands-on practice.
          </p>
          <div className="flex justify-center space-x-4">
            <Card className="bg-white/10 border-white/20 backdrop-blur-md">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{totalAlgorithms}+</div>
                <div className="text-gray-300 text-sm">Algorithms</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-md">
              <CardContent className="p-4 text-center">
                <Play className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Interactive</div>
                <div className="text-gray-300 text-sm">Visualizations</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-md">
              <CardContent className="p-4 text-center">
                <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Step-by-Step</div>
                <div className="text-gray-300 text-sm">Explanations</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Algorithm Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-gray-300">{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {category.algorithms.map((algorithm) => (
                    <div key={algorithm.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="text-white font-medium">{algorithm.name}</div>
                        <Badge className={getDifficultyColor(algorithm.difficulty)}>
                          {algorithm.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {algorithm.implemented ? (
                          <Link to={`/algorithm/${algorithm.id}`}>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              <Play className="w-4 h-4 mr-1" />
                              Visualize
                            </Button>
                          </Link>
                        ) : (
                          <Badge variant="outline" className="border-gray-500 text-gray-400">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
