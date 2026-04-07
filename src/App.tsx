/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import AdaptationView from './views/AdaptationView';
import PromptView from './views/PromptView';
import KnowledgeView from './views/KnowledgeView';
import PluginView from './views/PluginView';
import InferenceView from './views/InferenceView';
import EvaluationView from './views/EvaluationView';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('adaptation');
  const [activeSubMenu, setActiveSubMenu] = useState('chip');

  const handleMenuChange = (menuId: string, subMenuId: string) => {
    setActiveMenu(menuId);
    setActiveSubMenu(subMenuId);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'adaptation':
        return <AdaptationView activeSubMenu={activeSubMenu} />;
      case 'prompt':
        return <PromptView activeSubMenu={activeSubMenu} />;
      case 'knowledge':
        return <KnowledgeView activeSubMenu={activeSubMenu} />;
      case 'plugin':
        return <PluginView activeSubMenu={activeSubMenu} />;
      case 'inference':
        return <InferenceView activeSubMenu={activeSubMenu} />;
      case 'evaluation':
        return <EvaluationView activeSubMenu={activeSubMenu} />;
      default:
        return <AdaptationView activeSubMenu={activeSubMenu} />;
    }
  };

  return (
    <Layout 
      activeMenu={activeMenu} 
      activeSubMenu={activeSubMenu} 
      onMenuChange={handleMenuChange}
    >
      {renderContent()}
    </Layout>
  );
}

