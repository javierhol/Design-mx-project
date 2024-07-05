import { useEffect, useState } from "react";
import "./assets/css/style.css";
import axios from "axios";
import { API_CRYPTO_PRICES } from "../config/api";
import Pricing from "./Pricing";
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

  const [prices, setPrices] = useState({});

  useEffect(() => {
    const updatePrices = async () => {
      try {
        // const newPrices = await axios.get('https://ttrading.onrender.com/api/crypto/prices/');
        const newPrices = await axios.get(API_CRYPTO_PRICES);
        const pricesData = newPrices.data.reduce((acc, current) => {
          acc[current.symbol] = current;
          return acc;
        }, {});

        // Actualiza el estado con el nuevo objeto
        setPrices(pricesData);
      } catch (error) {
        // Manejar errores si es necesario
      }
    };

    // Llama a la función de obtención de precios al montar el componente
    updatePrices();

    // Establece un intervalo para actualizar los precios cada 5 minutos
    const intervalId = setInterval(updatePrices, 24 * 60 * 60 * 1000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
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
                  <a
                    className="navbar-link"
                    href="#contact"
                  >
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
                  <h1 className="h1 hero-title ">
                    Facturación
                  </h1>
                  <span className="h1hero-title2">
                    instantánea
                  </span>
                  <p className="hero-text">
                    Descarga de forma instantánea, rápida y segura tus facturas de cualquier negocio a través de nuestra app móvil.
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
                          Transforma tu constancia fiscal en una identificación digital
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
                  <h2 className="h2 section-title">Resultados Satisfactorios</h2>
                  <p className="section-text">
                    Al acelerar los procesos internos de tu empresa, como la facturación, optimizarás el uso de los recursos disponibles y reducirás el tiempo necesario para completar las tareas. Esto resulta en una mayor eficiencia operativa, lo que implica que podrás realizar más trabajo en menos tiempo y con menor esfuerzo.
                  </p>
                  <ul className="section-list">
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 list-title">Reduccion de costos</h3>
                      </div>
                      <p className="item-text">
                        Al eliminar la necesidad de imprimir facturas en papel
                        y enviarlas por correo, tu empresa y tus clientes pueden
                        ahorrar en gastos de impresión, envío y almacenamiento.
                      </p>
                    </li>
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 list-title">
                          Eficiencia operativa
                        </h3>
                      </div>
                      <p className="item-text">
                        Al acelerar los procesos internos de tu empresa, como la facturación, optimizarás el uso de los recursos disponibles y reducirás el tiempo necesario para completar las tareas. Esto resulta en una mayor eficiencia operativa, lo que implica que podrás realizar más trabajo en menos tiempo y con menor esfuerzo.
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
              className="section about plans"
              id="plans"
              aria-label="about"
              data-section=""
            >
              <Pricing />

            </section>


            <section
              className="section app"
              id="refers"
              aria-label="app"
              data-section=""
            >
              <h1 className="h1_QA">Preguntas Frecuentes</h1>
              <div className="container_qa">
              <div className="container">
                <div className="app-content">
                  <div className="acordion">

                    <div className="accordion-item" id="question1">


                      <a className="accordion-link" href="#question1">
                           <p>
                           ¿Qué diferencias existen entre el plan individual y business?
                           </p>
                      
                        <i className="icon ion-md-add">
                          <ion-icon name="add"></ion-icon>
                        </i>

                        <i className="icon ion-md-remove">
                          <ion-icon name="remove"></ion-icon>
                        </i>


                      </a>
                      <div className="answer">
                        <p>
                          El individual está diseñado solamente para recibir y administrar tus facturas. En cambio el business tiene todo lo del individual pero además puedes emitir y administrar tus facturas.
                        </p>

                      </div>
                    </div>


                    <div className="accordion-item" id="question2">


                      <a className="accordion-link" href="#question2">
                            <p>
                            ¿Puedo cambiarme de plan individual al business?
                            </p>
                 
                        <i className="icon ion-md-add">
                          <ion-icon name="add"></ion-icon>
                        </i>

                        <i className="icon ion-md-remove">
                          <ion-icon name="remove"></ion-icon>
                        </i>

                      </a>
                      <div className="answer">
                        <p>
                          Sí, el cambio es gratuito y es al instante, no hay necesidad de crear otra cuenta ya que podrás utilizar el mismo correo electrónico
                        </p>
                      </div>
                    </div>


                    <div className="accordion-item" id="question3">


                      <a className="accordion-link" href="#question3">
                        <p>
                        ¿Qué significa Quickbyll ID?
                        </p>
                       
                        <i className="icon ion-md-add">
                          <ion-icon name="add"></ion-icon>
                        </i>

                        <i className="icon ion-md-remove">
                          <ion-icon name="remove"></ion-icon>
                        </i>
                      </a>
                      <div className="answer">
                        <p>
                          Es una identificación digital que hace las veces de tu constancia fiscal, que contiene sólo los datos más importantes que necesitas para recibir facturas y compartir con terceros.</p>
                      </div>
                    </div>

                    <div className="accordion-item" id="question4">


                      <a className="accordion-link" href="#question4">

                        <p>
                          ¿Es Quickbyll gratuito o hay algún costo asociado?
                        </p>

                        <i className="icon ion-md-add">
                          <ion-icon name="add"></ion-icon>
                        </i>

                        <i className="icon ion-md-remove">
                          <ion-icon name="remove"></ion-icon>
                        </i>
                      </a>
                      <div className="answer">
                        <p>

                          Por el momento solo se ofrecen versiones gratuitas en servicios, regalando 50 timbres sin vigencia por el primer registro. En caso de agotar tus timbres gratuitos, podrás comprar más a un bajo costo dentro del portal.</p>
                      </div>
                    </div>

                    <div className="accordion-item" id="question5">


                      <a className="accordion-link" href="#question5">

                        <p>
                        ¿Necesito descargar una aplicación para utilizar sus servicios?
                        </p>
                    

                        <i className="icon ion-md-add">
                          <ion-icon name="add"></ion-icon>
                        </i>

                        <i className="icon ion-md-remove">
                          <ion-icon name="remove"></ion-icon>
                        </i>
                      </a>
                      <div className="answer">
                        <p>

                          No, puedes utilizar el portal y aplicación móvil. Sin embargo, te recomendamos que descargues la app móvil ya que es más práctica, intuitiva y de fácil acceso.</p>
                      </div>
                    </div>

                    <div className="accordion-item" id="question7">


                      <a className="accordion-link" href="#question7">

                           <p>
                           ¿Cómo garantizan la seguridad de los datos de facturación?
                           </p>
                       

                        <i className="icon ion-md-add">
                          <ion-icon name="add"></ion-icon>
                        </i>

                        <i className="icon ion-md-remove">
                          <ion-icon name="remove"></ion-icon>
                        </i>
                      </a>
                      <div className="answer">
                        <p>

                          En Quickbyll, mantenemos tus datos fiscales de facturación seguros utilizando un enfoque integral de seguridad de la información. Esto incluye el cifrado de datos, el monitoreo continuo de la red e implementación de firewalls.
                        </p>
                      </div>
                    </div>

                  </div>





                </div>


              </div>

              <div className="app-banner">
                  <img
                    src="/assets/img/app-banner1.png"
                    width={8}
                    height={6}
                    loading="lazy"
                    alt="app banner"
                    className="w-100"
                  />
                </div>
              </div>

             
            </section>
            {/* <section
              className="section app"
              id="refers"
              aria-label="app"
              data-section=""
            >
              <div className="container">
                <div className="app-content">

                  

              
                </div>
              
            </section> */}
          </article>
        </main>
        {/* 
      - #FOOTER
    */}
        <footer className="footer" id="contact">
          <div className="footer-bottom">
            <div className="container">
              <p className="copyright">
                © Copyright Quickbyll. Todos los derechos reservados.
              </p>
              <p className="copyright">
                Xpressbill, S.A.P.I de C.V. todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
