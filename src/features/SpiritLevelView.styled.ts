import {styled} from 'styled-components'

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #BF4F74;
`;

export const Container = styled.div`
    width: 100%;
    height: 500px;
    overflow: hidden;
`

export const SvgDrawing = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`

export const SpiritBubble = styled.circle<{
    x: number;
    y: number;
    r: number;
}>`
    position: relative;
    transform: translate(calc(50% - 50px - ${props => props.x}px), calc(50% - 50px - ${props => props.y}px));
`

export const SpiritAxis = styled.line`
    position: relative;
    stroke: grey;
    stroke-width: 2;
    stroke-dasharray: 5;
`