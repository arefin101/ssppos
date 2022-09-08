import React from 'react';
import MetaTags from 'react-meta-tags';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { hasPermission } from '../../store/actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const MoneyTransactionIndex = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const { salePaymentPermission, customerCreditPermission, purchasePaymentPermission, expensePaymentPermission } = useSelector(state => ({
        salePaymentPermission: state.General.salePaymentPermission,
        customerCreditPermission: state.General.customerCreditPermission,
        purchasePaymentPermission: state.General.purchasePaymentPermission,
        expensePaymentPermission: state.General.expensePaymentPermission,
    }));

    const moneyTransactions = [
        {
            key: 0,
            transaction_title: "Sale Payment",
            cash_in_out_label: "Cash In",
            to: "/sale-payment-list",
            permission: salePaymentPermission?salePaymentPermission:false
        },
        {
            key: 1,
            transaction_title: "Collective Sale Payment",
            cash_in_out_label: "Cash In",
            to: "/collective-payment-list",
            permission: salePaymentPermission?salePaymentPermission:false
        },
        {
            key: 2,
            transaction_title: "Add Customer Credit",
            cash_in_out_label: "Cash In",
            to: "/add-customer-credit",
            permission: customerCreditPermission?customerCreditPermission:false
        },
        {
            key: 3,
            transaction_title: "Purchase Payment",
            cash_in_out_label: "Cash Out",
            to: "/purchase-payment-list",
            permission: purchasePaymentPermission?purchasePaymentPermission:false
        },
        {
            key: 4,
            transaction_title: "Expense Payment",
            cash_in_out_label: "Cash Out",
            to: "/expense-payment-list",
            permission: expensePaymentPermission?expensePaymentPermission:false
        },
        {
            key: 5,
            transaction_title: "Withdraw Customer Credit",
            cash_in_out_label: "Cash Out",
            to: "/withdraw-customer-credit",
            permission: customerCreditPermission?customerCreditPermission:false
        },
    ]

    useEffect(()=>{
        dispatch(hasPermission("money-transaction.sale-payment" , history));
        dispatch(hasPermission("money-transaction.customer-credit" , history));
        dispatch(hasPermission("money-transaction.purchase-payment" , history));
        dispatch(hasPermission("money-transaction.expense-payment" , history));
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Money Transactions</title>
                </MetaTags>

                <Container fluid>
                    <BreadCrumb pageHeader="Money Transactions"/>

                    <Row>
                    {
                        moneyTransactions.map(card => card.cash_in_out_label === "Cash In" && card.permission === true && (
                            <Col xxl={3} xl={4} lg={6} sm={12} key={card.key}>
                                <Card className="ribbon-box right overflow-hidden">
                                    <CardBody className="text-center p-4">
                                        <div className="avatar-sm m-auto">
                                            <span className="avatar-title bg-light text-dark rounded-2 fs-3">
                                                <i className="align-middle bx bx-dollar-circle" ></i>
                                            </span>
                                        </div>
                                        <h5 className="mb-1 mt-4">
                                            <Link to="apps-ecommerce-seller-details" className="link-primary text-uppercase">{card.transaction_title}</Link>
                                        </h5>
                                        <span className="badge bg-light text-success mb-0 fs-12 mt-2 mb-3">
                                            {card.cash_in_out_label}<i className="ri-arrow-down-line align-middle ms-1"></i>
                                        </span>
                                        <div className="mt-3">
                                            <Link to={card.to} className="btn btn-soft-primary w-100 pt-0 pb-0">
                                                <i className="las la-long-arrow-alt-right" style={{ fontSize: "30px" }}></i>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    }
                    </Row>
                    
                    <Row>
                    {
                        moneyTransactions.map(card => card.cash_in_out_label === "Cash Out" && card.permission === true && (
                            <Col xxl={3} xl={4} lg={6} sm={12} key={card.key}>
                                <Card className="ribbon-box right overflow-hidden">
                                    <CardBody className="text-center p-4">
                                        <div className="avatar-sm m-auto">
                                            <span className="avatar-title bg-light text-dark rounded-2 fs-3">
                                                <i className="align-middle bx bx-dollar-circle" ></i>
                                            </span>
                                        </div>
                                        <h5 className="mb-1 mt-4">
                                            <Link to="apps-ecommerce-seller-details" className="link-primary text-uppercase">{card.transaction_title}</Link>
                                        </h5>
                                        <span className="badge bg-light text-danger mb-0 fs-12 mt-2 mb-3">
                                            {card.cash_in_out_label}<i className="ri-arrow-up-line align-middle ms-1"></i>
                                        </span>
                                        <div className="mt-3">
                                            <Link to={card.to} className="btn btn-soft-primary w-100 pt-0 pb-0">
                                                <i className="las la-long-arrow-alt-right" style={{ fontSize: "30px" }}></i>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    }
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    )
}

export default MoneyTransactionIndex