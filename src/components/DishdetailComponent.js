import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


class DishDetail extends Component {

    renderDish (dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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

    renderComments(dish) {
        let options = { year: "numeric", month: "short", day: "numeric" };
        if (dish != null) {
            return (
                dish['comments'].map((arr) => (
                    <ul key={arr.id} className="list-unstyled">
                        <li>{ arr.comment }</li>
                        <li>{`-- ${arr.author}, ${new Date(arr.date).toLocaleDateString("en-US", options)}`}</li>
                    </ul>
                    
                ))
            );
        } else {
                return <div></div>
                }
    }


    render() {
        return (
            <div className="row">
                    
                <div  className="col-12 col-md-5 m-1">
                    { this.renderDish(this.props.selectedDish) }
                </div>
                <div  className="col-12 col-md-5 m-1">
                    { this.props.selectedDish ? <h4>Comments</h4> : null }
                    { this.renderComments(this.props.selectedDish) }
                </div>
            </div>
        );
    }
}

export default DishDetail;