import React from "react";

const AreaDialog = function(props) {
    var image = "https://www.zomato.com/widgets/foodie_widget_img.php?widget_type=4&lat="+props.location.latitude+"&lon="+props.location.longitude;
    return (
        <div>
        <div className="widget_wrap" style={{width:'auto',height:'auto',display:'inline-block'}}>
                    <a href="https://www.zomato.com/" title="Foodie Index">
                    <img src={image} style={{width:"200", height:"150"}} alt="Foodie index"/>
                    </a> 
                    </div>
        </div>   
            
    );
};
  
export default AreaDialog;