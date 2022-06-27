import React, { useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect } from "react";
import { Spinner, Modal, ModalBody } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { getBrands } from "../../store/actions";


const BrandTableData = ({history}) => {
    let data =[]
    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.productBrand.brands,
    }));

    useEffect(() => {
        dispatch(getBrands(history))
    }, []);

    const [preLoader, setPreLoader] = useState(true);
    
    if(response.brands){
        
        data =  response.brands;
        
        let serial = 0;
        
        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            Name: elmt.name,
            Image: elmt.image
        }))
        
        if(preLoader){
            setPreLoader(false);
        }
    }
    
    const [modal_animationZoom, setmodal_animationZoom] = useState(false);
    const [modal_image, setmodal_image] = useState();
    

    function tog_animationZoom(data) {
        setmodal_animationZoom(!modal_animationZoom);
        setmodal_image(data);
    }

    return (
        <React.Fragment>
            <Modal id="flipModal" className='product-modal' isOpen={modal_animationZoom} toggle={() => { tog_animationZoom(); }} modalClassName="zoomIn" centered >
                <ModalBody>
                    <img className='product-image' src={modal_image} alt="" />
                </ModalBody>
            </Modal>

            {
                preLoader ?
                <div className="spinner-box">
                    <Spinner color="primary"> Loading... </Spinner> 
                </div>
                :
                <Grid
                    data={data}
                    image={data.id}

                    columns={[
                        {
                            id: "sl",
                            name: '#',
                            formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                        },
                        {
                            id:"Name",
                            name: "Name"
                        },
                        {
                            id:"Image",
                            name: 'Image',
                            sort: {
                                enabled: false
                            },
                            formatter: (cell) => _(
                                <img onClick={() => tog_animationZoom(cell)} width="50px" src={cell} />
                            )
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


export { BrandTableData };
