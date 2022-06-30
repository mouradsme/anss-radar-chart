import React, { useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { ChartOptions } from 'types';
import { Utils  } from 'js/Utils';
import $ from 'jquery'
import Chart from 'chart.js/auto';
import './css/main.css'
interface Props extends PanelProps<ChartOptions> {}

export const ANSSChartsPanel: React.FC<Props> = (A) => {
    var   { data } = A,  
            ChartID       = `Chart-${A.id}`,
	    	    Series 			  = data.series, 		// Get series from Data Panel data object. Data fetched from a Database/Data Source is stored in the Series Object as a constant
	 		      Fields 			  = Series[0].fields,	// Fetch Fields (classes), from the series Object
            Data          = Utils.Populate(Fields)
            const Colors  = A.fieldConfig.defaults.thresholds.steps
            let Datasets  = []
            Data.series.forEach((Series, i) => {
              Datasets.push({
                label: Data.titles[i],
                data: Series,
                backgroundColor: ['transparent'],
                borderColor: Colors[i].color,
                borderWidth: 1
              })
            })
            useEffect(() => {
              const chart = new Chart(ChartID, {
                type: 'radar',
                data: {
                    labels: Data.labels,
                    datasets: Datasets

                },
                plugins: [],
                options: {
                  
                  
                },
                
              })
              const CanvasContainer = $(`[data-panelid=${A.id}]`)
              let h = CanvasContainer.height() - 50
              CanvasContainer.find('.RadialChartContainer').css('background-color', A.options.BackgroundColor)
              chart.canvas.parentElement.style.height = `${h}px`;
              chart.canvas.parentElement.style.width = `${h}px`;
              Chart.defaults.color = A.options.LegendTextColor;

            }, [A.options])

 return (<>
 <div className='tooltip' id={ChartID+'-tooltip'}></div>
    <div className='RadialChartContainer'>
      <canvas id={ChartID} ></canvas>
    </div>
 </>) 

};
