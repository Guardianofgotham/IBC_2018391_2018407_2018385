import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';

export default(props) =>{
    return (
        <Container>
 <Header></Header>
{props.children}
{/* <h1>Footer</h1> */}
</Container>
    );
};