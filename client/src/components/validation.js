export function validation(input){
    let errors ={};

    if(!input.title){
        errors.title ="enter the title please"
    }
    if(!input.name){
        errors.name ="enter the name please"
    }
    if(!input.price){
        errors.price ="enter the price please"
    }else if(input.price < 0){
        errors.price ="The value cannot be negative"
    }
    if(!input.shippingCost){
        errors.shippingCost ="enter the shipping Cost please"
    }else if(input.shippingCost < 0){
        errors.shippingCost ="The value cannot be negative"
    }
    if(!input.description){
        errors.description ="enter the description please"
    }
    if(!input.images){
        errors.images ="enter the images please"
    }
    if(!input.stock){
        errors.stock ="enter the stock please"
    }else if(input.price < 0){
        errors.price ="The value cannot be negative"
    }
    if(!input.categories){
        errors.categories ="enter the categories please"
    }
   
    return errors;

    
}