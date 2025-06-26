import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Building, Target, BarChart, Map, Shield, Users, RefreshCw, CheckCircle, Download } from 'lucide-react';

const AIStrategyAdvisor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [organizationProfile, setOrganizationProfile] = useState<Record<string, any>>({});
  const [showCanvas, setShowCanvas] = useState(false);

  const steps = [
    { id: 'profile', title: 'Organization Profile', icon: Building, color: 'bg-blue-500' },
    { id: 'vision', title: 'Vision & Value', icon: Target, color: 'bg-purple-500' },
    { id: 'alignment', title: 'Business Alignment', icon: BarChart, color: 'bg-green-500' },
    { id: 'capabilities', title: 'Current Capabilities', icon: CheckCircle, color: 'bg-orange-500' },
    { id: 'roadmap', title: 'Implementation Roadmap', icon: Map, color: 'bg-indigo-500' },
    { id: 'risk', title: 'Risk & Governance', icon: Shield, color: 'bg-red-500' },
    { id: 'change', title: 'Change Management', icon: Users, color: 'bg-teal-500' },
    { id: 'evaluation', title: 'Evaluation & Adaptation', icon: RefreshCw, color: 'bg-pink-500' }
  ];

  const profileQuestions = [
    {
      id: 'industry',
      question: 'What industry does your organization operate in?',
      type: 'select',
      options: ['Healthcare', 'Financial Services', 'Manufacturing', 'Retail/E-commerce', 'Government/Public Sector', 'Professional Services', 'Technology', 'Education', 'Other']
    },
    {
      id: 'size',
      question: 'What is your organization size?',
      type: 'select',
      options: ['Startup (< 50 employees)', 'SME (50-500 employees)', 'Large Enterprise (500-5000 employees)', 'Global Enterprise (5000+ employees)']
    },
    {
      id: 'maturity',
      question: 'What is your current AI maturity level?',
      type: 'select',
      options: ['Beginner (Exploring AI potential)', 'Intermediate (Some pilots/experiments)', 'Advanced (Strategic AI implementation)', 'Leader (AI-driven business model)']
    },
    {
      id: 'goal',
      question: 'What is your primary AI goal?',
      type: 'select',
      options: ['Cost Optimization', 'Customer Experience Enhancement', 'Innovation & New Revenue', 'Risk Reduction', 'Operational Efficiency', 'Competitive Advantage']
    }
  ];

  const questionSets: Record<string, any[]> = {
    vision: [
      {
        id: 'innovation_vision',
        question: 'How do you envision AI driving innovation within your organization?',
        type: 'textarea',
        placeholder: 'Describe your vision for AI-powered innovation...'
      },
      {
        id: 'business_models',
        question: 'What new business models could AI enable?',
        type: 'textarea',
        placeholder: 'Consider new ways AI could create value...'
      },
      {
        id: 'high_impact_processes',
        question: 'Which processes offer the highest potential for AI enhancement?',
        type: 'multiselect',
        options: ['Customer Service', 'Sales & Marketing', 'Operations & Supply Chain', 'Finance & Accounting', 'Human Resources', 'Product Development', 'Quality Control', 'Risk Management']
      }
    ],
    alignment: [
      {
        id: 'business_goals',
        question: 'How do AI initiatives support your core business goals?',
        type: 'textarea',
        placeholder: 'Connect AI initiatives to business objectives...'
      },
      {
        id: 'pressing_challenges',
        question: 'What business challenges could AI address?',
        type: 'multiselect',
        options: ['Revenue Growth', 'Cost Reduction', 'Customer Retention', 'Market Expansion', 'Operational Efficiency', 'Talent Acquisition', 'Regulatory Compliance', 'Digital Transformation']
      },
      {
        id: 'expected_roi',
        question: 'Expected ROI timeframe for AI initiatives?',
        type: 'select',
        options: ['3-6 months', '6-12 months', '1-2 years', '2-3 years', 'Long-term (3+ years)']
      }
    ],
    capabilities: [
      {
        id: 'ai_readiness',
        question: 'Rate your AI readiness (1-5 scale):',
        type: 'matrix',
        dimensions: ['Technology Infrastructure', 'Data Quality', 'Technical Skills', 'Leadership Commitment', 'Cultural Readiness']
      },
      {
        id: 'data_maturity',
        question: 'How mature is your data infrastructure?',
        type: 'select',
        options: ['Basic (Siloed data)', 'Developing (Some integration)', 'Mature (Integrated systems)', 'Advanced (AI-ready platform)']
      }
    ],
    roadmap: [
      {
        id: 'first_projects',
        question: 'Which AI projects should you tackle first?',
        type: 'textarea',
        placeholder: 'Describe your pilot project priorities...'
      },
      {
        id: 'investment_required',
        question: 'What level of financial investment are you prepared to make?',
        type: 'select',
        options: ['< $100K', '$100K - $500K', '$500K - $2M', '$2M - $10M', '$10M+']
      }
    ],
    risk: [
      {
        id: 'ethical_principles',
        question: 'What ethical principles will guide your AI deployment?',
        type: 'multiselect',
        options: ['Fairness & Non-discrimination', 'Transparency', 'Privacy Protection', 'Human Oversight', 'Accountability', 'Safety & Security']
      }
    ],
    change: [
      {
        id: 'employee_concerns',
        question: 'How will you address employee concerns about AI?',
        type: 'textarea',
        placeholder: 'Describe your approach to managing concerns...'
      }
    ],
    evaluation: [
      {
        id: 'success_metrics',
        question: 'What KPIs will you use to track success?',
        type: 'multiselect',
        options: ['ROI/Financial Returns', 'Operational Efficiency', 'Customer Satisfaction', 'Employee Productivity', 'Innovation Metrics', 'Risk Reduction']
      }
    ]
  };

  const getCurrentQuestions = () => {
    if (currentStep === 0) return profileQuestions;
    const stepId = steps[currentStep].id;
    return questionSets[stepId] || [];
  };

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleProfileResponse = (questionId: string, value: any) => {
    setOrganizationProfile(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCanvas(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderInput = (question: any, isProfile = false) => {
    const handleChange = isProfile ? handleProfileResponse : handleResponse;
    const value = isProfile ? organizationProfile[question.id] : responses[question.id];

    switch (question.type) {
      case 'select':
        return (
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={value || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
          >
            <option value="">Select an option...</option>
            {question.options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {question.options.map((option: string) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-600"
                  checked={(value || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option);
                    handleChange(question.id, newValues);
                  }}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder={question.placeholder}
            value={value || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        );

      case 'matrix':
        return (
          <div className="space-y-3">
            {question.dimensions.map((dimension: string) => (
              <div key={dimension} className="flex items-center justify-between">
                <span className="text-gray-700 flex-1">{dimension}</span>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name={`${question.id}_${dimension}`}
                        value={rating}
                        checked={(value || {})[dimension] === rating}
                        onChange={() => {
                          handleChange(question.id, { ...(value || {}), [dimension]: rating });
                        }}
                        className="text-blue-600"
                      />
                      <span className="ml-1 text-sm">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={value || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        );
    }
  };

  const generateRecommendations = () => {
    const maturity = organizationProfile.maturity;
    const industry = organizationProfile.industry;
    
    let recommendations: Array<{category: string, items: string[]}> = [];

    if (maturity?.includes('Beginner')) {
      recommendations.push({
        category: 'Immediate Actions',
        items: [
          'Start with AI literacy training for leadership',
          'Conduct data audit and quality assessment',
          'Identify 2-3 low-risk pilot projects',
          'Establish AI governance principles'
        ]
      });
    }

    if (industry === 'Healthcare') {
      recommendations.push({
        category: 'Healthcare Focus',
        items: [
          'Prioritize patient privacy and HIPAA compliance',
          'Focus on clinical decision support systems',
          'Consider AI for medical imaging',
          'Implement AI-powered patient engagement'
        ]
      });
    } else if (industry === 'Financial Services') {
      recommendations.push({
        category: 'Financial Services Focus',
        items: [
          'Implement fraud detection and risk management',
          'Explore robo-advisory services',
          'Ensure regulatory compliance',
          'Develop algorithmic trading capabilities'
        ]
      });
    }

    return recommendations;
  };

  const AIStrategyCanvas = () => {
    const recommendations = generateRecommendations();
    
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 AI Strategy Canvas</h2>
          <p className="text-gray-600">Customized roadmap for {organizationProfile.industry} organization</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <Building className="mr-2" />
              Organization Profile
            </h3>
            <div className="space-y-2">
              <p><strong>Industry:</strong> {organizationProfile.industry}</p>
              <p><strong>Size:</strong> {organizationProfile.size}</p>
              <p><strong>AI Maturity:</strong> {organizationProfile.maturity}</p>
              <p><strong>Primary Goal:</strong> {organizationProfile.goal}</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
              <Target className="mr-2" />
              Key Recommendations
            </h3>
            {recommendations.map((rec, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold text-green-800 mb-2">{rec.category}</h4>
                <ul className="space-y-1">
                  {rec.items.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-sm text-green-700 flex items-start">
                      <CheckCircle size={16} className="mr-2 mt-0.5 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
            <Map className="mr-2" />
            90-Day Implementation Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded p-4">
              <h4 className="font-bold text-purple-800 mb-2">Days 1-30: Foundation</h4>
              <ul className="space-y-1 text-sm">
                <li>• Leadership AI literacy training</li>
                <li>• Data audit and quality assessment</li>
                <li>• Governance framework establishment</li>
                <li>• Pilot project identification</li>
              </ul>
            </div>
            <div className="bg-white rounded p-4">
              <h4 className="font-bold text-purple-800 mb-2">Days 31-60: Building</h4>
              <ul className="space-y-1 text-sm">
                <li>• Team formation and training</li>
                <li>• Data platform preparation</li>
                <li>• Pilot project initiation</li>
                <li>• Change management rollout</li>
              </ul>
            </div>
            <div className="bg-white rounded p-4">
              <h4 className="font-bold text-purple-800 mb-2">Days 61-90: Execution</h4>
              <ul className="space-y-1 text-sm">
                <li>• Pilot project delivery</li>
                <li>• Success metrics tracking</li>
                <li>• Scaling strategy development</li>
                <li>• Next phase planning</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Immediate Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Week 1 Priorities</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Schedule leadership alignment meeting</li>
                <li>• Initiate data audit process</li>
                <li>• Define AI governance committee</li>
                <li>• Identify pilot project sponsors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Resource Requirements</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Executive sponsor commitment</li>
                <li>• Cross-functional project team</li>
                <li>• Initial budget allocation</li>
                <li>• External advisor consideration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <Download className="mr-2" size={20} />
            Download Strategy Canvas
          </button>
        </div>
      </div>
    );
  };

  if (showCanvas) {
    return <AIStrategyCanvas />;
  }

  const currentQuestions = getCurrentQuestions();
  const isProfile = currentStep === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🤖 AI Strategy Advisor</h1>
          <p className="text-xl text-gray-600">Strategic AI Assessment & Implementation Planning</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 ${
                    isActive ? step.color : 
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <span className={`text-xs text-center ${
                    isActive ? 'text-gray-900 font-semibold' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isProfile ? '🏢 Organization Profile' : `${steps[currentStep].title}`}
            </h2>
            <p className="text-gray-600">
              {isProfile 
                ? 'Tell us about your organization to customize our recommendations'
                : `Answer the questions below to assess your ${steps[currentStep].title.toLowerCase()}`
              }
            </p>
          </div>

          <div className="space-y-6">
            {currentQuestions.map(question => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  {question.question}
                </label>
                {renderInput(question, isProfile)}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="mr-2" size={20} />
              Previous
            </button>
            
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Generate Strategy Canvas' : 'Next'}
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500">
          Step {currentStep + 1} of {steps.length} • Estimated time: {currentStep === 0 ? '2' : '5-10'} minutes
        </div>
      </div>
    </div>
  );
};

export default AIStrategyAdvisor;
