import React from 'react';
import ChipAdaptationView from './adaptation/ChipAdaptationView';
import NetworkAdaptationView from './adaptation/NetworkAdaptationView';
import OperatorAdaptationView from './adaptation/OperatorAdaptationView';
import ClusterAdaptationView from './adaptation/ClusterAdaptationView';
import PerformanceOptimizationView from './adaptation/PerformanceOptimizationView';
import EngineAdaptationView from './adaptation/EngineAdaptationView';
import ModelInferenceView from './adaptation/ModelInferenceView';

interface AdaptationViewProps {
  activeSubMenu: string;
}

export default function AdaptationView({ activeSubMenu }: AdaptationViewProps) {
  const renderSubView = () => {
    switch (activeSubMenu) {
      case 'chip':
        return <ChipAdaptationView />;
      case 'storage':
        return <NetworkAdaptationView />;
      case 'operator':
        return <OperatorAdaptationView />;
      case 'cluster':
        return <ClusterAdaptationView />;
      case 'performance':
        return <PerformanceOptimizationView />;
      case 'engine':
        return <EngineAdaptationView />;
      case 'model-adapt':
        return <ModelInferenceView />;
      default:
        return <ChipAdaptationView />;
    }
  };

  return (
    <div className="w-full h-full">
      {renderSubView()}
    </div>
  );
}

