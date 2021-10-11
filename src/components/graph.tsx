import { Line } from 'react-chartjs-2'
import { useEffect, useState } from "react"
import DateRange from './dateRangePicker'

interface ThreatData {
    [key: string]: string | number;
}

interface StringMapData {
    [key: string]: number;
}

function Graph() {
    const [startDate, setStartDate] = useState(new Date("2021-08-4"));
    const [endDate, setEndDate] = useState(new Date("2021-08-10"));
    const [dateRangeList, setDateRangeList] = useState<Array<string>>([]);
    const [yAxisRangeList, setYAxisRangeList] = useState<Array<number>>([]);
    const [threatData, setThreatData] = useState<ThreatData[]>([]);
    const url = './data.json';

    const getDaysArray = function (start: Date, end: Date) {
        let arr, dt;
        for (arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            const newDate = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
            arr.push(newDate);
        }
        console.log("graph.tsx", arr);
        setDateRangeList(arr);
    };

    const data = {
        labels: dateRangeList,
        datasets: [
            {
                label: 'Events occurred in selected date range',
                data: yAxisRangeList,
                borderColor: ['orange'],
                backgroundColor: ['orange'],
                pointBackgroundColor: 'orange',
                pointBorderColor: 'orange'
            }
        ]
    }

    const options: any = {
        title: {
            display: true,
            text: 'Line Chart'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 6,
                        stepSize: 1
                    }
                }
            ]
        }
    }

    useEffect(() => {
        const getData = async () => {
            const respJSON = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const response = await respJSON.json();
            setThreatData(response);

        }
        getData();
    }, [])

    useEffect(() => {
        const setYAxisRange = () => {
            let yAxisMap: StringMapData = {}
            threatData.forEach((item: any) => {
                let dateAsKey = item.timestamp.slice(0, 10);
                if (yAxisMap[dateAsKey]) {
                    yAxisMap[dateAsKey] = yAxisMap[dateAsKey] + 1;
                } else {
                    yAxisMap[dateAsKey] = 1;
                }
            })
            let yAxisRangeList = dateRangeList.map(item => {
                if (!yAxisMap[item]) {
                    return 0
                }
                return yAxisMap[item]
            });
            setYAxisRangeList(yAxisRangeList)
            console.log("yAxisMap", yAxisMap);
            console.log("yAxisRangeMap", yAxisRangeList);
        }
        setYAxisRange();
    }, [threatData, dateRangeList])
    return (
        <div>
            <div className="date_range_picker"><DateRange startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} getDaysArray={getDaysArray} /></div>
            <div className="line_graph"><Line data={data} options={options} /></div>
        </div>
    )
}

export default Graph