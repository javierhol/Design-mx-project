import React from "react";
import "./assets/css/style.css";

function QA() {
  return (
    <div>
      <h1 className="h1_QA">Preguntas Frecuentes</h1>
      <div className="faq-container">
        <div className="faq-item">
          <input type="checkbox" id="question1" className="faq-toggle" />
          <label htmlFor="question1" className="faq-title">
            ¿Qué diferencias existen entre el plan individual y business?
            <i className="icon ion-md-add">
              <ion-icon name="add"></ion-icon>
            </i>
            <i className="icon ion-md-remove">
              <ion-icon name="remove"></ion-icon>
            </i>
          </label>
          <div className="faq-content">
            El individual está diseñado solamente para recibir y administrar tus
            facturas. En cambio el business tiene todo lo del individual pero
            además puedes emitir y administrar tus facturas.
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="question2" className="faq-toggle" />
          <label htmlFor="question2" className="faq-title">
            ¿Cómo puedo cambiar mi plan en Quickbyll?
            <i className="icon ion-md-add">
              <ion-icon name="add"></ion-icon>
            </i>
            <i className="icon ion-md-remove">
              <ion-icon name="remove"></ion-icon>
            </i>
          </label>
          <div className="faq-content">
            Sí, el cambio es gratuito y es al instante, no hay necesidad de
            crear otra cuenta ya que podrás utilizar el mismo correo electrónico{" "}
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="question3" className="faq-toggle" />
          <label htmlFor="question3" className="faq-title">
            ¿Qué significa Quickbyll ID?
            <i className="icon ion-md-add">
              <ion-icon name="add"></ion-icon>
            </i>
            <i className="icon ion-md-remove">
              <ion-icon name="remove"></ion-icon>
            </i>
          </label>
          <div className="faq-content">
            Es una identificación digital que hace las veces de tu constancia
            fiscal, que contiene sólo los datos más importantes que necesitas
            para recibir facturas y compartir con terceros.
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="question4" className="faq-toggle" />
          <label htmlFor="question4" className="faq-title">
            ¿Es Quickbyll gratuito o hay algún costo asociado?
            <i className="icon ion-md-add">
              <ion-icon name="add"></ion-icon>
            </i>
            <i className="icon ion-md-remove">
              <ion-icon name="remove"></ion-icon>
            </i>
          </label>
          <div className="faq-content">
            Por el momento solo se ofrecen versiones gratuitas en servicios,
            regalando 50 timbres sin vigencia por el primer registro. En caso de
            agotar tus timbres gratuitos, podrás comprar más a un bajo costo
            dentro del portal.
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="question5" className="faq-toggle" />
          <label htmlFor="question5" className="faq-title">
            ¿Necesito descargar una aplicación para utilizar sus servicios?
            <i className="icon ion-md-add">
              <ion-icon name="add"></ion-icon>
            </i>
            <i className="icon ion-md-remove">
              <ion-icon name="remove"></ion-icon>
            </i>
          </label>
          <div className="faq-content">
            No, puedes utilizar el portal y aplicación móvil. Sin embargo, te
            recomendamos que descargues la app móvil ya que es más práctica,
            intuitiva y de fácil acceso.
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="question6" className="faq-toggle" />
          <label htmlFor="question6" className="faq-title">
            ¿Cómo garantizan la seguridad de los datos de facturación?{" "}
            <i className="icon ion-md-add">
              <ion-icon name="add"></ion-icon>
            </i>
            <i className="icon ion-md-remove">
              <ion-icon name="remove"></ion-icon>
            </i>
          </label>
          <div className="faq-content">
            En Quickbyll, mantenemos tus datos fiscales de facturación seguros
            utilizando un enfoque integral de seguridad de la información. Esto
            incluye el cifrado de datos, el monitoreo continuo de la red e
            implementación de firewalls.
          </div>
        </div>
      </div>
    </div>
  );
}

export default QA;
