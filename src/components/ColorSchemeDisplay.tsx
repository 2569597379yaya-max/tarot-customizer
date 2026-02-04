'use client';

import { ColorScheme } from '@/types';
import Product3D from './Product3D';
import { useState } from 'react';

interface ColorSchemeDisplayProps {
  colorSchemes: ColorScheme[];
  onSelectScheme?: (scheme: ColorScheme) => void;
}

export default function ColorSchemeDisplay({ colorSchemes, onSelectScheme }: ColorSchemeDisplayProps) {
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0]);
  const [selectedProduct, setSelectedProduct] = useState<'chair' | 'lamp' | 'vase' | 'room'>('chair');

  const handleSchemeSelect = (scheme: ColorScheme) => {
    setSelectedScheme(scheme);
    onSelectScheme?.(scheme);
  };

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    // 这里可以添加一个toast通知
  };

  // 统一体验：右侧操作按钮与清空功能
  const clearAllSelections = () => {
    // 将选择恢复为第一个方案，模拟“清空所有珠子”的效果
    if (colorSchemes && colorSchemes.length > 0) {
      setSelectedScheme(colorSchemes[0]);
    }
    setSelectedProduct('chair');
  };

  const restart = () => {
    // 简化的重新测试：恢复默认方案与产品类型
    clearAllSelections();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          你的专属配色方案
        </h2>

        {/* 产品类型选择器 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-md">
            {([
              { key: 'chair', label: '椅子', icon: '🪑' },
              { key: 'lamp', label: '台灯', icon: '💡' },
              { key: 'vase', label: '花瓶', icon: '🏺' },
              { key: 'room', label: '房间', icon: '🏠' }
            ] as Array<{ key: 'chair' | 'lamp' | 'vase' | 'room'; label: string; icon: string }>).map((product) => (
              <button
                key={product.key}
                onClick={() => setSelectedProduct(product.key)}
                className={`px-4 py-2 mx-1 rounded-md transition-all duration-200 ${
                  selectedProduct === product.key
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{product.icon}</span>
                {product.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D预览区域 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">3D预览</h3>
            <Product3D colorScheme={selectedScheme} productType={selectedProduct} />
            
            {/* 颜色详情卡片 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">配色详情</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: '主色', color: selectedScheme.primary, description: '主要品牌色彩' },
                  { name: '辅助色', color: selectedScheme.secondary, description: '辅助装饰色彩' },
                  { name: '强调色', color: selectedScheme.accent, description: '重点突出色彩' },
                  { name: '背景色', color: selectedScheme.background, description: '背景基础色彩' },
                  { name: '文字色', color: selectedScheme.text, description: '文字内容色彩' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <button
                      onClick={() => copyColorToClipboard(item.color)}
                      className="w-12 h-12 rounded-lg shadow-md border-2 border-gray-200 hover:scale-105 transition-transform duration-200"
                      style={{ backgroundColor: item.color }}
                      title={`点击复制 ${item.color}`}
                    />
                    <div>
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.color}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 配色方案选择区域 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">选择配色方案</h3>
            <div className="space-y-4">
              {colorSchemes.map((scheme, index) => (
                <div
                  key={index}
                  onClick={() => handleSchemeSelect(scheme)}
                  className={`bg-white rounded-lg p-4 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedScheme === scheme ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">方案 {index + 1}</h4>
                    {selectedScheme === scheme && (
                      <span className="text-blue-500 text-sm">✓ 已选择</span>
                    )}
                  </div>
                  
                  {/* 颜色条 */}
                  <div className="flex space-x-1 mb-3">
                    {[scheme.primary, scheme.secondary, scheme.accent, scheme.background, scheme.text].map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="flex-1 h-8 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  {/* 颜色值 */}
                  <div className="grid grid-cols-5 gap-2 text-xs text-gray-600">
                    <div className="text-center">
                      <div className="font-medium">主色</div>
                      <div>{scheme.primary}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">辅助</div>
                      <div>{scheme.secondary}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">强调</div>
                      <div>{scheme.accent}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">背景</div>
                      <div>{scheme.background}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">文字</div>
                      <div>{scheme.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 配色原理（统一体验：显示在选择模块下方） */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold mb-3 text-gray-800">配色原理</h4>
              <p className="mb-3 text-sm bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400 text-gray-700">
                基于色彩理论和心理学的搭配原则为您生成方案。
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>主色用于品牌与视觉焦点，增强识别度。</div>
                <div>辅助色与强调色用于层次与引导，提升互动体验。</div>
                <div>背景与文字色保证内容可读性与对比度。</div>
              </div>
            </div>

            {/* 操作按钮（右侧：加入购物车、清空所有珠子、重新测试） */}
            <div className="space-y-3">
              <button
                onClick={() => console.log('add to cart')}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                加入购物车
              </button>
              <button
                onClick={clearAllSelections}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                清空所有珠子
              </button>
              <button
                onClick={restart}
                className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                重新测试
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
