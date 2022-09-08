import React, {useRef} from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import PreviewCardHeaderMain from './../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { withdrawPool } from '../../../store/actions';
import { useHistory } from 'react-router-dom';

const PoolWithdraw = () => {

    const ref = useRef();

    const dispatch = useDispatch();

    const history = useHistory();

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    const validation = useFormik({
        
        enableReinitialize: true,

        initialValues: {
            amount: "",
            note: "",
        },

        validationSchema: Yup.object({
            amount: Yup.string().required("Please Enter Amount"),
        }),

        onSubmit: (values) => {

            document.getElementById("submit").disabled = true;
            ref.current.continuousStart();
            dispatch(withdrawPool(history, values));

        }

    })

    const {error} = useSelector( state => ({
        error: state.Pool.error?state.Pool.error:{}
    }));

    useEffect(()=>{

        if(error){
            if(error.amount){
                error.amount = "";
            }
        }

    },[]);

    useEffect(()=>{

        if(error){
            if(error.amount){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("Witdraw Money Failed !");
            }
        }

    },[error]);

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }



    return (
        <React.Fragment>
            <div className='page-content'>
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Withdraw Pool</title>
                </MetaTags>
                <Container fluid>
                    <Card>
                        <PreviewCardHeaderMain title="Withdraw Pool"/>
                        <CardBody>
                            <div className='live-preview'>
                                <Form onSubmit={(e) => validate(e)}>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor='amount'>
                                                    Amount
                                                    <span className='text-danger' style={{fontSize:'10px', verticalAlign: 'top'}}>
                                                        <i className='mdi mdi-asterisk'></i>
                                                    </span>
                                                </Label>
                                                <Input 
                                                    id="amount"
                                                    placeholder='Enter the amount'
                                                    type='number'
                                                    className='form-control'
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.amount || ""}
                                                    invalid={
                                                        ((validation.touched.amount
                                                        && validation.errors.amount)
                                                        || (error?error.amount?error.amount:false:false))
                                                        ? true 
                                                        : false
                                                    }
                                                />
                                                {( (validation.touched.amount
                                                && validation.errors.amount)
                                                || (error?error.amount?error.amount:false:false))
                                                ? 
                                                <FormFeedback type="invalid">
                                                    {error.amount ? error.amount : validation.errors.amount}
                                                </FormFeedback>
                                                : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor='note'>
                                                    Note
                                                </Label>
                                                <Input 
                                                    id="note"
                                                    placeholder='Enter the note'
                                                    type='text'
                                                    className='form-control'
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.note || ""}
                                                    invalid={
                                                        ((validation.touched.note
                                                        && validation.errors.note)
                                                        || (error?error.note?error.note:false:false))
                                                        ? true 
                                                        : false
                                                    }
                                                />
                                                {( (validation.touched.note
                                                && validation.errors.note)
                                                || (error?error.note?error.note:false:false))
                                                ? 
                                                <FormFeedback type="invalid">
                                                    {error.note ? error.note : validation.errors.note}
                                                </FormFeedback>
                                                : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>
    )

}

export default PoolWithdraw