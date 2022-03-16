import * as React from "react";
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { CountryEntity } from "../../entities/country.entity";
import { useOutsideClick } from '../../hooks/use-outside-click.hook';

import countries from '../../../data/countries.json';
import { useDispatch, useSelector } from "react-redux";
import { resetCountry, setCountry } from "../../store/country.reducer";

const KEY_ENTER = 'Enter';
const KEY_ARROW_UP = 'ArrowUp';
const KEY_ARROW_DOWN = 'ArrowDown';

const SelectorWrapper = styled.div`
  width: 250px;
  position: relative;
`;

const SelectorInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border-radius: 8px;
  border: 2px solid #9A9A9A;
  background-color: white;
  color: #0A0A0A;
  &:focus {
    border: 2px solid #3F79C9;
  }
`;

const Options = styled.ul`
  width: 100%;
  border-radius: 8px;
  background: white;
  border: 1px solid #9A9A9A;
  max-height: calc(100vh / 2 - 100px);
  position: absolute;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
`;

const OptionItem = styled.li`
  width: 100%;
  padding: 16px 20px;
  border-bottom: 1px solid #9A9A9A;
  &:last-of-type {
    border: none;
  }
  &.selected {
    background-color: #9A9A9A;
  }
`;

export function CountrySelectorComponent(): JSX.Element {
  let filterTimeout: any;
  const ref = useRef(null);

  const [active, setActive] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<CountryEntity[]>(countries);
  const [cursor, setCursor] = useState(0);
  const [searchString, setSearchString] = useState('');
  
  // const count = useSelector(selectCountry);
  const dispatch = useDispatch();

  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useOutsideClick(ref, () => {
    setActive(false);
  })

  function searchHandler(query: string) {
    clearTimeout(filterTimeout);
    dispatch(resetCountry());
    setSearchString(query);
    if (!query) return setFilteredCountries(countries);

    
    filterTimeout = setTimeout(() => {
      itemRefs.current = [];
      setFilteredCountries([
        ...countries.filter(
          country => country.name.toLowerCase().includes(query.toLowerCase())
          )
        ])
    }, 500)
  }

  function handleKeyDown(key: string) {
    let selectedIndex = cursor;

    if (key === KEY_ENTER) {
      selectCountry(filteredCountries[selectedIndex]);
    } else if (key === KEY_ARROW_UP && cursor > 0) {
      selectedIndex = cursor - 1;
      itemRefs.current[selectedIndex]?.scrollIntoView();
    } else if (key === KEY_ARROW_DOWN && cursor < filteredCountries.length - 1) {
      selectedIndex = cursor + 1;
      itemRefs.current[selectedIndex]?.scrollIntoView();
    }

    setCursor(selectedIndex);
  }

  function addToRefs(el: HTMLLIElement | null, index: number) {
    if (el && !itemRefs.current.includes(el)){
      itemRefs.current[index] = el;
    }
  }

  function selectCountry(country: CountryEntity) {
    country.name && setSearchString(country.name);
    dispatch(setCountry(country));
    setFilteredCountries([]);
  }

  function isShowOptions() {
    return active && filteredCountries.length > 0;
  }

  function OptionsComponent(list: CountryEntity[], cursor: number): JSX.Element {
    return (<>
      <Options role="listbox">
        {list.map((country, i) => (
          <OptionItem
            key={country.code}
            className={cursor === i ? 'selected' : ''}
            onMouseEnter={() => setCursor(i)}
            onClick={e => selectCountry(country)}
            ref={el => addToRefs(el, i)}
          >
            <span>{country.emoji}  {country.name}</span>
          </OptionItem>)
        )}
      </Options>
    </>);
  }

  return (<>
    <SelectorWrapper
      ref={ref}
      onKeyDown={(e) => (handleKeyDown(e.key))}
      onFocus={() => setActive(true)}
    >
      <SelectorInput
        type='text'
        placeholder='Select country'
        value={searchString}
        onChange={e => (searchHandler(e.target.value))}
      />
      {isShowOptions() && OptionsComponent(filteredCountries, cursor)}
    </SelectorWrapper>
  </>);
};
