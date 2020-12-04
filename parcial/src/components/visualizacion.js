import React, { Component, useEffect } from 'react';
import * as d3 from 'd3';

function Visualizacion(elemento) {

    useEffect(() => {
        crearVisualizacion(elemento.datos);
    }, []);

    function crearVisualizacion(elemento) {
        const canvas = d3.select("#canva");

        let maxValue = Number.NEGATIVE_INFINITY

        elemento.forEach(elemento => {
        if (elemento.height >= maxValue) {
            maxValue = elemento.height
        }
        });

        const width = 700;
        const height = 500;
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear()
            .domain([0, maxValue +100])
            .range([iheight, 0]);

        const x = d3.scaleBand()
            .domain(elemento.map(d => d.name))
            .range([0, iwidth])
            .padding(0.1);

        const bars = g.selectAll("rect").data(elemento);

        bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", e => x(e.name))
            .attr("y", e => y(e.height))
            .attr("height", d => iheight - y(d.height))
            .attr("width", x.bandwidth())

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
    }

    return (
        <div id="canva"></div>
    );

}

export default Visualizacion;