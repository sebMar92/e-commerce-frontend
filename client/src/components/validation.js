export function validation(input){
    let errors ={};

    if(!input.title){
        errors.name ="enter the title please"
    }
    if(!input.name){
        errors.name ="enter the name please"
    }
    if(!input.price){
        errors.name ="enter the price please"
    }
    if(!input.shippingCost){
        errors.name ="enter the shipping Cost please"
    }
    if(!input.description){
        errors.name ="enter the description please"
    }
    if(!input.images){
        errors.name ="enter the images please"
    }
    if(!input.stock){
        errors.name ="enter the stock please"
    }
    if(!input.categories){
        errors.name ="enter the categories please"
    }
   
    return errors;

    
}