import "./about.css";

function About() {
  return (
    <section className="about">
      <div className="about-image">
       
      </div>
      <div className="about-content">
        <h1>¿Quiénes somos?</h1>
        <p>
          Bienvenido a <strong>EcoVida</strong>, una organización sin fines de lucro dedicada 
          a la promoción de la agricultura orgánica y sostenible. Nuestra fundación trabaja 
          incansablemente para apoyar a pequeños agricultores que cultivan productos orgánicos, 
          mejorar la salud pública y fomentar prácticas ambientales sostenibles en nuestra comunidad.
        </p>
        <p>
          Nuestra misión en <strong>EcoVida</strong> es clara: conectar a pequeños agricultores 
          orgánicos con personas comprometidas con su salud y el planeta. Creemos firmemente 
          en el poder de la agricultura sostenible para transformar comunidades y proteger 
          nuestro medio ambiente. Cada producto que ofrecemos ha sido cuidadosamente seleccionado 
          para garantizar los más altos estándares de calidad orgánica y sostenibilidad.
        </p>
        <p>
          Desde frutas y verduras frescas hasta productos de cuidado personal ecológicos, 
          <strong>EcoVida</strong> ofrece una amplia gama de productos que benefician tanto 
          a los consumidores como a los productores locales. Cuando compras en nuestra tienda, 
          no solo estás adquiriendo productos saludables para ti y tu familia, sino que también 
          estás apoyando directamente a agricultores locales y financiando proyectos de desarrollo 
          sostenible que benefician a toda nuestra comunidad.
        </p>

        <div className="icon-container">
          <div className="icon">
            <i className="fa fa-seedling"></i>
            <span>Cultivos 100% orgánicos</span>
          </div>

          <div className="icon">
            <i className="fa fa-users"></i>
            <span>Apoyo a agricultores locales</span>
          </div>

          <div className="icon">
            <i className="fa fa-recycle"></i>
            <span>Prácticas sostenibles</span>
          </div>

          <div className="icon">
            <i className="fa fa-heart"></i>
            <span>Impacto social positivo</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;