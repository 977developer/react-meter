import {useEffect} from 'react';
import needle from './needle.svg';
import './App.css';

function App() {
  
  // Circle related
  const radius = 120;
  const cf = 2 * Math.PI * radius;
  const semi_cf = cf / 2;

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
  }

  const formatDashArray = (val1, val2) => val1 + ',' + val2;

  useEffect(() => {
    setWrapperDimension();
    changeRange(percent);
  });

  return (
    <div className="wrapper">
      <svg id="meter">
        
        <circle 
          id="mask" 
          className="circle" 
          strokeDasharray={formatDashArray(semi_cf, semi_cf)}
          r={radius}
          cx="50%" 
          cy="50%">
        </circle>

        <circle 
          id="high" 
          className="circle range"
          strokeDasharray={formatDashArray(cf / 1.3 , semi_cf)}
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke="#d46b58">
        </circle>

        <circle 
          id="avg" 
          className="circle range"
          strokeDasharray={formatDashArray(cf / 2.55 , semi_cf * 2)}
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke="#e6c15c">
        </circle>

        <circle 
          id="low" 
          className="circle range"
          strokeDasharray={formatDashArray(cf / 5.55 , semi_cf * 2)}
          r={radius} 
          cx="50%" 
          cy="50%" 
          stroke="#59b69d">
        </circle>

      </svg>
      <p id="label">
        <small id="left">{minValue.toLocaleString()}</small>
        <small id="right">{maxValue.toLocaleString()}</small>
      </p>
      <img id="meter_needle" src={needle} alt="marker needle" />
      <h1 id="selected_value">{selectedValue.toLocaleString()}</h1>

    </div>
  );
}

export default App;
