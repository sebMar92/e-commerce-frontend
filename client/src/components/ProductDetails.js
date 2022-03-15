import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';


export default function ProductDetails() {
    return (
        <>
        <NavBar/>
        <div className='product'>
            <h1>This is product details</h1>

            {/*  <div class="flex justify-around"> 
              <img class="w-2/12 m-2" src="https://th.bing.com/th/id/OIP.As0orGo3lm9xJTSEVBeluAHaHa?pid=ImgDet&rs=1 " /> 
              <img class="w-2/12 m-2" src="https://th.bing.com/th/id/R.2a8d07db8b5e24f6e9cf90fee738b667?rik=VMOAsnvuIKHGrg&riu=http%3a%2f%2fwww.gda.itesm.mx%2fsitios%2fimagesCont%2fsoftware2_d7a0cff1ac.jpg&ehk=DcSQvUUhSe4V4L3DkxX5hBhdoDPg51Pkp2pAlb0XqZQ%3d&risl=&pid=ImgRaw&r=0 " /> 
              <img class="w-2/12 m-2" src="https://th.bing.com/th/id/R.df1bbadec22863877a368682196986c4?rik=2dLC%2bMV4vGFM1g&riu=http%3a%2f%2fthumbs.dreamstime.com%2fz%2fcomputadora-port%c3%a1til-moderna-con-el-interfaz-azul-28673016.jpg&ehk=XQITDpA9XkqsYD66C6c4m2Wk4dpija4TeN5hlDRgvYw%3d&risl=&pid=ImgRaw&r=0 " /> 
             </div> */}
        </div>
        <Footer/>
        </>
    );
}