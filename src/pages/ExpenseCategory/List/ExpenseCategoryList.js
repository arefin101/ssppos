import React, {useEffect, useState, useMemo, useRef} from 'react';
import MetaTags from "react-meta-tags";
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getExpenseCategory, hasPermission } from '../../../store/actions';
import { Card, CardBody, CardHeader, Col, Container, Row, Spinner, Form, Button } from 'reactstrap';
import { ToastContainer  , toast} from 'react-toastify';
import { CSVLink } from "react-csv";
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingBar from 'react-top-loading-bar'



const ExpenseCategoryList = (props) => {

    const [preLoader, setPreLoader] = useState(true);
    const [expenseCatagory, setExpenseCatagory] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const ref = useRef(null);

    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.ExpenseCategory.expense_categories,
    }));
    
    useEffect(() => {
        dispatch( getExpenseCategory(props.history) );
    }, []);

    useEffect(() => {
        if(response.expense_categories){
            setExpenseCatagory(response.expense_categories);
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [response]);


    const expenseCategory = localStorage.getItem('expenseCategory');
    const [expenseCategoryCreatePermissionBtn , setExpenseCategoryCreatePermissionBtn] = useState(false);

    const { expenseCategoryCreatePermission } =useSelector( state => ({
        expenseCategoryCreatePermission: state.General.expenseCategoryCreatePermission,
    }));

    useEffect(()=>{
        if(expenseCategoryCreatePermission){
            setExpenseCategoryCreatePermissionBtn(expenseCategoryCreatePermission)
        }
    },[expenseCategoryCreatePermission]);
    
    useEffect(()=>{
        dispatch(hasPermission("expense-category.store" , props.history))
    },[])



    // Table Properties
    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1;
                }
            },
            {
                Header: "Name",
                accessor: "name",
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.expense_categories.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setExpenseCatagory(filteredData)
        }else {
            if(response.expense_categories){
                setExpenseCatagory(response.expense_categories);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Expense Catagory";
        const headers = [["#", "Name"]];
        const data = filteredData.map(data => [data.index+1, data.original.name])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("expense_categories.pdf")
    }




    // TOASTER
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(expenseCategory) {
            successnotify("Expense Category Added Successfully !");
            localStorage.removeItem('expenseCategory');
            ref.current.complete();
        }
    }, []);
    
    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Expense Category List</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Expense Categories</h4>

                                    { expenseCategoryCreatePermissionBtn == true &&
                                    <Link to='/expense-categories/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Category</button>
                                    </Link>} 
                                    
                                    <div className="d-flex gap-2 ms-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            headers={["#", "Name"]} 
                                            data={filteredData.map(data => [data.index+1, data.original.name])}
                                            filename="expense_categories.csv"
                                        >
                                            <button type="button" className="btn btn-primary">
                                                <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                                CSV
                                            </button>
                                        </CSVLink>
                                    </div>
                                </CardHeader>
                                
                                <CardBody className="bg-soft-light border border-dashed border-start-0 border-end-0">
                                    <Form>
                                        <Row className="g-3">
                                            <Col sm={12} xxl={5}>
                                                <div className="search-box">
                                                    <input
                                                        type="text"
                                                        id="search"
                                                        className="form-control search bg-light border-light"
                                                        placeholder="Search for name or something..."
                                                        onChange={(e) => searchItems(e.target.value)}
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={1}>
                                                <div>
                                                    <Button color="soft-danger" className="w-100" onClick={reset}>{" "}
                                                    <i className="mdi mdi-refresh me-1 align-bottom"></i>Reset</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>

                                <CardBody>
                                    {
                                        preLoader ?
                                        <div className="spinner-box">
                                            <Spinner color="primary"> Loading... </Spinner> 
                                        </div> :
                                        <div>
                                            <TableContainer
                                                columns={columns}
                                                data={expenseCatagory}
                                                customPageSize={10}
                                                maxLength={response.expense_categories ? response.expense_categories.length:10}
                                                filteredLength={expenseCatagory.length} 
                                                isExtraFeature={true}
                                                isGlobalSearch={true}
                                                setFilteredData={setFilteredData}
                                                divClass="table-responsive"
                                                className="custom-header-css"
                                            />
                                        </div>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ExpenseCategoryList;