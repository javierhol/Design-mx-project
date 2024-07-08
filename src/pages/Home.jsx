import { useEffect, useState } from "react";
import "./assets/css/style.css";
// import axios from "axios";
// import { API_CRYPTO_PRICES } from "../config/api";
import Pricing from "./Pricing";
import Contact from "./Contact";
import QA from "./QA";
const Home = () => {
  useEffect(() => {
    const addEventOnElem = function (elem, type, callback) {
      if (elem && elem.addEventListener) {
        if (elem.length > 1) {
          for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
          }
        } else {
          elem.addEventListener(type, callback);
        }
      } else {
        console.error("Invalid element or addEventListener not supported.");
      }
    };

    /**
     * navbar toggle
     */

    const navbar = document.querySelector("[data-navbar]");
    const navbarLinks = document.querySelectorAll("[data-nav-link]");
    const navToggler = document.querySelector("[data-nav-toggler]");

    const toggleNavbar = function () {
      navbar.classList.toggle("active");
      navToggler.classList.toggle("active");
      document.body.classList.toggle("active");
    };

    addEventOnElem(navToggler, "click", toggleNavbar);

    const closeNavbar = function () {
      navbar.classList.remove("active");
      navToggler.classList.remove("active");
      document.body.classList.remove("active");
    };

    addEventOnElem(navbarLinks, "click", closeNavbar);

    /**
     * header active
     */

    const header = document.querySelector("[data-header]");

    const activeHeader = function () {
      if (window.scrollY > 300) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    };

    addEventOnElem(window, "scroll", activeHeader);

    /**
     * toggle active on add to fav
     */

    const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

    const toggleActive = function () {
      this.classList.toggle("active");
    };

    addEventOnElem(addToFavBtns, "click", toggleActive);

    /**
     * scroll revreal effect
     */

    const sections = document.querySelectorAll("[data-section]");

    const scrollReveal = function () {
      for (let i = 0; i < sections.length; i++) {
        if (
          sections[i].getBoundingClientRect().top <
          window.innerHeight / 1.5
        ) {
          sections[i].classList.add("active");
        } else {
          sections[i].classList.remove("active");
        }
      }
    };

    scrollReveal();

    addEventOnElem(window, "scroll", scrollReveal);
  }, []);







  return (
    <>
      {/* 
      - #HEADER
    */}

      <div className="style_content">
        <header className="header" data-header="">
          <div className="container">
            <a href="#" className="logo">
              <img
                src="/assets/img/logo_qui.png"
                width={190}
                height={190}
                alt="Quickbyll"
              />
            </a>
            <nav className="navbar" data-navbar="">
              <ul className="navbar-list">
                <li className="navbar-item">
                  <a href="#" className="navbar-link active" data-nav-link="">
                    Inicio
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#results" className="navbar-link" data-nav-link="">
                    Resultados
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#plans" className="navbar-link" data-nav-link="">
                    Planes
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#refers" className="navbar-link" data-nav-link="">
                    Q&A
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#refers" className="navbar-link" data-nav-link="">
                    Tutoriales
                  </a>
                </li>
                <li className="navbar-item">
                  <a className="navbar-link" href="#contact">
                    Contactanos
                  </a>
                </li>
              </ul>
            </nav>
            <button
              className="nav-toggle-btn"
              aria-label="Toggle menu"
              data-nav-toggler=""
            >
              <span className="line line-1" />
              <span className="line line-2" />
              <span className="line line-3" />
            </button>
            <a href="/login" className="btn btn-outline">
              Iniciar
            </a>
          </div>
        </header>
        <main>
          <article>
            <section className="section hero" aria-label="hero" data-section="">
              <div className="container">
                <div className="hero-content ">
                  <h1 className="h1 hero-title ">Facturación</h1>
                  <span className="h1hero-title2">instantánea</span>
                  <p className="hero-text">
                    Descarga de forma instantánea, rápida y segura tus facturas
                    de cualquier negocio a través de nuestra app móvil.
                  </p>
                  <a href="/login" className="btn btn-primary">
                    Pruébala Gratis
                  </a>
                </div>
                <figure className="hero-banner">
                  <img
                    src="/assets/img/portada-facturacion.png"
                    width={610}
                    height={488}
                    alt="hero banner"
                    className="w-100"
                  />
                </figure>
              </div>
            </section>
            <section
              className="section trend"
              aria-label="crypto trend"
              data-section=""
            >
              <div className="container">
                <div className="trend-tab">
                  <ul className="instruction-list">
                    <li>
                      <div className="instruction-card">
                        <figure className="card-banner">
                          <img
                            src="/assets/img/instruction-1.png"
                            width={400}
                            height={400}
                            loading="lazy"
                            alt="Step 1"
                            className="img"
                          />
                        </figure>
                        <p className="card-text">
                          Digitaliza los procesos facturables de tu empresa
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="instruction-card">
                        <figure className="card-banner">
                          <img
                            src="/assets/img/instruction-2.png"
                            width={400}
                            height={400}
                            loading="lazy"
                            alt="Step 2"
                            className="img"
                          />
                        </figure>
                        <p className="card-text">
                          Emite y recibe facturas de forma rápida y sencilla
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="instruction-card">
                        <figure className="card-banner">
                          <img
                            src="/assets/img/instruction-3.png"
                            width={400}
                            height={400}
                            loading="lazy"
                            alt="Step 3"
                            className="img"
                          />
                        </figure>
                        <p className="card-text">
                          Transforma tu constancia fiscal en una identificación
                          digital
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="instruction-card">
                        <figure className="card-banner">
                          <img
                            src="/assets/img/instruction-4.png"
                            width={400}
                            height={400}
                            loading="lazy"
                            alt="Step 4"
                            className="img"
                          />
                        </figure>
                        <p className="card-text">
                          Visualiza tus ingresos, egresos y pago de impuestos
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section
              className="section market "
              aria-label="market update"
              data-section=""
            >
              <iframe
                className="rounded-2xl"
                width={900}
                height={600}
                src="https://www.youtube.com/embed/pknyGVl-_Fg?si=li1Sh3Msvo5Xtkc1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </section>

            <section
              className="section about"
              id="results"
              aria-label="about"
              data-section=""
            >
              <div className="container">
                <figure className="about-banner">
                  <img
                    src="/assets/img/results.png"
                    width={648}
                    height={436}
                    loading="lazy"
                    alt="about banner"
                    className="w-100"
                  />
                </figure>
                <div className="about-content">
                  <h2 className="h2 section-title">
                    Resultados Satisfactorios
                  </h2>
                  <p className="section-text">
                    Al acelerar los procesos internos de tu empresa, como la
                    facturación, optimizarás el uso de los recursos disponibles
                    y reducirás el tiempo necesario para completar las tareas.
                    Esto resulta en una mayor eficiencia operativa, lo que
                    implica que podrás realizar más trabajo en menos tiempo y
                    con menor esfuerzo.
                  </p>
                  <ul className="section-list">
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 list-title">Reduccion de costos</h3>
                      </div>
                      <p className="item-text">
                        Al eliminar la necesidad de imprimir facturas en papel y
                        enviarlas por correo, tu empresa y tus clientes pueden
                        ahorrar en gastos de impresión, envío y almacenamiento.
                      </p>
                    </li>
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 list-title">Eficiencia operativa</h3>
                      </div>
                      <p className="item-text">
                        Al acelerar los procesos internos de tu empresa, como la
                        facturación, optimizarás el uso de los recursos
                        disponibles y reducirás el tiempo necesario para
                        completar las tareas. Esto resulta en una mayor
                        eficiencia operativa, lo que implica que podrás realizar
                        más trabajo en menos tiempo y con menor esfuerzo.
                      </p>
                    </li>
                  </ul>
                  <a href="/login" className="btn btn-primary">
                    Pruébala Gratis
                  </a>
                </div>
              </div>
            </section>

            {/* 
    - Plans
  */}

            <section
              className="section plans"
              id="plans"
              aria-label="about"
              data-section=""
            >
              <Pricing />
            </section>
            <section className="faq-section">
            <QA />
            </section>

            <section
              className="section contact"
              id="contact"
              aria-label="app"
              data-section=""
            >
              <Contact />
            </section>
          </article>
        </main>

        <footer className="footer" id="contact">
          <div className="container_footer">
            <div className="row">
              <div className="footer-col">
                <h4>QUICKBYLL</h4>
                <ul className="ul_footer">
                  <li>
                    <img
                      src="/assets/img/icon_orange.png"
                      width={210}
                      height={180}
                      alt="QUICKBYLL"
                    />
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Mapa del sitio</h4>
                <ul className="ul_footer">
                  <li>
                    <a href="#"> Inicio</a>
                  </li>
                  <li>
                    <a href="#">¿Cómo funciona?</a>
                  </li>
                  <li>
                    <a href="">Precios</a>
                  </li>
                  <li>
                    <a href="">Q&A</a>
                  </li>
                  <li>
                    <a href="">Contacto</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Intereses</h4>
                <ul>
                  <li>
                    <a href="#">Tutoriales</a>
                  </li>
                  <li>
                    <a href="#">Iniciar Sesión</a>
                  </li>
                  <li>
                    <a href="">Precios</a>
                  </li>
                  <li>
                    <a href="">Q&A</a>
                  </li>
                  <li>
                    <a href="">Contacto</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>¡Mantente al Día con Quickbyll!</h4>
                <ul>
                  <li>
                    <a href="#">Síguenos en nuestras redes sociales.</a>
                  </li>
                </ul>

                <div className="social-links2">
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-skype"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-legal text-center">
            <section id="clients" class="clients">
              <div id="logos" class="container">
                <article>
                  <picture>
                    <img
                      src="assets/img/sec01.png"
                      class="img-fluid aos-init aos-animate"
                      alt=""
                      data-aos="zoom-out"
                      data-aos-delay="200"
                    />
                  </picture>
                  <picture>
                    <img
                      src="assets/img/sec02.png"
                      class="img-fluid aos-init aos-animate"
                      alt=""
                      data-aos="zoom-out"
                      data-aos-delay="400"
                    />
                  </picture>
                  <picture>
                    <img
                      src="assets/img/sec03.png"
                      class="img-fluid aos-init aos-animate"
                      alt=""
                      data-aos="zoom-out"
                      data-aos-delay="600"
                    />
                  </picture>
                </article>
              </div>
            </section>
            <div class="container d-flex flex-column flex-lg-row justify-content-center align-items-center">
              <div class="d-flex flex-column align-items-center text-center">
                <div class="copyright">
                  ©Copyright{" "}
                  <strong>
                    <span>Quickbyll</span>
                  </strong>
                  . Todos los derechos reservados.{" "}
                </div>
                <div class="credits text-center">
                  Xpressbill, S.A.P.I de C.V. todos los derechos reservados.{" "}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
