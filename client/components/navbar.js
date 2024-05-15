import Link from 'next/link';

const Navbar=({curruntUser})=>{
  const links=[
      !curruntUser && {label:"SignIn",href:"/auth/signin"},
      !curruntUser && {label:"SignUp",href:"/auth/signup"},
      curruntUser && {label:"signout",href:"/auth/signout"}
  ]
  .filter(linkConfig=>linkConfig)
  .map(({label,href})=>{

      return (
          <li key={href} className="nav-items">
              <Link href={href}>
              <a  className="nav-links">
              {label}
              </a>
              </Link>
          </li>
      )
  });


  return (
      <nav className="nav navbar-light bg-light">
          <Link href="/">
          <a>Home</a>
          </Link>

          <div className="d-flex justify-content-end">
              <ul className=" nav d-flex align-items-center">
                     {links}
              </ul>
          </div>
      </nav>
  )
}


export default Navbar;