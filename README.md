# Data Dashboard
# Integrantes
Ari Magallanes,Maricielo 
Huatuco Gabriel, Ivonne


## Preámbulo
En Laboratoria,  las Training Managers (TMs) hacen un gran trabajo al analizar la
mayor cantidad de datos posibles respecto al progreso de las estudiantes para
apoyarlas en su aprendizaje.

La principal medida de progreso de una estudiante en Laboratoria es su avance
completando los proyectos de la [Ruta de Aprendizaje]
Sin embargo, para completar estos proyectos las estudiantes acceden a contenidos
de aprendizaje (lecturas, videos, ejercicios y quizzes) en un sistema que
llamamos LMS (Learning Management System). El LMS acumula data sobre quién
leyó qué, qué ejercicios se han completado, los resultados de los quizzes, etc.

A pesar de que la data de progreso del LMS (ej. lecturas leídas, ejercicios
  completados, nota en quizzes, etc.) no impacta directamente en la evaluación
  de una estudiante, sí es una pieza de información relevante que las TMs
  quisieran visualizar para tener un mejor entendimiento de cómo va cada
  estudiante en su proceso de aprendizaje.

Así, el reto de este proyecto es crear una interfaz donde las TMs puedan
_ver_ y _usar_ la data de progreso del LMS. Para ello, proponemos crear un
**data dashboard** (_tablero de visualización de datos_).

## Introducción

Según un [estudio de IBM](https://www-01.ibm.com/common/ssi/cgi-bin/ssialias?htmlfid=WRL12345USEN),
el 90% de la data que existe hoy ha sido creada en los últimos dos años.
Cada día generamos 2.5 trillones de bytes de datos, una cifra sin precedentes.

Sin embargo, los datos por sí solos son de poca utilidad. Para transformar datos
en **información** necesitamos procesarlos y entenderlos. Una manera muy
sencilla de hacerlo es creando _visualizaciones_. Las
empresas líderes de hoy generan visualizaciones dinámicas de su data
que les permiten entender mejor su negocio y tomar decisiones apropiadas.

En este proyecto tendrás tu primer acercamiento a transformar data en
información creando tu primer **data dashboard**.

Si pensamos en un _dashboard_ podemos pensar en el tablero de control de un auto
o el de un avión. Un espacio desde el cual un usuario puede tener acceso a la
información y controles más relevantes, en este caso, del vehículo que está
utilizando. El _dashboard_ de un auto le permite a quien conduce saber a qué
velocidad está yendo, qué cambio/velocidad está utilizando, cuánto combustible
tiene disponible, cuál es la temperatura del motor, cuántas revoluciones por
![foto de figma](/src/img/logo1.jpg)
minuto dan las ruedas, cuánta distancia ha recorrido, etc.

![car dashboard](https://img.buzzfeed.com/buzzfeed-static/static/2017-02/7/12/enhanced/buzzfeed-prod-fastlane-03/original-17515-1486490056-3.jpg?crop=2041:1068;80,248)

## Aplicaciones en el mundo real



En el mundo de la web es muy común el uso de _dashboards_. De hecho, [wikipedia](https://goo.gl/P7PF4y)
nos dice que un _dashboard_ puede ser un resumen gráfico de varias piezas de
información importante, generalmente utilizadas para dar una visión general de
una empresa o de un servicio. Así, tenemos dashboards como los de:

* [Google Analytics](https://assets.econsultancy.com/images/resized/0003/3813/mobile_commerce_dashboard-blog-full.png)
  para visualizar la data de tráfico de sitios web.

* [Mailchimp](https://blog.mailchimp.com/wp-content/uploads/2016/11/Dashboard-view-3-Copy-1008x768.jpg)
  para visualizar el desempeño de campañas de mercadeo digital por correo
  electrónico.

* [Quickbooks](https://quickbooks.intuit.com/content/dam/intuit/quickbooks/branding/make-organization-easy-visual.png)
  para visualizar la información financiera de una empresa.

En base a este seguimiento se ve la necesidad de crear una interfaz donde las TMs puedan
ver y  usar la data de progreso del LMS. Para ello, se propone la creación de un
**data dashboard**

## Objetivos de aprendizaje

Nuestro objetivo principal de este proyecto es que aprendamos a diseñar y construir una
_interfaz web_ donde podamos visualizar y manipular data.

## Consideraciones generales

La lógica del proyecto está implementado en JavaScript
(ES6), HTML y CSS.


#### 1) Definición del producto

Las herramientas que usamos para definir el producto fueron entrevistas, Entrevistamos a nuestra Training Manager y a un
Coach especialista a partir de ello, Se define los siguientes puntos:

* El principal usuario del producto son los Training Manager.
* El objetivo del usuario a traves del producto es tener una herramienta que le apoye a poder observar el avance de las
alumnas en la completitud de Quizzes, Lecturas y Ejercicios del lms de esta forma tener un mejor entendimiento de cómo va cada estudiante en su proceso de aprendizaje.
* Los datos más relevantes que se quieren ver en la interfaz son la completitud de lecturas, quizzes y ejercicios del lms
* Los datos de la interfaz pueden revisarse en cualquier momento


## Proceso de Diseño

#### 2) Sketch de la solución (prototipo de baja fidelidad)

Debes hacer un _sketch_ (boceto) de tu solución usando papel y lápiz, tomarle
una foto, subirla a tu repositorio y hacer mención del _sketch_ en tu `README.md`.

#### 3) Diseño de la Interfaz de Usuario (prototipo de alta fidelidad)

Nosotras usamos la herramienta [Figma](https://www.figma.com/) que  es una herramienta
que funciona en el navegador,
El diseño debe representar tu _ideal_ de solución.

### Implementación de la Interfaz de Usuario (HTML/CSS/JS)

La implementación cubrirá:

1. Permitir al usuario seleccionar un cohort de una lista de cohorts.
2. Al seleccionar un cohort:
  - Listar las estudiantes de ese cohort
  - Para cada estudiante:
    + Calcular porcentaje de completitud de todos los _cursos_.
    + Calcular grado de completitud de _lecturas_, _ejercicios autocorregidos_,
      y _quizzes_.
  - Ordenar estudiantes por completitud _general_ (porcentaje consumido/completado
    de todos los cursos del cohort en cuestión), de _lecturas_, _ejercicios
    autocorregidos_ y _quizzes_.
  - Filtrar/buscar estudiantes por nombre.
3. Visualizarse sin problemas desde distintos tamaños de pantallas: móviles,
  tablets y desktops.
4. Incluir pruebas unitarias.