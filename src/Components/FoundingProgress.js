import React from "react";
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

export default function FoundingProgress(){
    return (
        <MDBContainer className="pb-5 pt-5">
            <h2 className="mt-5 mb-5 text-center">Gründungsprozess</h2>
            <MDBTable>
            <MDBTableHead>
            <tr>
                <th scope='col'>Gründungsschritt</th>
                <th scope='col'>Status</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody>
            <tr>
                <th scope='row'>Firmennamen anfragen</th>
                <td className="table-success">abgeschlossen</td>
            </tr>
            <tr>
                <th scope='row'>Stammkapital überweisen</th>
                <td className="table-success">abgeschlossen</td>
            </tr>
            <tr>
                <th scope='row'>Führungszeugnis überprüfen</th>
                <td className="table-warning">in Bearbeitung</td>
            </tr>
            <tr>
                <th scope='row'>IHK Mitgliedschaft</th>
                <td className="table-danger">ausstehend</td>
            </tr>
            </MDBTableBody>
            </MDBTable>
        </MDBContainer>

    );
}