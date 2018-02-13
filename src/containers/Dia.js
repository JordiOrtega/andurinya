import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import Pruebas from './Pruebas';
import Total from './Total';
import Mejillon from '../components/dia/Mejillon';
import * as actionTypes from './../store/actions'
import $ from 'jquery';

class Dia extends Component {

    componentDidMount() {
        // se esconde el último día generado para obtener los resultados sino se hace scroll al footer.
        if (this.props.diasreducer.slice(-1).pop() == "FIN" ){
            $('#dia:last-child').hide()
        } else{
            $('html,body').animate({ scrollTop: $("footer").offset().top }, 'slow');
        } 
    }

    desactivalinks = () => {
        let links = [".btn-floating"];
        links.forEach((link) => { $(link).addClass("no-activo") }); 
    }
    nuevo = (texto) => {
        this.desactivalinks();
        this.props.habemusintentus(true); //sí hay intentos
            if (this.props.index + 1 >= this.props.cuantosdias) {
               
                this.props.nuevo(this.props.cuantosdias);
                if ($("#footer #image").length === 0) {
                    var clonamejillon = $('#image').clone();
                    $(clonamejillon).prependTo('#footer');
                }
            } else {
                Modal.info({
                    title: 'Ya no puedes añadir más intentos.',
                    content: (
                      <div>
                        <p>Sigue evaluando con el siguiente día.</p>
                        <p>O refresca para volver a empezar.</p>
                      </div>
                    ),
                    maskClosable:true,
                    onOk() {},
                  });
            }
    }
    cadaIntento = (i, indice) => {
        return (
            <Pruebas 
                key={i}
                posicion={this.props.cuantosnum.findIndex(x => x.id === i)}
                index={this.props.cuantosnum.id} >
                    {"Concha número: "}{indice + 1}
            </Pruebas>
        );
    }

    render() {
        let arraydeundia = this.props.cuantosnum.filter(deundia => deundia.dia === this.props.index + 1);
        return (
            <div id="dia" className="row">
                <div className="col s1">
                </div>
                <div className="col s10 light-blue lighten-5 z-depth-2">
                    <blockquote>  <p className="flow-text">{this.props.children}  Pulsa el mejillón para añadir intentos:</p> </blockquote>
                    <div className="row">
                        <div className="col s4 m1">
                            <Mejillon clicked={this.nuevo} />
                        </div>
                        <div className="col s8 m11">
                            <Total dia={this.props.index}  />
                        </div>
                    </div>
                    {arraydeundia.map((eachelement, i) => this.cadaIntento(eachelement.id, i))}
                </div>
                <div className="col s1">
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        cuantosnum: state.cuantosNum,
        diasreducer: state.cuantosDias
    };
};

const mapDispatchToProps = dispatch => {
    return {
        nuevo: (dia) => dispatch({ type: actionTypes.NUEVACONCHA, payloadDia: dia })
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dia);