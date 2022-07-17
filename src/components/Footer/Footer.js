import './footer.css';
function Footer() {
  return (
    <footer className="footer-container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="la-pluma-inc col-md-4 d-flex align-items-center">
        <span className="lapluma">
          © 2022 La Pluma, Inc. All rights reserved.
        </span>
      </div>

      <div className="footer-content">
        <ul className="nav col-md-4  d-flex">
          <li className="ms-3">
            <p className="text-muted"> 0226-42265998</p>
          </li>
          <li className="ms-3">
            <p className="text-muted">Av.Siempreviva 1234</p>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
