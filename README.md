# backend-desafioClase32

Aplicación de listado y agregado de productos con chat en tiempo real incorporado,
que guarda los datos de productos y del chat en bases de datos, una sqlite y otra mariaDB

Sistema de logueo y deslogueo, utilizando autenticación y encriptación de los datos sensibles

Para iniciar el servidor correr:

node server.js --port [puerto] --modo [modo]

por defecto estos valores son 

Si no hay productos en la lista, se puede llamar al método inicializarProductos()
al arrancar la aplicación. Ésta agrega tres productos a la base.


La ruta de datos agregada en el desafío anterior no debería andar ya que no recibí la corrección y no pude resolver los conflictos con los cabeceros HTML.