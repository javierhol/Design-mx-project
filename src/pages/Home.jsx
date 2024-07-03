import { useEffect, useState } from "react";
import "./assets/css/style.css";
import axios from "axios";
import { API_CRYPTO_PRICES } from "../config/api";


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
                  <a href="#satis" className="navbar-link" data-nav-link="">
                    Beneficios
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#about" className="navbar-link" data-nav-link="">
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
                    href="http://t.me/TTrading_Isma"
                    target="_blank"
                    className="navbar-link"
                    data-nav-link=""
                  >
                    Contactanos
                  </a>
                </li>
                {/* <li className="navbar-item">
                  <a href="#refers" className="navbar-link" data-nav-link="">
                   Tutoriales
                  </a>
                </li> */}
                
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
            Registrar
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
                  <h1 className="h1hero-title2">
                  instantánea
                  </h1>
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
                  <ul className="tab-nav">
                    <li>
                      <button className="tab-btn active">Cryptos</button>
                    </li>
                  </ul>
                  <ul className="tab-content">
                    {Object.keys(prices).map((symbol, index) => {
                      const coinData = prices[symbol];
                      return (
                        <li key={index}>
                          <div className="trend-card active">
                            <div className="card-title-wrapper">
                              {/* Ajusta el src y alt según el símbolo de la criptomoneda */}
                              <img
                                src={`/assets/img/coin-${index + 1}.svg`}
                                width={24}
                                height={24}
                                alt={`${crypto.symbol} logo`}
                              />
                              <a className="card-title">
                                {coinData.name}{" "}
                                <span className="span">{`${symbol}/USD`}</span>
                              </a>
                            </div>
                            <data className="card-value" value={crypto.price}>
                              {`USD ${coinData.price}`}
                            </data>
                            <div className="card-analytics">
                              <data
                                className="current-price"
                                value={crypto.last24Hours}
                              >
                                {coinData.marketCap}
                              </data>
                              {/* Utiliza una condición para determinar si el porcentaje es positivo o negativo */}
                              <div
                                className={`badge ${
                                  coinData.last7Days &&
                                  coinData.last7Days > 0
                                    ? "green"
                                    : "red"}
                                `}
                              >
                                {`${
                                  coinData.last7Days && coinData.last7Days > 0
                                    ? "+"
                                    : ""
                                }${coinData.last7Days}%`}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
            {/* 
    - #MARKET
  */}
            <section
              className="section market"
              aria-label="market update"
              data-section=""
            >
              <div className="container">
                <div className="title-wrapper">
                  <h2 className="h2 section-title">
                    Criptomonedas más famosas
                  </h2>
                  <a
                    href="http://surl.li/nmlzr"
                    target="_blank"
                    className="btn-link"
                  >
                    Ver todas
                  </a>
                </div>
                <div className="market-tab">
                  <table className="market-table">
                    <thead className="table-head">
                      <tr className="table-row table-title ">
                        <th className="table-heading " />
                        <th className="table-heading" scope="col">
                          #
                        </th>
                        <th className="table-heading" scope="col">
                          Nombre
                        </th>
                        <th className="table-heading" scope="col">
                          Último precio
                        </th>
                        <th className="table-heading" scope="col">
                          24H %
                        </th>

                        <th className="table-heading" scope="col">
                          Capital 
                        </th>
                        <th className="table-heading" scope="col">
                          Últimos 7 días
                        </th>
                        <th className="table-heading" />
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {Object.keys(prices).map((symbol, index) => {
                        const coinData = prices[symbol];
                        return (
                          <tr className="table-row text-center " key={index}>
                            <td class="table-data">
                              <button
                                class="add-to-fav"
                                aria-label="Add to favourite"
                                data-add-to-fav
                              >
                                <ion-icon
                                  name="star-outline"
                                  aria-hidden="true"
                                  class="icon-outline"
                                ></ion-icon>
                                <ion-icon
                                  name="star"
                                  aria-hidden="true"
                                  class="icon-fill"
                                ></ion-icon>
                              </button>
                            </td>

                            <th className="table-data rank" scope="row">
                              {index + 1}
                            </th>
                            <td className="table-data text-right">
                              <div className="wrapper">
                                {/* Puedes cambiar las imágenes según el símbolo de la moneda */}
                                <img
                                  src={`/assets/img/coin-${index + 1}.svg`}
                                  width={20}
                                  height={20}
                                  alt={`${coinData.name} logo`}
                                  className="img"
                                />
                                <h3>
                                  <a className="coin-name">
                                    {coinData.name}{" "}
                                    <span className="span">{symbol}</span>
                                  </a>
                                </h3>
                              </div>
                            </td>
                            <td className="table-data last-price">
                              ${coinData.price}
                            </td>
                            <td
                              className="table-data last-update"
                              style={{
                                color:
                                  coinData.last24Hours &&
                                  coinData.last24Hours > 0
                                    ? "green"
                                    : "red",
                              }}
                            >
                              {coinData.last24Hours && coinData.last24Hours > 0
                                ? `+${coinData.last24Hours}`
                                : coinData.last24Hours}
                            </td>
                            <td className="table-data market-cap ">
                              ${coinData.marketCap}
                            </td>
                            <td
                              className="table-data "
                              style={{
                                color:
                                  coinData.last7Days && coinData.last7Days > 0
                                    ? "green"
                                    : "red",
                              }}
                            >
                              {coinData.last7Days && coinData.last7Days > 0
                                ? `+${coinData.last7Days}`
                                : coinData.last7Days}
                            </td>
                            <td className="table-data">
                              <button className="btn btn-outline">
                                <a href="/login">Trade</a>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {/* 
    - #INSTRUCTION
  */}
            <section
              className="section instruction"
              aria-label="instruction"
              data-section=""
              id="satis"
            >
              <div className="container">
                <h2 className="h2 section-title">Resultados satisfactorios</h2>
                <p className="section-text">
                  Nuestra prioridad es que nuestros usuarios estén satisfechos
                  con nuestra estrategia y tengan un sitio fiable y cómodo para
                  obtener ganancias diarias gracias a su fondo de inversión.
                </p>
                <ul className="instruction-list">
                  <li>
                    <div className="instruction-card">
                      <figure className="card-banner">
                        <img
                          src="/assets/img/instruction-1.png"
                          width={96}
                          height={96}
                          loading="lazy"
                          alt="Step 1"
                          className="img"
                        />
                      </figure>
                      <p className="card-subtitle">Paso 1</p>
                      <h3 className="h3 card-title">Optimización Financiera</h3>
                      <p className="card-text">
                        Automatización diaria de la acreditación de ganancias,
                        derivada de tu inversión, mediante fondos generados por
                        nuestro equipo de traders en el mercado de Forex
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="instruction-card">
                      <figure className="card-banner">
                        <img
                          src="/assets/img/instruction-2.png"
                          width={96}
                          height={96}
                          loading="lazy"
                          alt="Step 2"
                          className="img"
                        />
                      </figure>
                      <p className="card-subtitle">Paso 2</p>
                      <h3 className="h3 card-title">Control total</h3>
                      <p className="card-text">
                        Retiros seguros y transferencias directas a tu billetera
                        privada. Tú ejerces el control absoluto sobre tus fondos
                        de inversión, así como sobre tus ganancias.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="instruction-card">
                      <figure className="card-banner">
                        <img
                          src="/assets/img/instruction-3.png"
                          width={96}
                          height={96}
                          loading="lazy"
                          alt="Step 3"
                          className="img"
                        />
                      </figure>
                      <p className="card-subtitle">Paso 3</p>
                      <h3 className="h3 card-title">Maximiza tus Ganancias</h3>
                      <p className="card-text">
                        Rendimiento superior al obtenido mediante la minería de
                        criptomonedas, gracias a los resultados directos
                        derivados del mercado de divisas (Forex), respaldados
                        por una gestión de riesgos segura y eficaz.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="instruction-card">
                      <figure className="card-banner">
                        <img
                          src="/assets/img/instruction-4.png"
                          width={96}
                          height={96}
                          loading="lazy"
                          alt="Step 4"
                          className="img"
                        />
                      </figure>
                      <p className="card-subtitle">Paso 4</p>
                      <h3 className="h3 card-title">Retiros Eficientes</h3>
                      <p className="card-text">
                        Retiros automatizados en USDT con una respuesta de
                        tiempo récord disponible las 24 horas del día, a través
                        de la red de TRON - TRC20.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            {/* 
    - #ABOUT
  */}
            <section
              className="section about"
              id="about"
              aria-label="about"
              data-section=""
            >
              <div className="container">
                <figure className="about-banner">
                  <img
                    src="/assets/img/fondo-laptop.png"
                    width={648}
                    height={436}
                    loading="lazy"
                    alt="about banner"
                    className="w-100"
                  />
                </figure>
                <div className="about-content">
                  <h2 className="h2 section-title">Sobre nosotros</h2>
                  <p className="section-text">
                    El comercio de criptomonedas es nuestra principal actividad.
                    Nos apoyamos en las probabilidades y las estadísticas que se
                    hacen a través de estudios del mercado actual.
                  </p>
                  <ul className="section-list">
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 list-title">Estrategias Efectivas</h3>
                      </div>
                      <p className="item-text">
                        Las estrategias comerciales son efectivas en cualquier
                        entorno económico, brindando seguridad en la generación
                        de ingresos. Al minimizar pérdidas y tomar decisiones
                        informadas, se logra un rendimiento financiero
                        considerable, democratizando así el acceso a
                        oportunidades rentables para todos.
                      </p>
                    </li>
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 list-title">
                          Seguridad en el comercio
                        </h3>
                      </div>
                      <p className="item-text">
                        Las estrategias comerciales demuestran su eficacia tanto
                        en periodos de crecimiento económico como en fases de
                        declive. Por consiguiente, constituyen un método seguro
                        para la generación de ingresos. Además, es importante
                        destacar que el conocimiento adquirido permite que
                        cualquier individuo puede ahora obtener beneficios de
                        manera diaria y sin riesgos.
                      </p>
                    </li>
                  </ul>
                  <a href="/login" className="btn btn-primary">
                    Iniciar ahora
                  </a>
                </div>
              </div>
            </section>
            {/* 
    - #APP
  */}
            <section
              className="section app"
              id="refers"
              aria-label="app"
              data-section=""
            >
              <div className="container">
                <div className="app-content">
                  <h2 className="h2 section-title">Sistema de referencia</h2>
                  <p className="section-text"></p>
                  <ul className="section-list">
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 item-title">Programa de afiliados</h3>
                      </div>
                      <p className="item-text">
                        Nuestro programa de afiliados es sencillo, a medida que
                        más personas utilicen tu enlace de referencia y realicen
                        su primer depósito obtendrás más beneficios en nuestra
                        plataforma.
                      </p>
                    </li>
                    <li className="section-item">
                      <div className="title-wrapper">
                        <ion-icon name="checkmark-circle" aria-hidden="true" />
                        <h3 className="h3 item-title">
                          Maximiza tus Ganancias
                        </h3>
                      </div>
                      <p className="item-text">
                        Tus ganancias aumentarán y podrás sacar mas provecho a
                        nuestros servicios.
                      </p>
                    </li>
                  </ul>
                  <a href="/login" className="btn btn-primary">
                    Iniciar ahora
                  </a>
                </div>
                <div className="app-banner">
                  <img
                    src="/assets/img/app-banner.png"
                    width={618}
                    height={526}
                    loading="lazy"
                    alt="app banner"
                    className="w-100"
                  />
                </div>
              </div>
            </section>
          </article>
        </main>
        {/* 
      - #FOOTER
    */}
        <footer className="footer" id="contact">
          <div className="footer-bottom">
            <div className="container">
              <p className="copyright">
                © 2023 T-Trading All Rights Reserved by{" "}
                <a href="#" className="copyright-link">
                  T-Trading
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
