import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
let max = 432;
let min = 200;

const Invoices = (props) => {
 
  const params = useParams();
  const str=params.invoiceId
  useEffect(() => {
    document.title = 'Factura-'+str
  });

  let rand = Math.floor(Math.random() * (max - min + 1) + min);
  return (
    <div data-cy='issue8body'>
      <h4 data-cy='invoiceNumberHeader'>Factura_{params.invoiceId}</h4>
      <p data-cy='issue9paragraph'>Datos de la factura</p>
      <table>
        <thead>
          <tr>

            <th>Número</th>
            <th>Unidades</th>
            <th>Precio por unidad</th>
            <th>Precio total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{params.invoiceId}</td>
            <td>{(params.invoiceId) % 5 + 1}</td>
            <td>{rand}€</td>
            <td>{rand * ((params.invoiceId) % 5 + 1)}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Invoices;

