import React,{Fragment, useState} from "react";
import DatePicker from "react-date-picker";
import './styles.css';
import jsPDF from 'jspdf';
import axios from "axios";

const Formulario = () =>{

    const valDias = [
        299.00,
        415.00,
        531.00,
        647.00,
        763.00,
        879.00,
        999.00,
        1117.00,
        1235.00,
        1353.00,
        1471.00,
        1589.00,
        1707.00,
        1998.00,
        2118.00];

    const [valSal, fSalida] = useState(new Date());
    const [valRet, fRet] = useState(new Date());

    const [datos, setDatos] = useState({
        oriUsr:'Mexico',
        destUsr:'',
        fecSalida:'',
        fecRetorno:''
    });

    const [pAdultos, setpAdultos] = useState(0);
    const [pMenores, setpMenores] = useState(0);
    const [pMayores, setpMayores] = useState(0);
        
    var dias = Math.round((valRet.getTime() - valSal.getTime())/(1000*60*60*24));

    var cMenores=0;
    var costoDias = valDias[dias-1];

    if(pAdultos===0 && pMayores===0){
        cMenores=pMenores*costoDias;
    }else{
        if(pMenores>2){
            cMenores=(pMenores-2)*costoDias;
        }
    }

    var cAdultos=pAdultos*costoDias;
    var cMayores=(pMayores*costoDias)*1.5;
    var total=cAdultos+cMenores+cMayores;
    
//console.log("Adultos: ",pAdultos," Mayores: ",pMayores," Menores: ",pMenores);
//console.log("Costo Adultos: ",cAdultos," Costo Mayores: ",cMayores," Costo Menores: ",cMenores," Total: ",total);
//console.log("dias: ",dias," Costo por días: ",costoDias);

    const handleInputChange =(e)=>{
        console.log(e.target.value)
        setDatos({
            ...datos,
            [e.target.name]:e.target.value
        })
    }

    const baseURL = "http://localhost:3000/Pdfconverter";
    const [post,setPost]=useState(null);

    const Myfunc=()=>{

       // console.log("Funcion: ",x);
       var doc = new jsPDF("p","pt","a4");
        doc.html(document.querySelector("#cotizador"),{
            callback:function(pdf){
                pdf.save("testPDF.pdf")
            }
        });
    };
        
    return(
        <Fragment>
            <header className="card">
            <h1>Cotizador Seguro</h1>
            </header>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-12">
                        <label>Origen: </label>
                        <select className="custom-select" name="oriUsr" value="Mexico" onChange={(e)=>{
                            const selOri = e.target.value;
                            setDatos(selOri);
                        }}>
                            <option>México</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Destino: </label>
                        <select name="destUsr" onChange={handleInputChange}>
                            <option value="America del Norte" >América del Norte</option>
                            <option value="Centromerica" >Centroamérica</option>
                            <option value="Sudamerica" >Sudamérica</option>
                            <option value="Europa" >Europa</option>
                            <option value="Asia" >Asia</option>
                            <option value="Africa" >África</option>
                            <option value="Oceania" >Oceanía</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Fecha Salida: </label>
                        <DatePicker
                            value={valSal}
                            name="fSalida"
                            onChange={fSalida}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Fecha Regreso: </label>
                        <DatePicker
                            value={valRet}
                            name="fRegreso"
                            onChange={fRet}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Adultos: </label>
                        <input name="adultos" onChange={(e)=>{
                            const ad1 = e.target.value;
                            setpAdultos(ad1);
                        }}/>
                            
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Menores: </label>
                        <input name="menores" onChange={(e)=>{
                            const ad2 = e.target.value;
                            setpMenores(ad2);
                        }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Adultos Mayores: </label>
                        <input name="mayores" onChange={(e)=>{
                            const ad3 = e.target.value;
                            setpMayores(ad3);
                        }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Costo del Seguro:</label>
                        <h4 value={total}>{total}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <button onClick={Myfunc}>COTIZAR</button>
                    </div>
                </div>
            </div>
            <div>
                <div id="cotizador">
                <html>
                    <body>
                        <table class="body">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="invoice">
                                            <tbody>
                                                <tr>
                                                    <td class="invoice__section">
                                                        <table>
                                                            <tbody>
                                                            <tr class="store-info">
			                                                    <td class="store-info__primary">
                                                                    <p class="paragraph">
			                                                            <span class="paragraph__header">COTIZADOR SEGURO DE VIAJERO</span>
			                                                            <span class="paragraph__line">ORIGEN: {datos.oriUsr}</span>
                                                                        <span class="paragraph__line">DESTINO: {datos.destUsr}</span>
                                                                    </p>
			                                                    
			                                                    </td>
								                                <td class="store-info__secondary">
									                                <p class="paragraph">
										                                <span class="paragraph__line">FECHA SALIDA: {valSal.getDate()}/{valSal.getMonth()}/{valSal.getFullYear()}</span>
										                                <span class="paragraph__line">FECHA RETORNO: {valRet.getDate()}/{valRet.getMonth()}/{valRet.getFullYear()}</span>
										                                <span class="paragraph__line">COSTO DEL SEGURO: {total}</span>
						                                            </p>
								                                </td>
							                                </tr>
							                                </tbody>
						                                </table>
					                                </td>
				                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                </html>
                    
                </div>
            </div>
            
        </Fragment>
    );
}

export default Formulario;