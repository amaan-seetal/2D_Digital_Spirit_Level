import React, {useState, useEffect} from 'react';
import { throttle } from 'lodash';
import { Container, Title, SvgDrawing, SpiritBubble, SpiritAxis } from './SpiritLevelView.styled'

type orientationType = { 
  alpha: number; 
  beta: number;  
  gamma: number; 
}

const PRECISION = 0; // decimal places
const REFRESH_FREQ = 100; // millisecs

export const AccelerometerComponent = () => {
    const [orientation, setOrientation] = useState<orientationType>({alpha: 0, beta: 0, gamma: 0});

    useEffect(() => {

      const handleOrientation = (event: DeviceOrientationEvent) => {
        const alpha = parseInt(event.alpha?.toFixed(PRECISION) ?? '0');
        const beta = parseInt(event.beta?.toFixed(PRECISION) ?? '0');
        const gamma = parseInt(event.gamma?.toFixed(PRECISION) ?? '0');
        setOrientation({ alpha, beta, gamma})
      };

      const handleOrientationThrottled = throttle(handleOrientation, REFRESH_FREQ)
      window.addEventListener('deviceorientation', handleOrientationThrottled);      
  
      return () => {
        window.removeEventListener('deviceorientation', handleOrientationThrottled);
      };
    }, []);

    const getInRange = (val: number) => {
      if(val > 90) return 90;
      if(val < -90) return -90;
      return val;
    }

    const calcY = (window.innerHeight / 2) * (getInRange(orientation.beta) / 90)
    const calcX = (window.innerWidth / 2) * (getInRange(orientation.gamma) / 90)
    const calcStrokeW = 25 * (orientation.alpha / 360) + 2

    return (
      <Container>
          <Title>2D Spirit Level</Title>
          <p>Alpha: {orientation.alpha}</p>
          <p>Beta : {getInRange(orientation.beta)}</p>
          <p>Gamma: {orientation.gamma}</p>

          <SvgDrawing>
            <SpiritAxis
              x1={window.innerWidth / 2}
              y1="0"
              x2={window.innerWidth / 2}
              y2={window.innerHeight}
            />
            <SpiritAxis
              x1="0"
              y1={window.innerHeight / 2}
              x2={window.innerWidth}
              y2={window.innerHeight / 2}
            />
            <SpiritBubble 
              cx="50" 
              cy="50" 
              fill="none"
              stroke="red"
              stroke-width={calcStrokeW}
              x={calcX} 
              y={calcY}
              r={40}
            />
          </SvgDrawing>

      </Container>      
    );
  };
  
  export default AccelerometerComponent;