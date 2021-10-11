import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface propsData {
    startDate: Date, setStartDate: Function, endDate: Date, setEndDate: Function, getDaysArray:Function
}

export default function DateRange(props: propsData) {
    const { startDate, setStartDate, endDate, setEndDate, getDaysArray } = props;

    const handleStartDateChange = (date: Date) => {
        console.log(date);
        setStartDate(date)
    }

    const handleEndDateChange = (endDate: Date) => {
        console.log(endDate);
        setEndDate(endDate);
    }


    useEffect(() => {
        getDaysArray(startDate, endDate);
    }, [startDate, endDate])

    return (
        <>
            <DatePicker
                selected={startDate}
                onChange={(date: Date) => handleStartDateChange(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <DatePicker
                selected={endDate}
                onChange={(date: Date) => handleEndDateChange(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
        </>
    );
};