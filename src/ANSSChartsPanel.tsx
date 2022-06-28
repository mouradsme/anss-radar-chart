import React, { useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { ChartOptions } from 'types';
import { Utils  } from 'js/Utils';
import * as d3 from "d3";
import $ from 'jquery'
import './css/main.css'
import { RadialChart } from './chart/init'
interface Props extends PanelProps<ChartOptions> {}

export const ANSSChartsPanel: React.FC<Props> = (A) => {
    var   { data, height, width } = A,  
            ChartID       = `Chart-${A.id}`,
	    	    Series 			  = data.series, 		// Get series from Data Panel data object. Data fetched from a Database/Data Source is stored in the Series Object as a constant
	 		      Fields 			  = Series[0].fields,	// Fetch Fields (classes), from the series Object
            Data          = Utils.Populate(Fields, A.options.OrderBy, A.options.OrderDirection === 'desc' ),
            arcMinRadius  = A.options.arcMinRadius,
            arcPadding    = A.options.arcPadding,
            numTicks      = A.options.numTicks,
            ticksColor    = A.options.TicksColor,
            backgroundColor = A.options.BackgroundColor,
            gradientColor1  = A.options.gradientColor1,
            gradientColor2  = A.options.gradientColor2,
            minHeight     = 300;
            useEffect( () => { 
              height      = height <= minHeight ? $(`#${ChartID}`).height() : height;
              const chartRadius   = height / 2 - 40
              RadialChart.init(d3, ChartID, Data, { 
                numTicks, 
                chartRadius, 
                arcMinRadius, 
                arcPadding, 
                ticksColor,
                backgroundColor,
                gradientColor1,
                gradientColor2,
                height, 
                width},  A.options.autoColoring) 
            }, [$(`#${ChartID}`)]) // Reload Chart Data once the "container" is ready

            useEffect(() => {
              $(`#${ChartID} text.tick`).attr('fill', A.options.TicksColor)
              $(`#${ChartID} .innerLabels`).find('text').attr('font-size', A.options.fontSize)
              $(`#${ChartID} .innerLabels`).find('text').each((i, elem) => {
                let yOri = Number($(elem).attr('yOriginal'))
                $(elem).attr('x', A.options.labelAxisX)
                .attr('y', yOri + A.options.labelAxisY)
                .attr('fill', A.options.innerLabelsColor)

              }) 
            }, [A.options])
            
 return (<>
 <div className='tooltip' id={ChartID+'-tooltip'}></div>
    <div className='RadialChartContainer' id={ChartID}></div>
 </>) 

};
