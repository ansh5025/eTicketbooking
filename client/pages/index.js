import buildClient from "../apis/buildClient";

const LandingPage = (data) => {
 // console.log("current user", data);
  return data.curruntUser?<h1>Welcome {data.curruntUser.email}</h1>:<h1>Please SignIn To Continue</h1>;
};

LandingPage.getInitialProps = async (context) => {

    console.log("In Index");
  const client = buildClient(context);
  const { data } = await client.get("api/users/curruntUser");
    
  return data;
};

export default LandingPage;
