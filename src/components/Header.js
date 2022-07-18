import React from 'react';
import { Badge, Container, Dropdown, FormControl, Navbar, Nav, Button } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { CartState } from '../context/Context';
import './style.css';
const Header = () => {
    const { state: { cart },
        dispatch,
        productDispatch,
    } = CartState();
    return (
        <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>shopping</Link>
                </Navbar.Brand>
                {useLocation().pathname.split("/")[1] !== "cart" && (
                    <Navbar.Text className='search'>
                        <FormControl
                            style={{ width: 500 }}
                            placeholder='Searh a product'
                            className='m-auto'
                            onChange={(e) => {
                                productDispatch({
                                    type: 'FILTER_BY_SEARCH',
                                    payload: e.target.value,
                                });
                            }}
                        />
                    </Navbar.Text>
                )}
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant='success'>
                            <FiShoppingCart color='white' fontSize='25px' />
                            <Badge bg='green'>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {
                                cart.length > 0 ? (
                                    <>
                                        {
                                            cart.map(prod => (
                                                <span className='cartitem' key={prod.id}>
                                                    <img src={prod.image} className='cartItemImg' alt={prod.name} />
                                                    <div className='cartItemDetail'>
                                                        <span>{prod.name}</span>
                                                        <span>$ {prod.price.split('.')[0]}</span>
                                                    </div>
                                                    <AiFillDelete fontSize='20px' style={{ cursor: 'pointer' }} onClick={() =>
                                                        dispatch({
                                                            type: 'REMOVE_FROM_CART',
                                                            payload: prod,
                                                        })
                                                    }
                                                    />
                                                </span>
                                            ))}
                                        <Link to='/cart'>
                                            <Button style={{ width: '95%', margin: '0 10px' }}>
                                                Go To Cart
                                            </Button>
                                        </Link>
                                    </>
                                ) : (<span style={{ padding: 10 }}>Cart Is Empty!</span>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;