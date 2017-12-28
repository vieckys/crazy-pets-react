import React, { Component } from 'react';
import petsData from '../api/pets.json';
import PetComponent from './PetComponent';

import { addToCart } from '../actions/cartActions';
import { addToWishlist } from '../actions/wishlistActions';
import { connect } from 'react-redux';

class PetsListComponent extends Component {

    constructor(props) {
        super();
        this.state = {
            petDataCount: (props.dataCount === "all" ? Object.keys(petsData).length : props.dataCount)
        }
    }

    handleBuyClick(petId) {
        alert("Pet id : " + petId);
    }
    
    handleWishlistClick(petId) {
        alert("Pet id : " + petId);
    }

    makeList() {
        var petListHtml = '';
        petListHtml = petsData.map((pet, index) => {            
            if (this.state.petDataCount > index) {
                return(
                    <PetComponent 
                        id={pet.id}
                        key={pet.id}
                        name={pet.name}
                        gender={pet.gender}
                        age={pet.age}
                        price={pet.price}
                        picture={pet.picture}
                        handleBuyClick={this.props.addToCart}
                        handleWishlistClick={this.props.addToWishlist}
                    />
                );
            }
        });
        return petListHtml;
    }
    
    render() {
        return(
            this.makeList()
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer,
        wish: state.wishlistReducer,
    };
};

const mapDispatchToProps = (dispath) => {
    return {
        addToCart: (petId) => {
            dispath(addToCart(petId));
        },
        addToWishlist: (petId) => {
            dispath(addToWishlist(petId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PetsListComponent);