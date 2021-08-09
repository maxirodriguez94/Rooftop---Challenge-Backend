# Rooftop--Challenge-Backend

##Pasos para utilizar

####Clonar el proyecto
```git clone https://github.com/maxirodriguez94/Rooftop---Challenge-Backend```

#### Iniciar Proyecto
````cp .env.example .env```
(configurar .env)

```npm install```

Se agrego una nueva columna a coupons, por lo tanto es necesario ejecutar el siguiente script:

```ALTER TABLE "rooftop-backend-challenge".coupons ADD COLUMN created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP;```


Ejecutar:


```npm run dev```

#### Importar ejemplos en Postman
Para ver como utilizar la API y visualizar algunos ejemplos, se recomienda importar el proyecto a Postman con el archivo ubicado en la carpeta ```examples```

#### Consultas

- TypeORM tutorial: https://github.com/Covicake/TypeORM-tutorial/commit/c08c3505b5b795f3fa83f4dc435c7009a1d892f0

- TypeORM pagination: https://www.npmjs.com/package/typeorm-pagination

- Importar/Exportar proyectos en Postman: https://www.youtube.com/watch?v=FzPBDU7cB74

- Joi — awesome code validation for Node.js and Express: https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk