import React, { useState, useRef, useContext } from 'react'
import {Alert, Button, Form, Modal, Row, Col} from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext';


export const AddAuction = ({setAuction}) => {
    const [showForm, setShowForm]= useState(false);
    const [error, setError]= useState("");

    const itemTitleRef = useRef()
    const itemDescriptioneRef = useRef()
    const startPriceRef = useRef()
    const itemDurationRef = useRef()
    const itemImageRef = useRef()


    const {currentUser} = useContext(AuthContext)

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const imageTypes = ["image/png", "image/jpeg", "image/jpg"]
    
    
    const submitForm = async (e) => {
     e.preventDefault();
     setError("");

     if (!imageTypes.includes(itemImageRef.current.files[0].type)) {
         return setError("Please use valid Image")
     }
       
     let currentDate = new Date();
     let dueDate = currentDate.setHours(
         currentDate.getHours() + itemDurationRef.current.value
     )


      let newAuction = {
          email : currentUser.email,
          title: itemTitleRef.current.value,
          description: itemDescriptioneRef.current.value,
          currentPrice : startPriceRef.current.value,
          duration : dueDate,
          itemImage: itemImageRef.current.files[0],

         }

         setAuction(newAuction);
         closeForm();
     }

    return (
        <>
        <div className = "col d-flex justify-content-center my-3">
            <div onClick={openForm} className = "btn btn-outline-secondary mx-2">
                Add Auction
            </div>
        </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                <Modal.Header>
                    <Modal.Title>Create Auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                   <Row>
                       <Col>
                        <Form.Group>
                            <Form.Label>Item Title</Form.Label>
                            <Form.Control type="text" required ref={itemTitleRef}/>
                        </Form.Group>
                       </Col>
                       <Col>
                        <Form.Group>
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control type="text" required ref={itemDescriptioneRef}/>
                        </Form.Group>
                       </Col>
                    </Row>
                    <Row>
                       <Col>
                        <Form.Group>
                            <Form.Label>Start Price</Form.Label>
                            <Form.Control type="number" required ref={startPriceRef}/>
                        </Form.Group>
                       </Col>
                       <Col>
                        <Form.Group>
                            <Form.Label>Item Duration in hours</Form.Label>
                            <Form.Control type="number" required ref={itemDurationRef}/>
                        </Form.Group>
                       </Col>
                    </Row>
                    <Row>
                       <Col>
                        <Form.Group>
                            <Form.Label>Seller</Form.Label>
                            <Form.Control type="text" value = {currentUser.email} readOnly/>
                        </Form.Group>
                       </Col>
                       <Col>
                        <Form.Group>
                            <Form.Label>Item Image</Form.Label>
                            <Form.File label = "select item image" custom required ref={itemImageRef}/>
                        </Form.Group>
                       </Col>
                   </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'onClick={closeForm}>Cancel</Button>
                    <Button variant='primary' type="submit">Submit</Button>
                </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
