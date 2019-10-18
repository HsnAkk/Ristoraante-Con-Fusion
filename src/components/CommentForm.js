import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);



class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false
        }
    }
    
    RenderComments = () => this.setState({ modal: !this.state.modal});

    handleSubmit = values => {
        console.log('Current State is :' + JSON.stringify(values));
        alert('Current State is :' + JSON.stringify(values));
    }

    render() {

        return (
            <div>
                <Button outline color="secondary" onClick={this.RenderComments}><span className="fa fa-pencil fa-lg"></span> Submit Commit</Button>
                <Modal isOpen={this.state.modal} toggle={this.RenderComments}>
                    <ModalHeader toggle={this.RenderComments}>Submit Comment</ModalHeader>
                    <ModalBody className="m-3">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" >Rating</Label>
                                <Control.select  
                                        model=".rating" 
                                        name="rating" 
                                        className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text  
                                    model=".author" 
                                    id="author" 
                                    name="author" 
                                    placeholder="Your Name" 
                                    className="form-control"
                                    validators = {{
                                                required, minLength:minLength(3), maxLength:maxLength(15)
                                                }}
                                />
                                <Errors     className="text-danger" 
                                            model=".author" 
                                            show="touched"
                                            messages= {{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea  
                                        model=".comment" 
                                        id="comment" 
                                        name="comment" 
                                        rows="6" 
                                        className="form-control"
                                />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm> 
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;