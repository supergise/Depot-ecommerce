import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './itemCount.css';

const ItemCount = ( { stock, initial, onAdd } ) => {
    const [count, setCount] = useState(initial);
    const add = () => count < stock && setCount(count + 1);
    const substract = () => count > 0 && setCount(count - 1);

    return (
        <>
            <InputGroup className="mb-3 formControl">
                <Button 
                    className='buttonControl' 
                    onClick={ substract } 
                    variant="outline-secondary">
                        -
                </Button>

                <Form.Control 
                    disabled value={ 'Add prints to your cart: ' + count }>
                </Form.Control> 
                
                <Button 
                    className='buttonControl'
                    onClick={ add } 
                    variant="outline-secondary">
                        +
                </Button>
            </InputGroup>

            <button 
                onClick={ () => onAdd(count) } 
                className='primaryButton' 
                disabled={ count <= 0 }>
                    Add to cart
            </button>
        </>
    );
};

export default ItemCount;