import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@popperjs/core/dist/umd/popper.min.js';


function footer() {

  return <div className="container">
    <footer id = "footer"className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="col-md-4 mb-0 text-muted">&copy; RMIT 2023 s1 Cloud</p>
      <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        {/* <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg> */}
      </a>
    <ul className="footer-authors">
      <li className="group-name"> Group3</li>
      <li className="footer-item">Hur HyeonBin</li>
      <li className="footer-item">Hien Nguyen</li>
      <li className="footer-item">Long Hua</li>
      <li className="footer-item">Linh Nguyen</li>
    </ul>
  </footer>
</div>;
}
export default footer;





 