import {useEffect} from 'react';
import needle from './needle.svg';
import './App.css';

function App() {
  
  // Circle related
  const radius = 200;
  const cf = 2 * Math.PI * radius;
  const semi_cf = cf / 2;
  const semi_cf_1by3 = semi_cf / 3;
  const semi_cf_2by3 = semi_cf_1by3 * 2;

  // Calculate percent to be filled
  const maxValue = 10202;
  const minValue = 0;
  const selectedValue = 7382;
  const percent = selectedValue * 100 / maxValue;

  const setWrapperDimension = () => {
    const meterDimension = (radius * 2) + 100;
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.width = meterDimension + 'px';
    wrapper.style.height = meterDimension + 'px';
  }

  const changeRange = (percent) => {
    const mask = document.querySelector('#mask');
    const meter_needle =  document.querySelector('#meter_needle');

    const meter_value = semi_cf - ((percent * semi_cf) / 100);
    mask.setAttribute('stroke-dasharray', meter_value + ',' + cf);
    meter_needle.style.transform = 'rotate(' + (270 + ((percent * 180) / 100)) + 'deg)';
    // lbl.textContent = percent + '%';
  }

  const formatDashArray = (val1, val2) => val1*1.25 + ',' + val2;

  useEffect(() => {
    setWrapperDimension();
    changeRange(percent);
  });

  return (
    <div className="wrapper">
      <svg id="meter">
        
        <circle 
          id="outline_curves" 
          className="circle outline"
          strokeDasharray={formatDashArray(semi_cf, cf)}
          r={radius} 
          cx="50%" 
          cy="50%">
        </circle>

        <circle 
          id="low" 
          className="circle range"
          strokeDasharray={formatDashArray(semi_cf, cf)}
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke="#FDE47F">
        </circle>
        
        <circle 
          id="avg" 
          className="circle range"
          strokeDasharray={formatDashArray(semi_cf_2by3, cf)}
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke="#7CCCE5">
        </circle>
        
        <circle 
          id="high" 
          className="circle range"
          strokeDasharray={formatDashArray(semi_cf_1by3, cf)}
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke="#E04644">
        </circle>
        
        <circle 
          id="mask" 
          className="circle" 
          strokeDasharray={formatDashArray(semi_cf, cf)}
          r={radius}
          cx="50%" 
          cy="50%">
        </circle>

        <circle 
          id="outline_ends" 
          className="circle outline"
          strokeDasharray={formatDashArray(2, semi_cf - 2)}
          r={radius} 
          cx="50%" 
          cy="50%">
        </circle>
      </svg>
      <p id="label">
        <small id="left">{minValue}</small>
        <small id="right">{maxValue}</small>
      </p>
      <img id="meter_needle" src={needle} alt="marker needle" />
      <h1 id="selected_value">{selectedValue}</h1>

    </div>
  );
}

export default App;
