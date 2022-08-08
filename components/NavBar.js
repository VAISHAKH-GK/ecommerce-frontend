import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navbar-expand-lg ps-5 pe-5 navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Ecommerce</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
        </ul>
        <div>
          <Link href="/signup" >
            <button className="btn btn-success" >SignUp</button>
          </Link>
          <Link href="/login" >
            <button className="btn btn-success ml-2 " >Login</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
