import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';



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

    function RenderComments({comments}) {
        let options = { year: "numeric", month: "short", day: "2-digit" };
        if (comments != null) {
            return (
                comments.map(comm => (
                    <ul key={comm.id} className="list-unstyled">
                        <li>{ comm.comment }</li>
                        <li>{`-- ${comm.author}, ${new Intl.DateTimeFormat('en-US', options).format(new Date(Date.parse(comm.date)))}`}</li>
                    </ul>
                ))
            );
        } else {
                return <div></div>
                }
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
                    </div>
                </div>
            </div>
        )
    }


export default DishDetail;