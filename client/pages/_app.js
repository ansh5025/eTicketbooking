
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../apis/buildClient';
import Navbar from '../components/navbar';
const AppComponent=({Component,pageProps,curruntUser})=>{
   
   return (
      <div>
         <Navbar curruntUser={curruntUser} />
         <Component {...pageProps} />
      </div> 
   )
}

AppComponent.getInitialProps=async (appContext)=>{

const client=buildClient(appContext.ctx);
const {data} =await client.get('api/users/curruntUser');

let pageProps={};
if(appContext.Component.getInitialProps){
   pageProps=await appContext.Component.getInitialProps(appContext.ctx);
}

return {
   pageProps,
   ...data

}
};
export default AppComponent;