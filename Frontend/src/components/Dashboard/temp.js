import React, { useState, useEffect } from 'react';
import GaugeChartComponent from '../GuageChart/GuageChart';
import LineChartComponent from '../LineChart/LineChart';
import FieldDisplay from '../NewDashboard/FieldDisplay';
import { fetchChannelData } from '../NewDashboard/FetchChannel';

const ChannelDashboard = () => {

    const [fieldData, setFieldData] = useState({});
    const [fieldCounts, setFieldCounts] = useState({});
    const [historicalData, setHistoricalData] = useState({});
    const [chartTypes, setChartTypes] = useState({});


    const id = "channel_id";
    const token = localStorage.getItem("token");


    useEffect(() => {

        fetchChannelData(
            id,
            token,
            setFieldData,
            setHistoricalData,
            setFieldCounts
        );

    }, []);



    useEffect(() => {

        if(Object.keys(fieldData).length > 0){

            const fields = Object.keys(fieldData);

            const initialTypes = {};

            fields.forEach(field=>{
                initialTypes[field] = "line";
            });

            setChartTypes(initialTypes);
        }

    },[fieldData]);



    const handleChartTypeChange = (field,type)=>{

        setChartTypes(prev=>({
            ...prev,
            [field]:type
        }));

    };


    return (

        <div className="charts-container">

            {
                Object.keys(fieldData).map((field,index)=>(

                    <div className="chart mb-4" key={index}>


                        <FieldDisplay

                            name={field}

                            value={fieldData[field]}

                            count={fieldCounts[field] || 0}

                        />



                        <select

                            className="form-select mb-2"

                            value={chartTypes[field] || "line"}

                            onChange={(e)=>
                                handleChartTypeChange(
                                    field,
                                    e.target.value
                                )
                            }

                        >

                            <option value="all">
                                All Widgets
                            </option>

                            <option value="gauge">
                                Gauge
                            </option>

                            <option value="line">
                                Chart
                            </option>

                            <option value="toggle">
                                Toggle
                            </option>

                        </select>



                        {
                            (chartTypes[field] === "gauge" ||
                            chartTypes[field] === "all") &&

                            <GaugeChartComponent

                                value={fieldData[field]}

                            />
                        }



                        {
                            (chartTypes[field] === "line" ||
                            chartTypes[field] === "all") &&

                            <LineChartComponent


                                data={{
                                    series1:
                                    historicalData[field]?.map(
                                        entry=>entry.value
                                    ) || []
                                }}


                                timeLabels={

                                    historicalData[field]?.map(entry=>{

                                        const date =
                                        new Date(entry.timestamp);

                                        return date.toLocaleTimeString(
                                            [],
                                            {
                                                hour:'2-digit',
                                                minute:'2-digit'
                                            }
                                        );

                                    }) || []

                                }


                            />

                        }


                    </div>

                ))
            }

        </div>

    );

};

export default ChannelDashboard;