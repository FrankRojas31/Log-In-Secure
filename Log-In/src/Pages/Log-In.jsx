import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const server = import.meta.env.Server;
export default function Login() {

    const [body, setBody] = useState ({
        Email: "",
        Password: "",
    });

    // Creó una funcion que requiera una promesa para cumplirse.
    const handleSubmit = async () => {
        if(!body.Email || !body.Password){
            return;
        }

        try {
            const respuesta = await axios.post(`${server}'/UserLog-In'`, body);
                if(respuesta.data.Status === 'Successful') {
                  console.log('Login User Successful ');

                  const token = respuesta.data.token;
                  localStorage.setItem("Log-in", token);
                  window.location.href = '/';
                } else {
                  console.log('Error')
                } 
        } catch (error) {
            console.error(error);
            console.error('Please try again later');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBody({
          ...body,
          [name]: value,
        });
      };


    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-20 h-auto mx-auto my-auto mr-2" src="../images/logo.png" alt="logo" /> Build Empresarial
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center flex items-center justify-center h-full">
              Iniciar Sesión
            </h1>
  
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@example.com"
                    value={body.Email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={body.Password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recuerdame</label>
                    </div>
                  </div>
                  <Link to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</Link>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSubmit}
                >
                  Iniciar Sesión
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                  ¿No tienes cuenta? <br></br><a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">¡Registrate Ahora!</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  