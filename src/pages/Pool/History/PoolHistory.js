import React, { useEffect, useState, useMemo, useRef } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Modal, ModalBody, ModalHeader, } from "reactstrap";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPoolHistory, deletePoolHistory } from "../../../store/actions";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableContainer from "./TableContainer";
import { toast, ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'


const PoolHistory = () => {

    const ref = useRef(null);

	const [poolHistoryList, setPoolHistoryList] = useState([]);

	const [filteredData, setFilteredData] = useState([]);

	const [preLoader, setPreLoader] = useState(true);

	const history = useHistory();

	const dispatch = useDispatch();

	const { response } = useSelector((state) => ({
		response: state.Pool.poolHistory,
	}));

	useEffect(() => {
		dispatch(getPoolHistory(history));
	}, [dispatch]);

	useEffect(() => {
		if (response.pools) {
			setPoolHistoryList(response.pools);
		}
	}, [response.pools]);

	if (response.pools) {
		if (preLoader) {
			setPreLoader(false);
		}
	}

    useEffect(() => {

        if(localStorage.getItem('poolAdd')){
            successnotify('Amount Added Successfully !');
            localStorage.removeItem('poolAdd');
            ref.current.complete();
        }
        if(localStorage.getItem('poolWithdraw')){
            successnotify('Amount Withdrawn Successfully !');
            localStorage.removeItem('poolWithdraw');
            ref.current.complete();
        }
        
    }, []);

	const columns = useMemo(
		() => [
			{
				accessor: "date",
				Header: "Date",
			},
			{
				accessor: "type",
				Header: "Type",
			},
			{
				accessor: "note",
				Header: "Note",
				Cell: (cellProps) => (
					<span>{cellProps.cell.row.original.note ? cellProps.cell.row.original.note : 'N/A'}</span>
				),
			},
			{
				accessor: "amount",
				Header: "Amount ($)",
			},
			{
				accessor: "balance",
				Header: "Balance ($)",
				Cell: (cellProps) => (
					<span>{(cellProps.cell.row.original.balance).toFixed(2)}</span>
				),
			},
			{
				accessor: "finalized_by",
				Header: "Finalized By",
				Cell: (cellProps) => (
					<span>{cellProps.cell.row.original.finalized_by ? cellProps.cell.row.original.finalized_by : "-"}</span>
				),
			},
            {
                Header: "Action",
                Cell: (cellProps) => {
					return (
						(cellProps.cell.row.original.type === "Opening Balance" || cellProps.cell.row.original.type === "Closing Balance") ?
						<></> :
						<UncontrolledDropdown >
							<DropdownToggle href="#" className="btn-soft-secondary btn-sm dropdown" tag="button">
								<i className="ri-more-fill align-middle"></i>
							</DropdownToggle>

							<DropdownMenu className="dropdown-menu-end">
								<DropdownItem onClick={() => updatePool(cellProps.cell.row.original.id)}><i className='mdi mdi-checkbox-marked-circle-outline text-success fs-14 vertical-middle me-1'></i> Edit</DropdownItem>
								<DropdownItem onClick={() => deleteHistory(cellProps.cell.row.original.id)}><i className='mdi mdi-delete-outline text-danger fs-16 vertical-middle me-1'></i> Delete</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					);
                },
            },
		],
		[]
	);

	const searchItems = (searchValue) => {
		if (searchValue !== "") {
		const filteredData = response.pools.filter((item) => {
			return Object.values(item)
				.join("")
				.toLowerCase()
				.includes(searchValue.toLowerCase());
		});

		setPoolHistoryList(filteredData);

		} else {
		if (response.pools) {
			setPoolHistoryList(response.pools);
		}
		}
	};

	const reset = () => {
		document.getElementById("search").value = "";
		searchItems("");
	};

	const tableHeaders = [
		"Date",
		"Type",
		"Note",
		"Amount",
		"Balance",
		"Finalized By",
	];

	const exportPDF = () => {
		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "portrait"; // portrait or landscape

		const marginLeft = 40;
		const doc = new jsPDF(orientation, unit, size);

		doc.setFontSize(15);

		const title = "Pool History";
		const headers = [tableHeaders];
		const data = filteredData.map((data) => [
			data.original.date,
			data.original.type,
			data.original.note,
			data.original.amount,
			data.original.balance,
			data.original.finalized_by,
		]);

		let content = {
			startY: 50,
			head: headers,
			body: data,
		};

		doc.text(title, marginLeft, 40);
		doc.autoTable(content);
		doc.save("Pool_History.pdf");
	};



	const updatePool = (id) => {
		history.push(`/pool-update-history/${id}`);
	}
    // Delete Modal

    const [modal, setModal] = useState(false);
    const [poolId, setPoolId] = useState(false);
    
    function tog_center() {
        setModal(!modal);
    }

	const deleteHistory = (id) => {
		setPoolId(id);
        tog_center();
	}

    const confirmDelete = () => {
		dispatch(deletePoolHistory(poolId, history));
        tog_center();
    }

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

	useEffect(() => {
		if(localStorage.getItem('delete')){
			successnotify('Pool Deleted Successfully');
			dispatch(getPoolHistory(history));
			localStorage.removeItem('delete');
		}
	}, [localStorage.getItem('delete')]);

	useEffect(() => {
		if(localStorage.getItem('poolUpdate')){
			successnotify('Pool Edited Successfully');
			localStorage.removeItem('poolUpdate');
		}
	}, [localStorage.getItem('poolUpdate')]);




	return (
		<div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />

			<MetaTags>
				<title>Pool History</title>
			</MetaTags>
			<Container fluid>
				<Row>
					<Col lg={12}>
						<Card id="sprList">
							<CardHeader className="card-header  border-0">
								<div className="d-flex align-items-center">
									<h5 className="card-title mb-0 flex-grow-1">Pool History</h5>
									<div className="d-flex gap-2">
										<button
											type="button"
											className="btn btn-info"
											onClick={() => exportPDF()}
										>
											<i className="ri-printer-line align-bottom me-1"></i> PDF
										</button>

										<CSVLink
											headers={tableHeaders}
											data={filteredData.map((data) => [
												data.original.date,
												data.original.type,
												data.original.note,
												data.original.amount,
												data.original.balance,
												data.original.finalized_by,
											])}
											filename="Pool_History.csv"
										>
											<button type="button" className="btn btn-primary">
												<i className="ri-file-download-line align-bottom me-1"></i>{" "}
												CSV
											</button>
										</CSVLink>
									</div>
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
											placeholder="Search for date, type, amount or something..."
											onChange={(e) => searchItems(e.target.value)}
											/>
											<i className="ri-search-line search-icon"></i>
										</div>
										</Col>

										<Col sm={4} xxl={3} />

										<Col sm={4} xxl={3} />

										<Col sm={4} xxl={1}>
											<div>
												<Button
													color="soft-danger"
													className="w-100"
													onClick={reset}
												>
													{" "}
													<i className="mdi mdi-refresh me-1 align-bottom"></i>
												Reset
												</Button>
											</div>
										</Col>
									</Row>
								</Form>
							</CardBody>
							<CardBody className="pt-0">
								{preLoader ? (
									<div className="spinner-box">
										<Spinner color="primary"> Loading... </Spinner>
									</div>
									) : (
									<div>
										<TableContainer
										columns={columns}
										data={poolHistoryList}
										customPageSize={10}
										maxLength={response.pools ? response.pools.length : 10}
										filteredLength={poolHistoryList.length}
										isExtraFeature={true}
										isGlobalSearch={true}
										setFilteredData={setFilteredData}
										divClass="table-responsive"
										className="custom-header-css"
										/>
									</div>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<ToastContainer/>



            {/* delete confirmation modal */}                                  
            <Modal
                isOpen={modal}
                toggle={() => {
                    tog_center();
                }}
                centered
            >
                <ModalHeader className="modal-title" />

                <ModalBody className="text-center p-4">
                        <h5 className="mb-3">Are you sure you want to Delete <br /> this Pool ?</h5>
                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button to="#" className="btn btn-primary me-2" color="primary" onClick={() => confirmDelete()}>Yes</Button>
                        <Button color="danger" onClick={() => setModal(false)}>No</Button>
                    </div>
                </ModalBody>
            </Modal>
            {/* --end-- delete confirmation modal */}
		</div>
	);
};

export default PoolHistory;
