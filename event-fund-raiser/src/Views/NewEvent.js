import {React,Component} from 'react';
import Layout from '../Components/Layout';
import {Form,Button,Input} from 'semantic-ui-react'


class NewEvent extends Component {
    state={
        minimumContribution:''
    };
	render() {

		return (
		<Layout>
            <h3>Create New Event</h3>
            <Form>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                    label="wei" 
                    labelPosition="right" 
                    value={this.state.minimumContribution}
                    onChange={event => this.setState({minimumContribution: event.target.value})}/>
                </Form.Field>
                <Button primary>Create</Button>
            </Form>
		</Layout>
		);
	}
}
export default NewEvent