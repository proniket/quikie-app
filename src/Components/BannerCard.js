import React, { useState } from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap';
import './BannerCard.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


function BannerCard() {
    const [products, setProducts] = useState([
        {
            name: 'GOOGL',
            url: '/Images/GOOGL.png',
            cprice: '1515 USD',
        },
        {
            name: 'FB',
            url: '/Images/FB.png',
            cprice: '266 USD',
        },
        {
            name: 'AMZN',
            url: '/Images/AMZN.svg',
            cprice: '3116 USD',
        },
    ]);

    

   let allProducts =  products.map((prod, i) => (
       <Draggable
            draggableId={`draggable-${i}`}
            key={`draggable-${i}`}
            index={i}
       >
           { (provided) => (
                <Col 
                    className='pb-5 pb-sm-1 col-md-4'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                <Card className='cardDiv'>
                    <div className='cardUp'>
                        <Card.Title className='productName'>{prod.name}</Card.Title>
                        {/* <img src={prod.url} class="img-fluid" alt={prod.name}/> */}
                        <Card.Img fluid='true' variant="top" src={prod.url} alt={prod.name} className='productImg '/>
                    </div>
                    
                    <div className='cardDown'>
                        <Card.Body>
                            <Card.Text className='productPrice'>
                                {prod.cprice}
                            </Card.Text>
                        </Card.Body>
                    </div>
                </Card>
            </Col>
           )}
            
        </Draggable>
    ))
    
    const dragEnd = (result) => {
        console.log(result);
        const productItems = [...products];

        const [orderProducts] = productItems.splice(result.source.index, 1)
        productItems.splice(result.destination.index, 0, orderProducts);

        setProducts(productItems);
    }
    //console.log(allProducts)
    return (
        <Container className='mt-3 px-0'>
            <DragDropContext onDragEnd={dragEnd}>
                <Droppable 
                    droppableId="productsSequence"
                    direction='horizontal'
                    type='column'
                >{ (provided) => (
                        /* <div className="row rowDiv">
                        {allProducts}
                    </div> */
                    <Row xs={1} sm={3} md={3}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        { allProducts}
                        {provided.placeholder}
                    </Row>
                )}   
                </Droppable>
            </DragDropContext> 
        </Container>
         
    )
}

export default BannerCard