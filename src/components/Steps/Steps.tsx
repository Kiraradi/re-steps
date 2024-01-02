import React, { useState } from 'react';
import { resultItem } from '../../interfaces/resultItem';
import ResultList from '../ResultList/ResultList';

import './Steps.css';

let list: resultItem[] = [];

export default function Steps() {
  const initFormState = {
    date: "",
    distance: 0
  }
  const [resultFromForm, setResultFromForm] = useState(initFormState);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewResult(resultFromForm);
    setResultFromForm(initFormState);
  }

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResultFromForm({...resultFromForm, [name]: value});
  }

  const deleteResult = (index: number) => {
    if (index >= 0) {
      list.splice(index, 1);
      setResultFromForm(initFormState);
    }
  }

  const addNewResult = (result: resultItem) => {
    const index = list.findIndex(i => i.date === result.date);

    if (index === -1) {
      list.push(result);
    } else {
      list[index].distance = Number(list[index].distance) + Number(result.distance);
    }
    
    list = list.sort((a, b) => {
          const date1 = new Date(a.date);
          const date2 = new Date(b.date);

          if (date1 > date2) {
            return 1;
          }
          if (date1 < date2) {
            return -1;
          }
          
          return 0;
        });
  }

  return (
    <div className='steps_wrapper'>
        <form className='steps_form' onSubmit={submitForm}>
          <div className='imput_wrapper'>
            <label htmlFor="date">Дата(ДД.ММ.ГГГГ)</label>
            <input 
            className='input' 
            name='date' 
            value={resultFromForm.date}
            onChange={handlerChange}
            type='text'
            pattern='\d{1,2}.\d{1,2}.\d{4}' 
            required/>
          </div>
          <div className='imput_wrapper'>
            <label htmlFor="distance-input">Пройдено км</label>
            <input 
            className='input' 
            name='distance' 
            pattern='^[ 0-9]+$' 
            value={resultFromForm.distance}
            onChange={handlerChange}
            type='text' 
            required/>
          </div>
          <button className='button_submit' type='submit'>Ok</button>          
        </form>

        <ResultList results={list} deleteResult={deleteResult}/>
    </div>
  )
}
