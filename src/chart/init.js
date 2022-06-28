import $ from 'jquery'
import { Utils } from 'js/Utils';
export const RadialChart = {
    svg: null,
    tooltip: null,
    initChart: false,
    initTooltip: false,
    Chart(d3, ChartID, height, width, backgroundColor) {
        $(`#${ChartID}`).html('')
        this.svg = d3.select(`#${ChartID}`)
            .append('svg')
            .style('background', backgroundColor)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        this.initChart = true
    },
    Tooltip(d3, ChartID) {
        this.initTooltip = true
        this.tooltip = d3.select(`#${ChartID}-tooltip`).attr('class', 'radial-tooltip');
    },
    init(d3, ChartID, Data, options, autoColor = false) {

        const { numTicks, chartRadius, arcMinRadius, arcPadding, height, width, ticksColor, backgroundColor, } = options,
        color = d3.scaleOrdinal(d3.schemeCategory10),
            Colors = Utils.Colors([options.gradientColor1, options.gradientColor2], Data.length),
            PI = Math.PI
        this.Chart(d3, ChartID, height, width, backgroundColor)
        this.Tooltip(d3, ChartID)

        let svg = this.svg
        let tooltip = this.tooltip
        let scale = d3.scaleLinear()
            .domain([0, d3.max(Data, d => d.value) * 1.1])
            .range([0, 2 * PI]);
        let keys = Data.map((d, i) => d.name);
        let ticks = scale.ticks(numTicks).slice(0, -1);

        const numArcs = keys.length;
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;
        const fontSize = options.fontSize
        let arc = d3.arc()
            .innerRadius((d, i) => getInnerRadius(i))
            .outerRadius((d, i) => getOuterRadius(i))
            .startAngle(0)
            .endAngle((d, i) => scale(d))



        let axialAxis = svg.append('g')
            .attr('class', 'a axis')
            .selectAll('g')
            .data(ticks)
            .enter().append('g').attr('class', 'numbers')

        .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

        axialAxis.append('line')
            .attr('x2', chartRadius);

        axialAxis.append('text')
            .attr('class', 'tick')
            .attr('x', chartRadius + 10)
            .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
            .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
            .attr('fill', options.TicksColor)
            .text(d => d);

        //data arcs
        let arcs = svg.append('g')
            .attr('class', 'data')
            .selectAll('path')
            .data(Data)
            .enter().append('path')
            .attr('class', 'arc')
            .style('fill', (d, i) => autoColor ? color(i) : Colors[i])
            .attr('position', (d, i) => i)

        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

        arcs.on('mousemove', showTooltip)
        arcs.on('mouseout', hideTooltip)

        let radialAxis = svg.append('g')
            .attr('class', 'r axis innerLabels')
            .selectAll('g')
            .data(Data)
            .enter().append('g');
        radialAxis.append('circle')
            .attr('r', (d, i) => getOuterRadius(i) + arcPadding).attr('class', 'circle');

        radialAxis.append('text')
            .attr('x', options.labelAxisX)
            .attr('y', (d, i) => -getOuterRadius(i) + arcWidth)
            .attr('yOriginal', (d, i) => -getOuterRadius(i) + arcWidth)
            .attr('font-size', fontSize)
            .attr('fill', options.innerLabelsColor)
            .text(d => d.name);

        function arcTween(d, i) {
            let interpolate = d3.interpolate(0, d.value);
            return t => arc(interpolate(t), i);
        }

        function showTooltip(d) {
            tooltip.style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 25) + 'px')
                .style('display', 'inline-block')
                .html(d.name + ' : ' + d.value);
        }

        function hideTooltip() {
            tooltip.style('display', 'none');
        }

        function rad2deg(angle) {
            return angle * 180 / PI;
        }

        function getInnerRadius(index) {
            return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
        }

        function getOuterRadius(index) {
            return getInnerRadius(index) + arcWidth;
        }
    }
}