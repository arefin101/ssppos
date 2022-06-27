import React, {useEffect,useState} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { Spinner } from 'reactstrap';
import { getSaleList } from '../../store/actions';
import { Grid, _ } from 'gridjs-react';

// import "jquery/dist/jquery.min.js";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-buttons/js/dataTables.buttons.js";
// import "datatables.net-buttons/js/buttons.colVis.js";
// import "datatables.net-buttons/js/buttons.flash.js";
// import "datatables.net-buttons/js/buttons.html5.js";
// import "datatables.net-buttons/js/buttons.print.js";
// import $ from "jquery";




const SaleTableData = (props) => {
    const [preLoader, setPreLoader] = useState(true);
    let data =[];
    let serial = 0;
    
    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.Sale.response,
    }));

    if(response.sale_transactions){
        data = response.sale_transactions;

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            date: elmt.date,
            invoice_no: elmt.invoice_no,
            customer: elmt.customer,
            total_items: elmt.total_items,
            payment_status: elmt.payment_status,
            amount: elmt.amount,
            finalized_by: elmt.finalized_by,
        }));

        if(preLoader){
            setPreLoader(false);
        }
    }
    
    useEffect(() => {
        dispatch( getSaleList(props.history) );
    }, []);

    // useEffect(() => {
    //     $('#data_table').DataTable({
    //         destroy: true,
    //         responsive: true,
    //         dom:  "<'row'<'col-sm-5'l><'col-sm-7 d-flex justify-content-end'fB>>" +
    //         "<'row'<'col-sm-12'tr>>" +
    //         "<'row'<'col-sm-5'i><'col-sm-7 d-flex justify-content-end'p>>",
    //         buttons: [
    //             { extend: 'csv', className: 'btn btn-info btn-sm' },
    //             { extend: 'print', className: 'btn btn-primary btn-sm' },
    //         ],
    //         aLengthMenu: [
    //             [25, 50, 100, 200, -1],
    //             [25, 50, 100, 200, "All"]
    //         ],
    //     });
    // }, [response]);



    return (
        <React.Fragment>
            {
                preLoader ?
                <div className="spinner-box">
                    <Spinner color="primary"> Loading... </Spinner> 
                </div>
                :
                // <table id="data_table" className="display">
                //     <thead>
                //         <tr>
                //             <th>#</th>
                //             <th>Date</th>
                //             <th>Invoice no</th>
                //             <th>Customer</th>
                //             <th>Total items</th>
                //             <th>Payment status</th>
                //             <th>Amount</th>
                //             <th>Finalized by</th>
                //         </tr>
                //     </thead>
                //     <tbody>
                //         {
                //             data.map((item) => {
                //                 return (
                //                     <tr key={item.id}>
                //                         <td>{++serial}</td>
                //                         <td>{item.date}</td>
                //                         <td>{item.invoice_no}</td>
                //                         <td>{item.customer}</td>
                //                         <td>{item.total_items}</td>
                //                         <td>{item.payment_status}</td>
                //                         <td>{item.amount}</td>
                //                         <td>{item.finalized_by}</td>
                //                     </tr>
                //                 )
                //             })
                //         }
                //     </tbody>
                // </table>

                <Grid
                    data={data}
                    columns={[
                        {
                            id: "sl",
                            name: '#',
                            formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                        },
                        {
                            id:'id',
                            name: 'ID',
                            hidden:true
                        },
                        
                        {
                            id:"date",
                            name: "Date"
                        },
                        {
                            id:"invoice_no",
                            name:"Invoice No"
                        },
                        {
                            id:"customer",
                            name:"Customer"
                        },
                        {
                            id:"total_items",
                            name:"Total items"
                        },
                        {
                            id:"payment_status",
                            name:"Payment status"
                        },
                        {
                            id:"amount",
                            name:"Amount"
                        },
                        {
                            id:"finalized_by",
                            name:"Finalized by"
                        },
                    ]}
                    search={true}
                    sort={true}
                    pagination={{ enabled: true, limit: 15, }}
                />
            }
        </React.Fragment>
    );
};

export {SaleTableData};
