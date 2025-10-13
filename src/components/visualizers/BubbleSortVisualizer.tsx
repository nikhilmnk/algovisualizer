import { useState, useEffect } from 'react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Shuffle, BookOpen } from 'lucide-react';
import { Badge } from '@/components/badge';
import { Slider } from '@/components/slider';
import { StepByStepModal } from './shared/StepByStepModal';
import { generateBubbleSortSteps } from '@/utils/stepGenerators';

interface Step {
  array: number[];
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sorted: number[];
  explanation: string;
}

export const BubbleSortVisualizer = () => {
  const [inputArray, setInputArray] = useState('64, 34, 25, 12, 22, 11, 90');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [showStepByStep, setShowStepByStep] = useState(false);

  const generateSteps = (arr: number[]): Step[] => {
    const steps: Step[] = [];
    const array = [...arr];
    const n = array.length;
    const sorted: number[] = [];

    steps.push({
      array: [...array],
      comparing: null,
      swapping: null,
      sorted: [...sorted],
      explanation: 'Starting Bubble Sort. We will compare adjacent elements and swap them if they are in wrong order.'
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapping: null,
          sorted: [...sorted],
          explanation: `Comparing elements at positions ${j} and ${j + 1}: ${array[j]} and ${array[j + 1]}`
        });

        if (array[j] > array[j + 1]) {
          steps.push({
            array: [...array],
            comparing: null,
            swapping: [j, j + 1],
            sorted: [...sorted],
            explanation: `${array[j]} > ${array[j + 1]}, so we swap them.`
          });

          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          steps.push({
            array: [...array],
            comparing: null,
            swapping: null,
            sorted: [...sorted],
            explanation: `After swapping: ${array[j]} and ${array[j + 1]} are now in correct positions.`
          });
        } else {
          steps.push({
            array: [...array],
            comparing: null,
            swapping: null,
            sorted: [...sorted],
            explanation: `${array[j]} <= ${array[j + 1]}, no swap needed.`
          });
        }
      }
      
      sorted.unshift(n - 1 - i);
      steps.push({
        array: [...array],
        comparing: null,
        swapping: null,
        sorted: [...sorted],
        explanation: `Pass ${i + 1} complete. Element ${array[n - 1 - i]} is now in its final position.`
      });
    }

    sorted.unshift(0);
    steps.push({
      array: [...array],
      comparing: null,
      swapping: null,
      sorted: [...sorted],
      explanation: 'Bubble Sort complete! All elements are now sorted in ascending order.'
    });

    return steps;
  };

  const parseInput = (input: string): number[] => {
    return input
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
  };

  const initializeVisualization = () => {
    const array = parseInput(inputArray);
    if (array.length === 0) return;
    
    const newSteps = generateSteps(array);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const randomizeArray = () => {
    const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 99) + 1);
    setInputArray(randomArray.join(', '));
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    initializeVisualization();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length, speed]);

  const currentStepData = steps[currentStep];

  const getBarColor = (index: number) => {
    if (!currentStepData) return 'bg-blue-400';
    
    if (currentStepData.sorted.includes(index)) {
      return 'bg-green-500';
    }
    if (currentStepData.comparing && currentStepData.comparing.includes(index)) {
      return 'bg-yellow-500';
    }
    if (currentStepData.swapping && currentStepData.swapping.includes(index)) {
      return 'bg-purple-500';
    }
    return 'bg-blue-400';
  };

  const getBarHeight = (value: number) => {
    if (!currentStepData) return 0;
    const maxValue = Math.max(...currentStepData.array);
    return (value / maxValue) * 200;
  };

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <Input
                value={inputArray}
                onChange={(e) => setInputArray(e.target.value)}
                placeholder="Enter numbers separated by commas"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <Button onClick={randomizeArray} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Shuffle className="w-4 h-4 mr-2" />
              Random
            </Button>
            <Button onClick={initializeVisualization} className="bg-purple-600 hover:bg-purple-700">
              Initialize
            </Button>
            <Button
              onClick={() => setShowStepByStep(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Explain Step-by-Step
            </Button>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Speed:</span>
              <Slider
                value={[1000 - speed]}
                onValueChange={(value) => setSpeed(1000 - value[0])}
                max={900}
                min={100}
                step={100}
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      {currentStepData && (
        <>
          <div className="flex justify-center items-center space-x-4">
            <Button onClick={reset} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button onClick={prevStep} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button onClick={playPause} className="bg-purple-600 hover:bg-purple-700">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button onClick={nextStep} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="border-gray-500 text-gray-300">
              Step {currentStep + 1} / {steps.length}
            </Badge>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span className="text-gray-300 text-sm">Unsorted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-300 text-sm">Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-300 text-sm">Swapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300 text-sm">Sorted</span>
            </div>
          </div>

          {/* Visualization */}
          <Card className="bg-black/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-end justify-center space-x-2 min-h-[250px]">
                {currentStepData.array.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`${getBarColor(index)} transition-all duration-300 flex items-end justify-center text-white text-xs font-medium rounded-t`}
                      style={{
                        height: `${getBarHeight(value)}px`,
                        width: `${Math.max(300 / currentStepData.array.length, 25)}px`,
                        minWidth: '25px'
                      }}
                    >
                      <span className="mb-1">{value}</span>
                    </div>
                    <div className="text-gray-300 text-xs mt-1">{index}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card className="bg-white/5 border-gray-700">
            <CardContent className="p-4">
              <div className="bg-blue-500/20 rounded-lg p-4 text-center">
                <p className="text-blue-200">{currentStepData.explanation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Algorithm Info */}
          <Card className="bg-white/5 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">How Bubble Sort Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h4 className="text-blue-300 font-medium mb-2">Step 1: Compare Adjacent Elements</h4>
                  <p>Compare each pair of adjacent elements in the array.</p>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <h4 className="text-purple-300 font-medium mb-2">Step 2: Swap if Needed</h4>
                  <p>If elements are in wrong order, swap them.</p>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-3">
                  <h4 className="text-orange-300 font-medium mb-2">Step 3: Repeat Passes</h4>
                  <p>Continue making passes until no swaps are needed.</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-3">
                  <h4 className="text-green-300 font-medium mb-2">Result</h4>
                  <p>The largest elements "bubble up" to their correct positions.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Modal */}
          <StepByStepModal
            isOpen={showStepByStep}
            onClose={() => setShowStepByStep(false)}
            algorithmName="Bubble Sort"
            steps={generateBubbleSortSteps([5, 2, 8, 1, 9])}
            initialArray={[5, 2, 8, 1, 9]}
          />
        </>
      )}
    </div>
  );
};
