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