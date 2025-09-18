'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import styles from './Math.module.css';

const Math = () => {
  const [inputValue, setInputValue] = useState<number | ''>('');
  const [result, setResult] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(250); 
  const [shrinkClass, setShrinkClass] = useState('');
  const [projectedIncome, setProjectedIncome] = useState<number>(0);

  useEffect(() => {
    if (inputValue !== '') {
      setResult(inputValue * multiplier);
      calculateProjectedIncome();
    } else {
      setResult(0);
      setProjectedIncome(0);
    }
  }, [inputValue, multiplier]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value === '' ? '' : parseFloat(value));
    if (shrinkClass) setShrinkClass(''); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '') {
      setShrinkClass(styles.shrink);
      setTimeout(() => setShrinkClass(''), 300); 
    }
  };

  const changeMultiplier = () => {
    setMultiplier(multiplier === 250 ? 365 : 250); 
  };

  const calculateProjectedIncome = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    
    const totalDaysThisYear = ((endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const daysPassedThisYear = ((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const fractionOfYearPassed = daysPassedThisYear / totalDaysThisYear;
    
    const tradingDaysPassed = fractionOfYearPassed * multiplier;
    const tradingDaysLeft = multiplier - tradingDaysPassed;
    
    const dailyIncome = Number(inputValue) || 0;
    const projected = dailyIncome * tradingDaysLeft;
    setProjectedIncome(projected);
  };

  const formatWithCommas = (value: number) => {
    const fixedValue = value.toFixed(2);
    let [integerPart, decimalPart] = fixedValue.split('.');
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${integerPart}.${decimalPart}`;
  };

  const pnlColorClass = result >= 0  ? 'text-green-700' : 'text-red-700';

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          How much did you make today?
        </h2>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <input 
            type="number"
            className={`w-64 h-14 pl-8 pr-4 text-2xl font-semibold text-center bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${shrinkClass}`}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="0.00"
          />
        </div>
        
        {inputValue !== '' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <p className="text-lg text-slate-600 mb-2">per day equals</p>
              <div className="text-4xl md:text-5xl font-bold">
                <span className={`${pnlColorClass} drop-shadow-sm`}>
                  {inputValue < 0 ? `-$${formatWithCommas(-result)}` : `$${formatWithCommas(result)}`}
                </span>
                <span className="text-slate-600 text-2xl md:text-3xl ml-2">per year</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <button 
                onClick={changeMultiplier} 
                className="group cursor-pointer text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                <span className="text-sm">Based on </span>
                <span className="font-semibold text-lg group-hover:text-blue-600 underline decoration-2 decoration-blue-500/30 group-hover:decoration-blue-500">
                  {multiplier}
                </span>
                <span className="text-sm"> trading days per year</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-medium text-slate-600 mb-2">
                Projected remaining year income:
              </h3>
              <div className={`text-xl font-bold ${pnlColorClass}`}>
                {inputValue < 0 ? `-$${formatWithCommas(-projectedIncome)}` : `$${formatWithCommas(projectedIncome)}`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Math;