import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { CountryEntity } from '../../entities/country.entity';
import { selectCountry } from '../../store/country.reducer';

const Background = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const marqueeAnimation = keyframes`
  0%{transform: translate(0, 0);}
  100%{transform: translate(-100%, 0)}
`

const Line = styled.div`
  height: 20px;
  background: black;
  color: white;
`;

const Marquee = styled.div`
  white-space:nowrap;
  overflow:hidden;
  & span {
    display:inline-block;
    padding-left:100%;
    animation: ${marqueeAnimation} 10s infinite linear;
  }
`;

export function BackgroundComponent(): JSX.Element {
  const country = useSelector(selectCountry);

  return (<>
    <Background>
      {country && [null, null].map(() => (
        <Line>
          <Marquee><span>
            Selected country: --- 
            {country.emoji}
            {country.emoji}
            {country.emoji}
            {country.name}
            {country.emoji}
            {country.emoji}
            {country.emoji}
          </span></Marquee>
        </Line>
      ))}
    </Background>
  </>);
}