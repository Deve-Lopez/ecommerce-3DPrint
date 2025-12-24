import Formulario from "./Formulario"


const Contacto = () => {
    return (
        <div>
            <div className='container-contacto'>
                <div className='c1'>
                    <h3 className='h3-contacto'>Contacta con nosotros 3DPrint</h3>
                    <span className='text-form'>Para cualquier consulta o incidencia puedes ponerte en contacto con
                        nosotros a través del siguiente formulario:</span>
                    <Formulario />

                    <span>Otros contactos</span>
                    <hr />
                    <span>Donde estamos</span>
                    <a href="https://www.google.com/maps?q=Carrer+Font+Baixa+2,+Alfafar,+Valencia"
                        target='_blank'
                        className='a-location'>Carrer Font Baixa, 2 </a>
                    <a href="https://www.google.com/maps?q=Carrer+Font+Baixa+2,+Alfafar,+Valencia"
                        target='_blank'
                        className='a-location'>Alfafar, 46910, Valencia</a>
                    <hr />
                    <span>Horario de atención</span>
                    <span>10:00h - 13:30h / 15:00h - 18:00h</span>
                    <hr />
                    <span>Telefono</span>
                    <a href='tel:680559528' >(+34) 680559528</a>



                </div>
                <div className='c2'>
                    <img src="images/imagecontacto.jpeg" alt="imagencontacto"
                        className='image-contact' />
                </div>
            </div>
        </div>
    )
}

export default Contacto
