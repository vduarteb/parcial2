import React, { useState, useEffect } from 'react';
import {FormattedMessage} from 'react-intl'
import { Container, Row, Col, Table, Badge } from 'react-bootstrap';
import Visualizacion from './visualizacion.js';

const Elemento = () => {
    const [elemento, setElemento] = useState("");

    function getLanguage() {
        return navigator.language || navigator.userLanguage;
      }

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("elemento") === null) {
                console.log("No se pueden traer los elementos porque no tiene conexión")

            } else {
                setElemento(JSON.parse(localStorage.getItem('elemento')));
            }
        } else {

            let URL = ""

            if(getLanguage()==="en"){
                URL = "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json"
            }else{
                URL = "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json"
            }

            fetch(URL)
            .then(res => res.json())
            .then(res => {
                setElemento(res);
                localStorage.setItem("elemento", JSON.stringify(res));
            });
        }
    }, []);

    return (
        <div className="elemento">
        <Container>
        <h1><FormattedMessage id="tableTitle"/></h1>
        <Row>
          <Col>
            <Table hover>
              <thead className="thead-dark">
                <tr>
                  <th><FormattedMessage id="id" /></th>
                  <th><FormattedMessage id="image" /></th>
                  <th><FormattedMessage id="name" /></th>
                  <th><FormattedMessage id="description" /></th>
                  <th><FormattedMessage id="height" /></th>
                  <th><FormattedMessage id="weight" /></th>
                  <th><FormattedMessage id="type" /></th>
                </tr>
              </thead>
              <tbody>
                {elemento && elemento.map(e => (
                  <tr>
                    <td>{e.id}</td>
                    <td><img src={e.ThumbnailImage} alt={e.name}/></td>
                    <td>{e.name}</td>
                    <td>{e.description}</td>
                    <td>{e.height}</td>
                    <td>{e.weight}</td>
                    <td>{e.type && e.type.map(t => (
                      <Badge variant="secondary">{t}</Badge>
                      ))}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <h1><FormattedMessage id="graphTitle"/></h1>
        <Row>
        {elemento &&
            <Visualizacion datos={elemento} />
          }
        </Row>
      </Container>
        </div>
    );
}

export default Elemento;
