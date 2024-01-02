import React from 'react';
import { resultList } from '../../interfaces/resultList';
import './ResultList.css';

export default function ResultList(props: resultList) {
    
    const { results, deleteResult } = props;

    return (
        <div className='result_list_wrapper'>
            <ul className='column_names'>
                <li className='column_name'>{'Дата(ДД.ММ.ГГ)'}</li>
                <li className='column_name'>{'Пройдено км'}</li>
                <li className='column_name'>{'Действия'}</li>
            </ul>
            <div className='result_list'>
                {
                    results.map((result, index)=> {
                        return <div className='result_item' key={index}>
                            <p className='result_date'>{result.date}</p>
                            <p className='result_distance'>{result.distance}</p>
                            <div className='buttons_bar'>
                            <span className="material-symbols-outlined button" onClick={() => deleteResult(index)}>close</span> 
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
