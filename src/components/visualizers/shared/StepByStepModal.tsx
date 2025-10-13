
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog';
import { Button } from '@/components/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Badge } from '@/components/badge';
import { ArrayVisualization } from './ArrayVisualization';

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

interface StepByStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  algorithmName: string;
  steps: ExplanationStep[];
  initialArray: number[];
}

export const StepByStepModal: React.FC<StepByStepModalProps> = ({
  isOpen,
  onClose,
  algorithmName,
  steps,
  initialArray
}) => {
  const [currentStep, setCurrentStep] = useState(0);

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

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const resetModal = () => {
    setCurrentStep(0);
  };

  React.useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  if (!steps.length) return null;

  const current = steps[currentStep];

  const highlightText = (text: string, terms: string[] = []) => {
    if (!terms.length) return text;
    
    let highlightedText = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-purple-500/30">
        <DialogHeader className="border-b border-purple-500/30 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white">
              {algorithmName} - Step by Step
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className="text-purple-300 border-purple-400">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <div className="text-sm text-gray-400">
              Input: [{initialArray.join(', ')}]
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Step Title */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              {current.title}
            </h3>
          </div>

          {/* Visual Diagram */}
          <div className="bg-black/30 rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-medium text-purple-300 mb-4 text-center">
              Array State
            </h4>
            <ArrayVisualization 
              elements={current.array}
              className="bg-transparent"
            />
          </div>

          {/* Explanation */}
          <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/30">
            <h4 className="text-lg font-medium text-blue-300 mb-3">
              What's Happening:
            </h4>
            <p className="text-gray-200 text-base leading-relaxed">
              {highlightText(current.description, current.highlightTerms)}
            </p>
            {current.additionalInfo && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm">
                  💡 <strong>Key Insight:</strong> {current.additionalInfo}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {/* Step Indicators */}
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-purple-400' 
                      : index < currentStep 
                        ? 'bg-green-400' 
                        : 'bg-gray-600'
                  }`}
                  title={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
