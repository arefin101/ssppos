import React from 'react'
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PdfCsvButtons = ({ tableData, tableHeaders, pageTitle, filteredData }) => {

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = pageTitle;
        const headers = tableHeaders;
        const data = tableData;
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

  return (
    <>
        <div className="d-flex gap-2">
            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                PDF
            </button>
            <CSVLink data={filteredData.map(data => data.original)}>
                <button type="button" className="btn btn-success">
                    <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                    CSV
                </button>
            </CSVLink>
        </div>
    </>
  )
}

export default PdfCsvButtons