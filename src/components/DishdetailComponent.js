import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,  
        Button, Modal, ModalHeader, ModalBody, Row, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
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
        
        toggle = () => this.setState({ modal: !this.state.modal});
    
        handleSubmit = values => {
            console.log('Current State is :' + JSON.stringify(values));
            alert('Current State is :' + JSON.stringify(values));
        }
    
        render() {
            return (
                <div>
                    <Button outline color="secondary" onClick={this.toggle}><span className="fa fa-pencil fa-lg"></span> Submit Commit</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
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



    function RenderDish ({dish}) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }


    function RenderComments ({comments}) {
        let options = { year: "numeric", month: "short", day: "2-digit" };
        if (comments != null) {
            return (
                    comments.map(comm => (
                    <ul key={comm.id} className="list-unstyled">
                        <li>{ comm.comment }</li>
                        <li>{`-- ${comm.author}, ${new Intl.DateTimeFormat('en-US', options).format(new Date(Date.parse(comm.date)))}`}</li>
                    </ul>
                ))
            )
        } else {
                return <div></div>
                };
    }

    
    const DishDetail = (props) => {
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} />
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        { props.comments ? <h4>Comments</h4> : null }
                        <RenderComments comments = {props.comments} />
                        <CommentForm />
                    </div>
                </div>
            </div>
        )
    }


export default DishDetail;