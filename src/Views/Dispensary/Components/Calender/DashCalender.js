import moment from 'moment';
import React, { useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { UseCommonData } from '../../../../Hooks/UseCommonData';
import './css/style.css'

function DashCalender() {
    const { set_dash_calender_date } = UseCommonData();

    const get_data = (value) => {
        set_date(value);
    }

    const set_date = (value) => {
        let date = new Date(value);
        let formated_date = moment(date).format('MMMM DD YYYY, h:mm:ss a');
        console.log(formated_date);
        set_dash_calender_date({
            month: date.getMonth(),
            date: date.getDate(),
            year: date.getFullYear(),
            month_name: moment(date).format('MMMM')
        })
    }
    

    useEffect(() => {
        set_date(new Date());
    }, [])
    
    return (
        <div>
            <Calendar onChange={(value)=>get_data(value)}></Calendar>
        </div>
    )
}

export default DashCalender
