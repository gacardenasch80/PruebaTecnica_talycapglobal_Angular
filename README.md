# TalicapGroup .NET Api 
Respositorio publico con  servicio rest API .net.  Solucion para prueba tecnica para TalycapGroup (Abril 2021)

# Especificaciones
La prueba tecnica se desarrolló con una arquitectura en capas implementando 4 capas las cuales son:
1. Capa de Aplicación (UI): Esta capa fue desarrollada con el framework Angular el cual implementa un patrón de diseño MVC sobre una single page aplication
2. Rest API: Capa de servicio que implementa la arquitectura RestFull, con la implementación JWT como protocolo de autenticación y autorización y Swagger para la documentación del API Rest
3. Capa de Negocio: En esta capa se implementa toda la logica del negocio a traves de la implementación de interfaces de servicio que proveen metodos y funciones publicos que seran llamados desde el API
4. Data: Esta capa es la encargada de la comunicación con la base de datos, por medio de un micro ORM llamado Dapper y la implementación de patron de diseño de repositorio y unidad de trabajo. 

Adicionalmente se implementan los patrones de inyección de dependencias y singleton, permitiendo asi que la aplicación sea escalable y desacoplada, siguiendo con los principios SOLID.

# Tiempo Gastado
El tiempo aproximado para crear la solucion fue de 30 horas

## Prerequisitos
Visual Studio 2019.
Para la ejecución del Backend
Visual Studio Code.
Para la ejecución del FrontEnd
Sql Server 2019 
Para el manejo de la base de datos con un usuario que tenga permisos de creación de bases de datos, roles y sericios.

## Instalación
1. Abra la carpeta de la solución en la explorador de archivos
2. Ubique el archivo DatabaseCreationScript.sql y ejecútelo en la máquina local, los objetos de la base de datos se crearán localmente (ConnectionString se configuran localmente)
3. Navegue a la carpeta PruebaTecnica_talycapglobal y abra un símbolo del sistema en modo Administrador
4. Escriba dotnet run y espere a que se confirme la inicialización del API (se alojará en https://localhost:5001/swagger/index.html)

# Como usar
Debería poder navegar por la aplicación aquí <https://localhost:5001/swagger/index.html> para validar los controladores del API.


Prueba de evaluación, Las navegaciones y funcionalidades se siguen según lo solicitado.