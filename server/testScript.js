const mongoose = require("mongoose");
const Article = require("./models/Article");

const uri = "mongodb+srv://ZacharyH728:c3yy58HKaKJObnd7@cluster0.mh3o3ze.mongodb.net/El_Inversionario?retryWrites=true&w=majority";

mongoose.connect(
    uri,
)
    .then(run())
    .catch(e => console.log(e));

async function run() {

    try {
        const article = await Article.create({
            views: 0,
            hidden: false,
            authors: ["author1", "author2", "author3"],
            editors: ["editor1", "editor2", "editor3"],
            reviewrs: ["reviewr1", "reviewr2", "reviewr3"],
            article: {
                title: "¿Qué son y para qué sirven?",
                sub_heading: "This is a test subheading",
                summary: "Las inversiones son actividades en las que se utilizan recursos con el objetivo de obtener retornos futuros de distintos tipos.",
                body: "Una inversión es el proceso de adquirir o desarrollar activos con la expectativa de que el valor de este aumentará con el tiempo. Esto podría ser en apreciación de su valor, ganancias en la venta de los activos, o rendimientos que los activos generen. Es importante reconocer que no todas las inversiones garantizan apreciación y existe la posibilidad de terminar con menos dinero del invertido inicialmente. Las inversiones tienen una variedad de funciones: Crecimiento de patrimonio: las inversiones permiten a las personas poner su dinero a trabajar, generando rendimientos que puedan superar la inflación y que aumenten su nivel de patrimonio.Este crecimiento proviene de la apreciación de capital o ingresos, como dividendos o intereses. Metas financieras: las personas invierten para lograr objetivos financieros específicos: ahorrar para la jubilación, financiar algún tipo de educación, comprar una casa, o iniciar un negocio.Las inversiones pueden proporcionar los medios para alcanzar estos objetivos a lo largo del tiempo. Diversificación: diversificar los activos ayuda a distribuir los riesgos de una inversión.Los diferentes tipos de activos(por ejemplo, acciones, cetes, bienes raíces, entre otros) tienen diferentes niveles de riesgo y pueden funcionar de manera diferente en diferentes condiciones económicas.La diversificación puede mitigar riesgos y mejorar la estabilidad financiera. Generación de ingresos: algunas inversiones, como acciones que pagan dividendos o propiedades de alquiler, proporcionan un flujo de ingresos.Esto puede complementar otras fuentes de ingresos o actuar como una fuente de ingresos pasivos.Estas inversiones pueden reducir la dependencia financiera del trabajo activo. Preservación de capital: ciertas inversiones, como los cetes gubernamentales, tienen un riesgo relativamente bajo y tienen como objetivo preservar el capital regresando un porcentaje bajo y relativo a la inflación anual. Seguridad financiera a largo plazo: las inversiones contribuyen a la prosperidad y seguridad financiera de personas y empresas a largo plazo.Pueden brindar una red de seguridad para emergencias o gastos inesperados.",
                key_points: [
                    "Invertir implica utilizar recursos del presente con la expectativa de que crecerán con el tiempo, lo que podría aumentar el patrimonio de una persona.",
                    "Las inversiones sirven como medios para lograr objetivos financieros específicos, como ahorrar para la jubilación, financiar educación, o comprar una casa. ",
                    "Invertir también puede mejorar la estabilidad económica y financiera mediante la diversificación.",
                    "Ciertas inversiones ofrecen ingresos regulares, complementando otras fuentes de ingresos. Ej. Dividendos e intereses.",
                    "Algunas inversiones se enfocan en guardar el capital inicial, y al mismo tiempo, proporcionan rendimientos pequeños pero seguros. Ej. Bonos, cetes.",
                    "Las inversiones permiten a las personas prepararse para un futuro financieramente seguro al poner a trabajar sus recursos para obtener beneficios futuros.",
                ],
                tags: ["Inversiones"],
                refrences: [
                    {
                        name: 'BBVA. "BBVA MEXICO." Www.bbva.mx',
                        date_accessed: Date.now(),
                        url: "www.bbva.mx/educacion-financiera/ahorro/que-es-una-inversion-en-cedes.html",
                    }
                ]
            }
        })
        console.log(article);
        article.save();
    } catch (e) {
        console.error(e.message);
    }
    // mongoose.close();
}
